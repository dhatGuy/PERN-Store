output "vpc_id" {
  value = aws_vpc.main.id
}
output "public_ip_Basiton_host" {
   value =   aws_instance.bastion_host.public_ip
}
output "Basiton_Instance_Id" {
  value = aws_instance.bastion_host.id
  description = "id needed for ssm"
}

output "sonar-subnet_id" {
  value = aws_subnet.subnets["public_az_1a"].id 
}


output "jenkins_subnet_id" {
  value = aws_subnet.subnets["private_az_1a"].id 
}

output "jenkins_availablity_zone" {
    value = aws_subnet.subnets["private_az_1a"].availability_zone 
}

output "nexus_subnet" {
  value = aws_subnet.subnets["public_az_1b"].id
}

output "sonar_subnet_ids" {
  
  value = [
    aws_subnet.subnets["public_az_1a"].id,
    aws_subnet.subnets["public_az_1b"].id
  ]
}



output "availability_zone" {
  value = aws_subnet.subnets["public_az_1a"].availability_zone
}

output "igw_id" {
  value = aws_internet_gateway.igw.id
}

