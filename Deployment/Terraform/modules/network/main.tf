provider "aws" {
  region = var.region
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "VPC_PERN_Store"
  }
}

resource "aws_subnet" "subnets" {
  for_each             = var.subnets
  vpc_id               = aws_vpc.main.id
  cidr_block           = each.value.cidr_block
  map_public_ip_on_launch = each.value.map_public_ip
  availability_zone    = each.value.availability_zone

  tags = {
    Name = each.value.name
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}


resource "aws_eip" "nat_eip" {
  domain = "vpc"
  
  tags = {
    Name = "nat-eip"
  }
}


resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.subnets["public_az_1a"].id

  tags = {
    Name = "nat-gateway"
  }
}


resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public-route-table"
  }
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

  tags = {
    Name = "private-route-table"
  }
}


resource "aws_route_table_association" "public" {
  for_each = { for k, v in var.subnets : k => v if v.map_public_ip }
  subnet_id      = aws_subnet.subnets[each.key].id
  route_table_id = aws_route_table.public_rt.id
}


resource "aws_route_table_association" "private" {
  for_each = { for k, v in var.subnets : k => v if !v.map_public_ip }
  subnet_id      = aws_subnet.subnets[each.key].id
  route_table_id = aws_route_table.private_rt.id
}
