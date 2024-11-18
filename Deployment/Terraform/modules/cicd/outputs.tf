output "sonar_public_ip" {
  value = aws_instance.sonarqube_instance.public_ip
  description = "it will be used for the ui access of sonarqube "
}

output "sonar_id" {
  value = aws_instance.sonarqube_instance.id
  description = "it will be used while creating the ssh keys "
}


output "sonar_target_instance" {
  value = aws_instance.sonarqube_instance.id
}
