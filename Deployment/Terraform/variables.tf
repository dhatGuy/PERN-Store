variable "region" {
  type = string
  description = "default region will be taken "
  default = "us-east-1"
}

variable "subnets" {
  type = map(object({
    cidr_block        = string
    map_public_ip     = bool
    availability_zone = string
    name              = string
  }))
  default = {
    "public_az_1a" = {
      cidr_block        = "10.0.1.0/24"
      map_public_ip     = true
      availability_zone = "us-east-1a"
      name              = "public-az-1a"
    }
    "public_az_1b" = {
      cidr_block        = "10.0.2.0/24"
      map_public_ip     = true
      availability_zone = "us-east-1b"
      name              = "public-az-1b"
    }
    "private_az_1a" = {
      cidr_block        = "10.0.3.0/24"
      map_public_ip     = false
      availability_zone = "us-east-1a"
      name              = "private-az-1a"
    }
    "private_az_1b" = {
      cidr_block        = "10.0.4.0/24"
      map_public_ip     = false
      availability_zone = "us-east-1b"
      name              = "private-az-1b"
    }
  }
}

# variable "key" {
#     type = string 
#   description = "this is the value for soring the state file on remote backend"
# }