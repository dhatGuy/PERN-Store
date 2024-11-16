variable "ami" {
  type = string
  description = "the ami id used for sonarqube instance"
  

}

variable "instance_type" {
  type = string
  description = "instance type used for sonarqube instance"
  default = "t2.micro" 
}

variable "subnet_id" {
  type = string
  description = "subnet id where the sonarqube instance is deployed "
}

variable "environment" {
  type = string
  description = "env value "
}

variable "sonar_sg_id" {
  type = string
  description = "security group that attach to the  sonarqube instance "
}


variable "availability_zone" {
  type = string
  description = "availablity zone for ebs of sonarqube"
}
