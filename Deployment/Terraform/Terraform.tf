terraform {
backend "s3" {
    bucket         = "pern-store-s3-bucket-777"
    dynamodb_table = "state-lock"
    key            = "Terraform/dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
}
}