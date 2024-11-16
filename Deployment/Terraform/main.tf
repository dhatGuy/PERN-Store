provider "aws" {
  region = var.region
}


module "network" {
  source = "./modules/network"
  environment = var.environment
  bastion_sg_id = module.security.bastion_sg_id
}

module "security" {
  source = "./modules/security"
  vpc_id = module.network.vpc_id
  environment = var.environment
}

