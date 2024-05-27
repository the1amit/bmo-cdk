import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';

interface WebTierProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  service: ecs.FargateService;
}

export class WebTier extends Construct {
  constructor(scope: Construct, id: string, props: WebTierProps) {
    super(scope, id);

    // Create an Application Load Balancer
    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
      vpc: props.vpc,
      internetFacing: true,
    });

    const listener = lb.addListener('Listener', {
      port: 80,
    });

    listener.addTargets('ECS', {
      port: 80,
      targets: [props.service],
      healthCheck: {
        interval: cdk.Duration.seconds(60),
        path: '/',
        timeout: cdk.Duration.seconds(5),
      },
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: lb.loadBalancerDnsName,
    });
  }
}
