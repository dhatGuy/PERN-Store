
variable "vpc_id" {
  type        = string
  description = "VPC ID used for security group resources"
}

variable "environment" {
  type        = string
  description = "Environment for tagging resources"
}

variable "bastion_ingress_rules" {
  type = map(object({
    from_port   = number
    to_port     = number
    protocol    = string

    cidr_block = list(string)
  }))
  default = {
   
    http = {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
    https = {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
    ssh ={
      from_port = 22
      to_port = 22
      protocol = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
  }
}

variable "sonar_ingress_rules" {
  type = map(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_block = list(string)
  }))
  default = {
    ssh = {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
    http = {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
    https = {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
    custom_tcp = {
      from_port = 9000
       to_port = 9000
       protocol = "tcp"
       cidr_block = ["0.0.0.0/0"]
    }
  }
}

variable "jenkins_ingress_rules" {
  type = map(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_block = list(string)
  }))

  default = {
    "ssh" = {
      from_port = 22
      to_port = 22
      protocol = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
    "jenkins" = {
      from_port = 8080
      to_port = 8080
      protocol = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
  }
}

variable "sonar_alb_ingress_rules" {
  type = map(object({
    from_port = number
    to_port = number
    protocol = string
    cidr_block = list(string) 
  }))

  default =  {
    "http" = {
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
    "sonar" = {
      from_port = 9000
      to_port = 9000
      protocol = "tcp"
      cidr_block = ["0.0.0.0/0"]
    }
  }
}