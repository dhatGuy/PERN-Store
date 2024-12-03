output "bastion_sg_id" {
  value = aws_security_group.bastion_sg.id
}

output "bastion_ssm_role_name" {
  value = aws_iam_role.bastion_ssm_role.name
}
output "jenkins_sg" {
  value = aws_security_group.jenkins_sg.id
}

output "sonar_sg_id" {
  value = aws_security_group.sonar_sg.id
}

output "sonar_alb_sg" {
  value = aws_security_group.sonar_alb_sg.id
}


output "nexus_sg" {
  value = aws_security_group.nexus_sg.id
}
