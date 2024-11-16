variable "region" {
  type = string
  description = "default region will be taken "
  default = "us-east-1"
}

variable "environment" {
  type = string 
  description = "Different for every env "
}

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
    prod = {
    
      public_az_1a = {
        cidr_block        = "10.1.1.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1a"
        name              = "prod-public-subnet-az-1a"
      }

      public_az_1b = {
        cidr_block        = "10.1.2.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1b"
        name              = "prod-public-subnet-az-1b"
      }

      private_az_1a = {
        cidr_block        = "10.1.3.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1a"
        name              = "prod-public-subnet-az-1a"
      }
    
      private_az_1b = {
        cidr_block        = "10.1.4.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1b"
        name              = "prod-public-subnet-az-1b"
      }
    }

    stage = {
    
      public_az_1a = {
        cidr_block        = "10.2.1.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1a"
        name              = "stage-public-subnet-az-1a"
      }

      public_az_1b = {
        cidr_block        = "10.2.2.0/24"
        map_public_ip     = true
        availability_zone = "us-east-1b"
        name              = "stage-public-subnet-az-1b"
      }

      private_az_1a = {
        cidr_block        = "10.2.3.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1a"
        name              = "stage-public-subnet-az-1a"
      }
    
      private_az_1b = {
        cidr_block        = "10.2.4.0/24"
        map_public_ip     = false
        availability_zone = "us-east-1b"
        name              = "stage-public-subnet-az-1b"
      }
    
    }
  }
}


variable "ami" {
   default = "ami-0866a3c8686eaeeba"
}