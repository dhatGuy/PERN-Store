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