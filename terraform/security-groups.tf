resource "aws_security_group" "pern_sg" {
  name        = "${var.project_name}-sg"
  description = "Allow admin SSH, web, limited app/monitoring"
  vpc_id      = data.aws_vpc.default.id

  # Admin-only ports (your /32)
  dynamic "ingress" {
    for_each = [
      { from = 22, to = 22, proto = "tcp", cidr = var.allow_ssh_cidr },     # SSH
      { from = 3000, to = 3000, proto = "tcp", cidr = var.allow_ssh_cidr }, # Frontend (admin only during setup)
      { from = 9000, to = 9000, proto = "tcp", cidr = var.allow_ssh_cidr }, # Backend (admin only)
      { from = 5432, to = 5432, proto = "tcp", cidr = var.allow_ssh_cidr }, # Postgres (admin only)
      { from = 9090, to = 9090, proto = "tcp", cidr = var.allow_ssh_cidr }, # Prometheus (admin only)
      { from = 3001, to = 3001, proto = "tcp", cidr = var.allow_ssh_cidr }, # Grafana (admin only)
    ]
    content {
      from_port   = ingress.value.from
      to_port     = ingress.value.to
      protocol    = ingress.value.proto
      cidr_blocks = [ingress.value.cidr]
    }
  }

  # Public web (leave open)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}-sg" }
}
