provider "aws" {
  region = "us-east-1"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "vpc-for-private-ec2"
  }
}

# Public Subnets
resource "aws_subnet" "public_az_1a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"

  tags = {
    Name = "public-az-1a"
  }
}

resource "aws_subnet" "public_az_1b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"

  tags = {
    Name = "public-az-1b"
  }
}

# Private Subnets
resource "aws_subnet" "private_az_1a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "private-az-1a"
  }
}

resource "aws_subnet" "private_az_1b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name = "private-az-1b"
  }
}

# Internet Gateway for Public Subnets
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

# Elastic IP for NAT Gateway
resource "aws_eip" "nat_eip" {
  domain = "vpc"
  
  tags = {
    Name = "nat-eip"
  }
}

# NAT Gateway for Private Subnets
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_az_1a.id # NAT Gateway in Public Subnet
}

# Route Table for Public Subnets
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  # Default route to the internet via Internet Gateway
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  # Local route for VPC CIDR block (public subnet)
  route {
    cidr_block = "10.0.0.0/16"
    gateway_id = "local"
  }

  tags = {
    Name = "public-route-table"
  }
}

# Associate Public Route Table with Public Subnets
resource "aws_route_table_association" "public_add_az_1a" {
  subnet_id      = aws_subnet.public_az_1a.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_add_az_1b" {
  subnet_id      = aws_subnet.public_az_1b.id
  route_table_id = aws_route_table.public_rt.id
}

# Route Table for Private Subnets
resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id

  # Route to the internet via NAT Gateway
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

  # Local route for VPC CIDR block (private subnet)
  route {
    cidr_block = "10.0.0.0/16"
    gateway_id = "local"
  }

  tags = {
    Name = "private-route-table"
  }
}

# Associate Private Route Table with Private Subnets
resource "aws_route_table_association" "private_add_az_1a" {
  subnet_id      = aws_subnet.private_az_1a.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "private_add_az_1b" {
  subnet_id      = aws_subnet.private_az_1b.id
  route_table_id = aws_route_table.private_rt.id
}
