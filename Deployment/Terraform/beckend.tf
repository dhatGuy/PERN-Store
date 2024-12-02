resource "aws_s3_bucket" "State_bucket" {
  bucket = "pern-store-s3-bucket-777"
  
}
resource "aws_s3_bucket_versioning" "version_s3" {
  bucket = aws_s3_bucket.State_bucket.id
  versioning_configuration {
    status = "Enabled"

  }
 
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encryption_s3" {
  bucket = aws_s3_bucket.State_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
 
}
# creating aws dynamodb for enabling state locking 
resource "aws_dynamodb_table" "statelocking" {
  name         = "state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
  

}