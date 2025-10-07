# Optional: create key pair from local public key if ssh_key_name is empty
resource "aws_key_pair" "pern" {
  count      = var.ssh_key_name == "" && var.public_key_path != "" ? 1 : 0
  key_name   = "mklord"
  public_key = file(var.public_key_path)
}

locals {
  key_name_effective = var.ssh_key_name != "" ? var.ssh_key_name : (length(aws_key_pair.pern) > 0 ? aws_key_pair.pern[0].key_name : null)
}

resource "aws_instance" "pern_ec2" {
  ami                         = data.aws_ami.ubuntu_2204.id
  instance_type               = var.instance_type
  subnet_id                   = data.aws_subnets.default.ids[0]
  vpc_security_group_ids      = [aws_security_group.pern_sg.id]
  key_name                    = local.key_name_effective
  associate_public_ip_address = true

  iam_instance_profile = aws_iam_instance_profile.pern.name


  root_block_device {
    encrypted   = true
    volume_size = 20
  }

  //encrypted root volume
  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y ca-certificates curl gnupg lsb-release
    # Docker
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
      | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update -y
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    usermod -aG docker ubuntu
    ufw allow 22; ufw allow 80; ufw allow 443; ufw allow 3000; ufw allow 9000; ufw allow 5432; ufw allow 9090; ufw allow 3001; yes | ufw enable
    mkdir -p /opt/pern && echo "PERN host ready" > /opt/pern/READY
  EOF

  tags = { Name = "${var.project_name}-ec2" }
}
