# load balancer configuration for sonar qube 
resource "aws_lb" "sonar-lb" {
  name = "${var.enviroment}-sonar-lb"
  load_balancer_type = "application"
  internal = false
  security_groups = [var.sonar_alb_sg]
  subnets = var.sonar_subnet_ids 
  depends_on = [var.igw_id]

}


# target group for sonar alb

resource "aws_lb_target_group" "sonar_lb_tg" {
  name = "${var.enviroment}-sonar-lb-tg"
  vpc_id = var.vpc_id
  
  target_type = "instance"
  protocol_version = "HTTP1"
  health_check {
    path = "/"
  }
  port = 9000
  protocol = "HTTP"
  
  tags = {
    Name = "${var.enviroment}-sonar-lb-tg"
  }
}

resource "aws_lb_target_group_attachment" "sonar_lb_tg_attachment" {
  target_group_arn = aws_lb_target_group.sonar_lb_tg.arn
  target_id        = var.sonar_target_instance
  port             = 9000
}


# Listener for sonar lb

resource "aws_lb_listener" "sonar_alb_listener" {
  protocol = "HTTP"
  port = 9000
  load_balancer_arn = aws_lb.sonar-lb.arn
  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.sonar_lb_tg.arn
  }
}





