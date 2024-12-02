resource "aws_instance" "nexus" {
  ami             = var.ami
  instance_type   = var.instance_type
  key_name        = var.key_name
  subnet_id       = var.nexus_subnet
  security_groups = [var.nexus_sg]

  user_data = <<-EOF
              #!/bin/bash

              # Update and install Java
              echo "Updating system and installing Java..."
              sudo apt update -y
              sudo apt install openjdk-11-jdk -y

              # Verify Java installation
              java -version
              if [ $? -ne 0 ]; then
                echo "Java installation failed. Exiting."
                exit 1
              fi

              # Download Nexus
              NEXUS_VERSION="nexus-3.74.0-05-unix"
              NEXUS_URL="https://download.sonatype.com/nexus/3/$NEXUS_VERSION.tar.gz"
              echo "Downloading Nexus from $NEXUS_URL..."
              wget $NEXUS_URL -O /tmp/nexus.tar.gz

              # Extract Nexus and move to /opt
              echo "Extracting Nexus and moving it to /opt..."
              sudo tar -xvf /tmp/nexus.tar.gz -C /tmp
              sudo mv /tmp/nexus-3.* /opt/nexus
              sudo mkdir -p /opt/sonatype-work

              # Create Nexus user and set permissions
              echo "Creating 'nexus' user and setting permissions..."
              sudo useradd -r -m -d /opt/nexus -s /bin/bash nexus
              sudo chown -R nexus:nexus /opt/nexus
              sudo chown -R nexus:nexus /opt/sonatype-work

              # Update sudoers file for Nexus user
              echo "Updating sudoers file for 'nexus' user..."
              echo "nexus ALL=(ALL) NOPASSWD: ALL" | sudo tee -a /etc/sudoers

              # Update Nexus configuration to run as 'nexus' user
              echo "Configuring Nexus to run as 'nexus' user..."
              sudo sed -i 's/#run_as_user=""/run_as_user="nexus"/' /opt/nexus/bin/nexus.rc

              # Create a systemd service file for Nexus
              echo "Creating systemd service file for Nexus..."
              sudo tee /etc/systemd/system/nexus.service > /dev/null << EOL
              [Unit]
              Description=Nexus Repository Manager
              After=network.target

              [Service]
              Type=simple
              User=nexus
              Group=nexus
              ExecStart=/opt/nexus/bin/nexus start
              ExecStop=/opt/nexus/bin/nexus stop
              Restart=on-failure
              LimitNOFILE=65536

              [Install]
              WantedBy=multi-user.target
              EOL

              # Reload systemd daemon and start Nexus service
              echo "Starting Nexus service..."
              sudo systemctl daemon-reload
              sudo systemctl enable nexus
              sudo systemctl start nexus

              # Verify Nexus service status
              echo "Verifying Nexus service status..."
              sudo systemctl status nexus --no-pager

              echo "Nexus Repository Manager setup is complete!"
    
              EOF

  tags = {
    Name = "${var.enviroment}-nexus-repo"
  }
}
