resource "aws_instance" "sonarqube_instance" {
  ami             = var.ami
  instance_type   = "t2.medium"
  subnet_id       = var.sonar-subnet_id
  security_groups = [var.sonar_sg_id]
  key_name = var.key_name

  user_data = <<-EOF
#!/bin/bash

# Step 1: Install Java (OpenJDK 17)
echo "Installing OpenJDK 17..."
sudo apt update
sudo apt install -y openjdk-17-jdk

# Step 2: Install PostgreSQL and Configure Database
echo "Setting up PostgreSQL repository and installing PostgreSQL..."
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ lsb_release -cs-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Step 3: Start and Enable PostgreSQL Service
echo "Starting PostgreSQL..."
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Step 4: Configure PostgreSQL Database for SonarQube
echo "Configuring PostgreSQL database for SonarQube..."
sudo -i -u postgres psql <<EOF2
CREATE USER boora WITH ENCRYPTED PASSWORD 'BOORA';
CREATE DATABASE sqube OWNER boora;
GRANT ALL PRIVILEGES ON DATABASE sqube TO boora;
EOF2

# Step 5: Install required utilities (zip, wget)
echo "Installing zip and wget..."
sudo apt install -y zip wget

# Step 6: Download and Install SonarQube
echo "Downloading and installing SonarQube..."
sudo wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.4.1.88267.zip
sudo unzip sonarqube-10.4.1.88267.zip
sudo mv sonarqube-10.4.1.88267 sonarqube
sudo mv sonarqube /opt/

# Step 7: Create SonarQube user and assign permissions
echo "Creating SonarQube user and assigning permissions..."
sudo groupadd boora
sudo useradd -d /opt/sonarqube -g boora boora
sudo chown -R boora:boora /opt/sonarqube

# Step 8: Configure SonarQube Database Connection
echo "Configuring SonarQube to use PostgreSQL..."
sudo sed -i 's/#sonar.jdbc.username=sonar/sonar.jdbc.username=boora/' /opt/sonarqube/conf/sonar.properties
sudo sed -i 's/#sonar.jdbc.password=sonar/sonar.jdbc.password=BOORA/' /opt/sonarqube/conf/sonar.properties
sudo sed -i 's/#sonar.jdbc.url=jdbc:postgresql:\/\/localhost:5432\/sonar/sonar.jdbc.url=jdbc:postgresql:\/\/localhost:5432\/sqube/' /opt/sonarqube/conf/sonar.properties

# Step 9: Configure SonarQube to Run as a Specific User
echo "Setting SonarQube to run as boora user..."
sudo sed -i 's/^#RUN_AS_USER=sonar/RUN_AS_USER=boora/' /opt/sonarqube/bin/linux-x86-64/sonar.sh

# Step 10: Create Systemd Service for SonarQube
echo "Creating systemd service for SonarQube..."
cat <<EOF3 | sudo tee /etc/systemd/system/sonar.service > /dev/null
[Unit]
Description=SonarQube service
After=syslog.target network.target

[Service]
Type=forking
ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
User=boora
Group=boora
Restart=always
LimitNOFILE=65536
LimitNPROC=4096

[Install]
WantedBy=multi-user.target
EOF3

# Step 11: Enable and Start SonarQube Service
echo "Enabling and starting SonarQube service..."
sudo systemctl daemon-reload
sudo systemctl enable sonar
sudo systemctl start sonar

# Step 12: Modify Kernel Parameters for SonarQube and Elasticsearch
echo "Modifying kernel system limits for Elasticsearch..."
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
echo "fs.file-max=65536" | sudo tee -a /etc/sysctl.conf
echo "ulimit -n 65536" | sudo tee -a /etc/security/limits.conf
echo "ulimit -u 4096" | sudo tee -a /etc/security/limits.conf

# Step 13: Apply Kernel Parameter Changes
echo "Applying kernel parameter changes..."
sudo sysctl -p
sudo reboot

# Step 14: Status Check
echo "SonarQube service status:"
sudo systemctl status sonar
EOF

  tags = {
    Name = "${var.environment}-sonarqube-instance"
  }
}



resource "aws_ebs_volume" "sonarqube_volume" {
  availability_zone = var.availability_zone
  size              = 20  # 20GB
  tags = {
    Name = "${var.environment}-sonarqube-ebs-volume"
  }
}


resource "aws_volume_attachment" "sonarqube_volume_attachment" {
  device_name = "/dev/xvdf"  
  volume_id   = aws_ebs_volume.sonarqube_volume.id
  instance_id = aws_instance.sonarqube_instance.id
}


resource "aws_instance" "jenkins_server" {
  ami           = var.ami
  instance_type = "t2.large"
  subnet_id     = var.jenkins_subnet_id
  security_groups = [var.jenkins_sg]
  key_name      = var.key_name
  

  user_data = <<-EOF
#!/bin/bash
sudo apt update -y
sudo apt install -y fontconfig openjdk-17-jre wget gnupg

sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian/jenkins.io-2023.key

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian binary/" | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt-get update -y
sudo apt-get install jenkins -y

sudo systemctl enable jenkins 
EOF

  tags = {
    Name = "${var.environment}-Jenkins-Server"
  }
}


resource "aws_ebs_volume" "jenkins_ebs" {
  availability_zone = var.jenkins_availablity_zone
  size = 20
  tags = {
    Name = "${var.environment}-Jenkins-ebs"
  }
}

resource "aws_volume_attachment" "jenkins-ebs-attach" {
  device_name = "/dev/xvdg"
  volume_id = aws_ebs_volume.jenkins_ebs.id
  instance_id = aws_instance.jenkins_server.id
}
