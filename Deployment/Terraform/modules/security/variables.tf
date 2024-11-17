
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

    cidr_blocks = list(string)
  }))
  default = {
    ssh = {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    http = {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    https = {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}

variable "sonar_ingress_rules" {
  type = map(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
  default = {
    ssh = {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    http = {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    https = {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    custom_tcp = {
      from_port = 9000
       to_port = 9000
       protocol = "tcp"
       cidr_blocks = ["0.0.0.0/0"]
    }
  }
}
