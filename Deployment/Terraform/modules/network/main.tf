provider "aws" {
  region = var.region
}

# Create VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr[var.environment]
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.environment}-VPC"
  }
}

# Create Subnets (public and private)
resource "aws_subnet" "subnets" {
  for_each = var.subnets[var.environment]

  vpc_id               = aws_vpc.main.id
  cidr_block           = each.value.cidr_block
  map_public_ip_on_launch = each.value.map_public_ip
  availability_zone    = each.value.availability_zone

  tags = {
    Name = "${var.environment}-${each.value.name}"
  }
}

# Create Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.environment}-IGW"
  }
}

# Elastic IP for NAT Gateway
resource "aws_eip" "nat_eip" {
  domain = "vpc"

  tags = {
    Name = "${var.environment}-EIP"
  }
}

# Create NAT Gateway
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.subnets["public_az_1a"].id

  tags = {
    Name = "${var.environment}-NAT-Gateway"
  }
}

# Create Route Tables
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

 route {
    cidr_block = var.vpc_cidr[var.environment]  
    gateway_id = "local"
  }

  tags = {
    Name = "${var.environment}-Public-Route-Table"
  }
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

   route {
    cidr_block = var.vpc_cidr[var.environment]  
    gateway_id = "local"
  }

  tags = {
    Name = "${var.environment}-Private-Route-Table"
  }
}

# Associate Route Tables with Subnets
resource "aws_route_table_association" "route_association" {
  for_each = var.subnets[var.environment]

  subnet_id      = aws_subnet.subnets[each.key].id
  route_table_id = each.value.map_public_ip ? aws_route_table.public_rt.id : aws_route_table.private_rt.id
}

# Bastion Host Configuration
resource "aws_instance" "bastion_host" {
  ami           = var.ami
  instance_type = var.instance_type
  subnet_id     = aws_subnet.subnets["public_az_1a"].id 
  security_groups = [ var.bastion_sg_id ]
  key_name = var.key_name
  tags = {
    Name = "${var.environment}-bastion-host"
  }
}

resource "aws_iam_instance_profile" "basiton_ssm_profile" {
  name = "${var.environment}-bastion-ssm-profile"
  role = var.bastion_ssm_role_name
}



