output "public_ip_Basiton_host" {
  value = module.network.public_ip_Basiton_host
}

output "Basiton_Instance_Id" {
  value = module.network.Basiton_Instance_Id
}

output "sonar_lb_dns" {
  value = module.load_balancer.sonar_lb_dns
}

