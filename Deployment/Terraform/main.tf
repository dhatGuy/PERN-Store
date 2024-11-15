provider "aws" {
  region = var.region
}


module "network" {
  source = "./modules/network"
  environment = var.environment
}

