output "ec2_public_ip" { value = aws_instance.pern_ec2.public_ip }
output "ec2_public_dns" { value = aws_instance.pern_ec2.public_dns }
output "elastic_ip" { value = aws_eip.pern.public_ip }
output "security_group" { value = aws_security_group.pern_sg.id }
