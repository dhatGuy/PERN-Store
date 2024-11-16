output "bastion_sg_id" {
  value = aws_security_group.bastion_sg.id
}

output "bastion_ssm_role_name" {
  value = aws_iam_role.bastion_ssm_role.name
}