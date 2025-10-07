resource "aws_eip" "pern" {
  domain = "vpc"
  tags   = { Name = "${var.project_name}-eip" }
}

resource "aws_eip_association" "pern" {
  allocation_id = aws_eip.pern.id
  instance_id   = aws_instance.pern_ec2.id
}
