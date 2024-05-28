# Overview
This document outlines the architecture and implementation of a 3-tier application for deploying a custom WooCommerce-based product using AWS services. The architecture leverages AWS Elastic Load Balancer, AWS ECS Fargate for running Docker containers, and Amazon RDS Aurora for the relational database.

## Components

### 1. Web Tier: AWS Elastic Load Balancer (ALB)
The Web Tier is responsible for distributing incoming traffic across multiple instances of the application running on ECS Fargate.

- **ALB**: An Application Load Balancer that routes incoming HTTP/HTTPS requests to the ECS Fargate services.
- **Listener**: Listens for incoming traffic on port 80 and forwards it to the target group.
- **Target Group**: Contains the ECS Fargate service instances and performs health checks to ensure only healthy instances receive traffic.

### 2. Application Tier: AWS ECS Fargate
The Application Tier hosts the WooCommerce application within Docker containers managed by AWS ECS Fargate.

- **ECS Cluster**: A logical grouping of ECS services.
- **Fargate Task Definition**: Specifies the Docker container image (from Docker Hub), resource requirements (CPU and memory), and environment variables.
- **Fargate Service**: Manages the desired number of task instances and integrates with the ALB target group for load balancing.

### 3. Database Tier: Amazon RDS Aurora
The Database Tier provides a managed relational database service using Amazon RDS Aurora, which is highly available and scalable.

- **RDS Aurora Cluster**: A cluster of Aurora instances that stores the WooCommerce database.
- **Security Group**: Controls the inbound and outbound traffic to the Aurora instances.
- **VPC**: The Virtual Private Cloud that hosts the ECS cluster and RDS Aurora, providing network isolation and security.

## Required Tools 

1. **AWS CLI (Command Line Interface)**:
   - The AWS CLI is essential for interacting with various AWS services from the command line.
   - Install it by following the instructions [here](https://aws.amazon.com/cli/).

2. **AWS Account and User**:
   - You need an AWS account to deploy resources via AWS CDK.
   - Ensure you have appropriate user permissions configured in your AWS account for deploying resources.
   - If you don't have an AWS account, you can create one [here](https://aws.amazon.com/).

3. **Node.js**:
   - AWS CDK is primarily built using Node.js, so you'll need to have Node.js installed.
   - Download and install Node.js from [here](https://nodejs.org/).

4. **IDE (Integrated Development Environment) for your programming language**:
   - Choose an IDE that supports your preferred programming language for CDK code.
   - Popular options include Visual Studio Code, IntelliJ IDEA, and PyCharm.

5. **AWS CDK Toolkit (cdk)**:
   - The AWS CDK Toolkit, commonly referred to as `cdk`, is a command-line tool used for interacting with CDK applications.
   - You can install it globally using npm (Node Package Manager):
     ```bash
     npm install -g aws-cdk
     ```
   
Ensure you have all these tools installed and configured properly before starting your AWS CDK deployment.


## Steps to Deploy

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/the1amit/bmo-cdk.git
    cd bmo-cdk
    ```

2. **Bootstrap CDK Environment:**
    ```bash
    cdk bootstrap
    ```

3. **Deploy the Stack:**
    ```bash
    cdk deploy
    ```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## References

[CDK API Documentation](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib-readme.html)

[CDK Workshop](https://cdkworkshop.com/)

[Tutorial on Deploying a Classic 3-tier Application using AWS CDK](https://dev.to/billykong/deploying-a-classic-3-tiers-application-using-aws-cdk-3k30)

[ChatGPT](https://chatgpt.com/)
