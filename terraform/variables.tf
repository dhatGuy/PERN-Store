variable "project_name" {
  type    = string
  default = "e-commerce-project"
}

variable "aws_region" {
  type    = string
  default = "eu-west-1" # will be overridden by terraform.tfvars = eu-north-1
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "ami_id" {
  type        = string
  description = "Ubuntu 22.04 AMI ID for your region"
}

variable "ssh_key_name" {
  type        = string
  description = "Existing AWS key pair name for SSH access"
}

variable "public_key_path" {
  type    = string
  default = ""
}

variable "allow_ssh_cidr" {
  type    = string
  default = "0.0.0.0/0"
}
