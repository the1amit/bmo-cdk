import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
//import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

interface AppTierProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  dbCluster: rds.DatabaseCluster;
}

export class AppTier extends Construct {
  public readonly service: ecs.FargateService;

  constructor(scope: Construct, id: string, props: AppTierProps) {
    super(scope, id);

    // Create ECS cluster
    const cluster = new ecs.Cluster(this, 'EcsCluster', {
      vpc: props.vpc,
    });

    // Define Docker image asset if using local Docker image
    //const imageAsset = new ecr_assets.DockerImageAsset(this, 'WooCommerceImage', {
      //directory: 'path/to/woocommerce/dockerfile',  // Update with the correct path
    //});

    // Define Fargate task definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef');
    const container = taskDefinition.addContainer('WooCommerceContainer', {
      image: ecs.ContainerImage.fromRegistry('woocommerce/woocommerce'), // Update with the correct public image name from Docker Hub
     // image: ecs.ContainerImage.fromDockerImageAsset(imageAsset), // Uncomment this if using a local Docker image.
      memoryLimitMiB: 512,
      cpu: 256,
      environment: {
        DB_HOST: props.dbCluster.clusterEndpoint.hostname,
        DB_NAME: 'woocommerce',
        DB_USER: 'admin',
        DB_PASSWORD: 'adminpassword', // Use secrets manager for real applications
      },
    });

    container.addPortMappings({
      containerPort: 80,
    });

    // Create Fargate service
    this.service = new ecs.FargateService(this, 'FargateService', {
      cluster,
      taskDefinition,
      desiredCount: 2,
    });
  }
}
