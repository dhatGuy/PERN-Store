resource "aws_security_group" "bastion_sg" {
  name        = "${var.environment}-bastion-sg"
  description = "Security group for Bastion host"
  vpc_id      = var.vpc_id

  dynamic "ingress" {
    for_each = var.bastion_ingress_rules
    content {
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-bastion-sg"
  }
}

resource "aws_security_group" "sonar_sg" {
  name        = "${var.environment}-sonar-sg"
  description = "Security group for SonarQube"
  vpc_id      = var.vpc_id

  dynamic "ingress" {
    for_each = var.sonar_ingress_rules
    content {
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-sonar-sg"
  }
}

resource "aws_iam_role" "bastion_ssm_role" {
  name = "${var.environment}-bastion-ssm-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action    = "sts:AssumeRole",
        Effect    = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "bastion_ssm_attach" {
  name       = "${var.environment}-bastion-ssm-attach"
  roles      = [aws_iam_role.bastion_ssm_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_security_group" "jenkins_sg" {
  name        = "${var.environment}-jenkins-server"
  description = "Security group for Jenkins-server"
  vpc_id      = var.vpc_id

  egress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 8080
    to_port = 8080
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-jenkins-server"
  }
}


