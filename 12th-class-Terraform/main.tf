terraform {
  required_version = ">= 1.1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 3.68"
    }
  }
}

provider "aws" {
  region = "sa-east-1"
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "hello_world" {
  function_name = "hello-world"
  description   = "Hello world lambda"
  role          = aws_iam_role.iam_for_lambda.arn
  filename      = "./hello-world.zip"
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  memory_size   = 256
  timeout       = 10
}