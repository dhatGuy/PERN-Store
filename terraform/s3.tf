resource "random_id" "suffix" { byte_length = 3 }

resource "aws_s3_bucket" "artifacts" {
  bucket = "${var.project_name}-artifacts-${random_id.suffix.hex}"
}

resource "aws_s3_bucket_versioning" "ver" {
  bucket = aws_s3_bucket.artifacts.id
  versioning_configuration { status = "Enabled" }
}

output "s3_bucket_name" { value = aws_s3_bucket.artifacts.bucket }
