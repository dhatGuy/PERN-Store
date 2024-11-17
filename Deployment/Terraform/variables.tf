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

variable "ami" {
  type = string
}

variable "instance_type" {
  type = string
}
variable "key_name" {
  type = string
  
}