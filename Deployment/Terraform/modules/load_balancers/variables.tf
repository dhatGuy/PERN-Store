variable "enviroment" {
  description = "env name"
  type = string
}

variable "sonar_alb_sg" {
  description = "security group for sonar alb "
  type = string
}

variable "sonar_subnet_ids" {
  type = list(string)
}

variable "igw_id" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "sonar_target_instance" {
  type = string
}