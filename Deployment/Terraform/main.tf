provider "aws" {
  region = var.region
}

module "cicd" {
  source = "./modules/cicd"
  environment = var.environment
  ami = var.ami
  key_name = var.key_name
  instance_type = var.instance_type
  availability_zone = module.network.availability_zone
  sonar-subnet_id = module.network.sonar-subnet_id
  jenkins_subnet_id = module.network.jenkins_subnet_id
  jenkins_sg = module.security.jenkins_sg
  sonar_sg_id = module.security.sonar_sg_id
  jenkins_availablity_zone = module.network.jenkins_availablity_zone
}

module "network" {
  source = "./modules/network"
  environment = var.environment
  bastion_sg_id = module.security.bastion_sg_id
  bastion_ssm_role_name = module.security.bastion_ssm_role_name
  key_name = var.key_name
  ami = var.ami
  instance_type = var.instance_type
  region = var.region
}

module "security" {
  source = "./modules/security"
  vpc_id = module.network.vpc_id
  environment = var.environment

}

module "load_balancer" {
  source = "./modules/load_balancers"
  enviroment = var.environment
  sonar_subnet_ids = module.network.sonar_subnet_ids
  sonar_alb_sg = module.security.sonar_alb_sg
  igw_id = module.network.igw_id
  vpc_id = module.network.vpc_id
  sonar_target_instance = module.cicd.sonar_target_instance

}
module "artifact" {
  source = "./modules/artifacts"
  key_name = var.key_name
  nexus_sg = module.security.nexus_sg
  nexus_subnet = module.network.nexus_subnet
  enviroment = var.environment
  ami = var.ami
}



