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
      cidr_blocks = ingress.value.cidr_block
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
      cidr_blocks = ingress.value.cidr_block
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

  dynamic "ingress" {
    for_each = var.jenkins_ingress_rules
    content {
      from_port = ingress.value.from_port
      to_port = ingress.value.to_port
      protocol = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_block
    }
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

resource "aws_security_group" "sonar_alb_sg" {
  name = "${var.environment}-sonar_alb_sg"
  vpc_id = var.vpc_id
  description = "for secure access from jenkins to sonarqube"

  dynamic "ingress" {
    for_each = var.sonar_ingress_rules
    content {
      from_port = ingress.value.from_port
      to_port = ingress.value.to_port
      protocol = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_block
    }
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-sonar-alb-sg"
  }
}


resource "aws_security_group" "nexus_sg" {
  name = "${var.environment}-nexus-sg"
  vpc_id = var.vpc_id
  description = "allowing integration from jenkins"

  dynamic "ingress" {
    for_each = var.nexus_ingress_rules
    content {
      from_port = ingress.value.from_port
      to_port = ingress.value.to_port
      protocol = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_block
    }


  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-nexus-sg"
  }


}



  

  



