variable "ami" {
  type = string
}

variable "instance_type" {
  type = string
  default = "t2.medium"
}

variable "enviroment" {
  type = string

}

variable "nexus_subnet" {
  type = string
}

variable "nexus_sg" {
  type = string
}


variable "key_name" {
  type = string
  
}
