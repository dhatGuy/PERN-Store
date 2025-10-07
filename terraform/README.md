Here’s a cleaned-up **README.md** you can drop into your `terraform/` folder (it reflects what we actually built: `t3.micro`, Elastic IP, IAM role, hardened SG, auto-discovered Ubuntu AMI).

```md
# Terraform — PERN DevOps Infra (Phase 2)

Provision a lean, secure baseline in **eu-north-1 (Stockholm)** using the **default VPC**:

- **EC2**: Ubuntu 22.04 LTS, `t3.micro` (Free Tier), Docker preinstalled
- **Elastic IP**: stable public address
- **Security Group**: 80/443 open to world; admin ports **restricted to your /32**
  - Admin ports: 22, 3000, 9000, 5432, 9090, 3001 (and 8080 for Jenkins when enabled)
- **S3**: artifacts bucket with **versioning**
- **IAM**: instance profile with **RW only to this bucket**
- **AMI**: resolved automatically (no hardcoded ID)

---

## Prereqs
- Terraform ≥ 1.6
- AWS account with an access key configured locally (`aws configure`)
- An SSH public key on your machine (we use `~/.ssh/mklord.pub` in examples)

## Files
```

terraform/
provider.tf
variables.tf
ec2.tf
security-groups.tf
s3.tf
iam.tf
eip.tf
ami.tf
outputs.tf
terraform.tfvars

````

## Configure
Edit `terraform.tfvars`:
```hcl
aws_region      = "eu-north-1"
instance_type   = "t3.micro"
ssh_key_name    = ""  # Terraform creates the AWS key from your local public key
public_key_path = "/Users/marvintowett/.ssh/mklord.pub"
allow_ssh_cidr  = "<YOUR.PUBLIC.IP>/32"  # e.g., 105.161.85.56/32
````

> **Note:** AMI is auto-selected via `data "aws_ami" "ubuntu_2204"`.

## Deploy

```bash
terraform init
terraform plan
terraform apply
# approve with: yes
```

### Outputs

* `elastic_ip` – stable public IP for SSH/web
* `ec2_public_dns` – EC2 public DNS
* `s3_bucket_name` – artifacts bucket name
* `security_group` – SG id

## Connect

```bash
ssh -i ~/.ssh/mklord ubuntu@$(terraform output -raw elastic_ip)
```

## Verify S3 access (from the EC2 instance)

```bash
BUCKET="$(terraform output -raw s3_bucket_name)"   # run from terraform dir locally to get the name
# On the instance:
REGION="eu-north-1"
aws s3 ls s3://$BUCKET --region $REGION
echo "hello" > /tmp/ping.txt
aws s3 cp /tmp/ping.txt s3://$BUCKET/phase2/ping.txt --region $REGION
aws s3 ls s3://$BUCKET/phase2/ --region $REGION
```

## Open Jenkins (optional, Phase 3)

Add this rule to `security-groups.tf` before applying:

```hcl
{ from = 8080, to = 8080, proto = "tcp", cidr = var.allow_ssh_cidr }  # Jenkins UI to your /32
```

Then `terraform apply` and browse `http://$(terraform output -raw elastic_ip):8080`.

## Tear down

```bash
terraform destroy
```

## Notes

* Keep `allow_ssh_cidr` tight. If your IP changes, update it and `terraform apply`.
* 5432/3000/9000/9090/3001 are **admin-only** while setting up. Expose publicly only if required.

