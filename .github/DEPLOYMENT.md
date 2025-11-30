# Deployment Guide

This project uses GitHub Actions for CI/CD deployment. Two workflow options are available:

## Workflow Options

| Workflow | Backend | Frontend | File |
|----------|---------|----------|------|
| `deploy.yml` | AWS Lambda | AWS S3 + CloudFront | Primary option |
| `deploy-netlify.yml` | AWS Lambda | Netlify | Alternative option |

## Required GitHub Secrets

Navigate to **Settings → Secrets and variables → Actions** in your GitHub repository to add these secrets.

### AWS Credentials (Required for both workflows)

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM user access key with Lambda, API Gateway, CloudFormation, S3, and IAM permissions |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM user secret access key |
| `SERVERLESS_ACCESS_KEY` | (Optional) Serverless Framework dashboard access key |

### For S3/CloudFront Deployment (`deploy.yml`)

| Secret | Description |
|--------|-------------|
| `S3_BUCKET_NAME` | Name of the S3 bucket for frontend hosting |
| `CLOUDFRONT_DISTRIBUTION_ID` | (Optional) CloudFront distribution ID for cache invalidation |
| `REACT_APP_API_URL` | Backend API URL (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com`) |

### For Netlify Deployment (`deploy-netlify.yml`)

| Secret | Description |
|--------|-------------|
| `NETLIFY_AUTH_TOKEN` | Personal access token from [Netlify User Settings](https://app.netlify.com/user/applications#personal-access-tokens) |
| `NETLIFY_SITE_ID` | Site ID from Netlify site settings → General → Site details |
| `REACT_APP_API_URL` | Backend API URL (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com`) |

## AWS IAM Policy

Minimum IAM policy for the deployment user:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:*",
        "apigateway:*",
        "cloudformation:*",
        "s3:*",
        "iam:GetRole",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:PassRole",
        "logs:*",
        "events:*",
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

## Deployment Triggers

- **Push to `main`/`master`**: Full deployment (backend + frontend)
- **Pull Request**: Tests run + preview deployment (Netlify workflow only)
- **Manual**: Use "Run workflow" button in GitHub Actions

## First-Time Setup

### AWS S3/CloudFront Setup

1. Create an S3 bucket with static website hosting enabled
2. Create a CloudFront distribution pointing to the S3 bucket
3. Configure bucket policy for public read access or CloudFront OAI

### Netlify Setup

1. Create a new site in Netlify (can be empty initially)
2. Get the Site ID from Site Settings → General
3. Generate a Personal Access Token from User Settings

## Environment Variables

The frontend build uses these environment variables:

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend API endpoint URL |

## Disabling a Workflow

To disable one of the workflows:
1. Go to **Actions** tab in GitHub
2. Select the workflow
3. Click the `...` menu and select "Disable workflow"

Or simply delete the workflow file you don't need.
