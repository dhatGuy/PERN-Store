provider "aws" {
  region = var.region
}

module "cicd" {
  source = "./modules/cicd"
  environment = var.environment
  ami = var.ami
  subnet_id = module.network.subnet_id
  sonar_sg_id = module.security.sonar_sg_id
  availability_zone = module.network.availability_zone

}

module "network" {
  source = "./modules/network"
  environment = var.environment
  bastion_sg_id = module.security.bastion_sg_id
  bastion_ssm_role_name = module.security.bastion_ssm_role_name
  ami = var.ami
}

module "security" {
  source = "./modules/security"
  vpc_id = module.network.vpc_id
  environment = var.environment

}

