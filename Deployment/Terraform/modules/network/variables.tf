# AWS Region
variable "region" {
  description = "AWS region"
  type        = string
}

# Environment Name (dev, staging, prod)
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}

# VPC CIDR Blocks for different environments
variable "vpc_cidr" {
  description = "CIDR blocks for VPCs in different environments"
  type = map(string)
  default = {
    dev  = "10.0.0.0/16"
    stage = "10.1.0.0/16"
    prod = "10.2.0.0/16"
  }
}

# Subnet Configuration for different environments
variable "subnets" {
  description = "Subnet configurations for different environments"
  type = map(map(object({
    cidr_block        = string
    map_public_ip     = bool
    availability_zone = string
    name              = string
  })))

  
  default = {
    dev = {
      public_az_1a = {
        cidr_block        = "10.0.1.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1a"
        name              = "dev-public-subnet-az-1a"
      }

      public_az_1b = {
        cidr_block        = "10.0.2.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1b"
        name              = "dev-public-subnet-az-1b"
      }

      private_az_1a = {
        cidr_block        = "10.0.3.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1a"
        name              = "dev-private-subnet-az-1a"
      }
    
      private_az_1b = {
        cidr_block        = "10.0.4.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1b"
        name              = "dev-private-subnet-az-1b"
      }
    
    }
    stage = {
    
      public_az_1a = {
        cidr_block        = "10.1.1.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1a"
        name              = "stage-public-subnet-az-1a"
      }

      public_az_1b = {
        cidr_block        = "10.1.2.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1b"
        name              = "stage-public-subnet-az-1b"
      }

      private_az_1a = {
        cidr_block        = "10.1.3.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1a"
        name              = "stage-private-subnet-az-1a"
      }
    
      private_az_1b = {
        cidr_block        = "10.1.4.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1b"
        name              = "stage-private-subnet-az-1b"
      }
    }

    prod = {
    
      public_az_1a = {
        cidr_block        = "10.2.1.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1a"
        name              = "prod-public-subnet-az-1a"
      }

      public_az_1b = {
        cidr_block        = "10.2.2.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1b"
        name              = "prod-public-subnet-az-1b"
      }

      private_az_1a = {
        cidr_block        = "10.2.3.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1a"
        name              = "prod-private-subnet-az-1a"
      }
    
      private_az_1b = {
        cidr_block        = "10.2.4.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1b"
        name              = "prod-private-subnet-az-1b"
      }
    
    }
  }
}

variable "ami" {
  type = string
  description = "ami id for basiton host "
  
}

variable "key_name" {
  
  type = string
}

variable "instance_type" {
 type = string
 description = "vm type for basiton host "
}

variable "bastion_sg_id" {
  description = "Security group ID for the Bastion host"
  type        = string
}

variable "bastion_ssm_role_name" {
  type = string
  description = "role name that is used for session mmanager"
}