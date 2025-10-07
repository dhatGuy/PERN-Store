# Allow EC2 to assume the role
data "aws_iam_policy_document" "ec2_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "pern_ec2" {
  name               = "${var.project_name}-ec2-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role.json
}

# Restrict EC2 to only your artifacts bucket
data "aws_iam_policy_document" "s3_rw_bucket" {
  statement {
    sid       = "ListBucket"
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.artifacts.arn]
  }
  statement {
    sid       = "RWObjects"
    effect    = "Allow"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.artifacts.arn}/*"]
  }
}

resource "aws_iam_policy" "s3_rw_policy" {
  name   = "${var.project_name}-s3-rw"
  policy = data.aws_iam_policy_document.s3_rw_bucket.json
}

resource "aws_iam_role_policy_attachment" "attach_s3_rw" {
  role       = aws_iam_role.pern_ec2.name
  policy_arn = aws_iam_policy.s3_rw_policy.arn
}

resource "aws_iam_instance_profile" "pern" {
  name = "${var.project_name}-instance-profile"
  role = aws_iam_role.pern_ec2.name
}
