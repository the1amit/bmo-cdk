import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class DbTier extends Construct {
  public readonly vpc: ec2.Vpc;
  public readonly dbCluster: rds.DatabaseCluster;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create a VPC
    this.vpc = new ec2.Vpc(this, 'DbVpc', { maxAzs: 3 });

    // Create a security group for RDS
    const securityGroup = new ec2.SecurityGroup(this, 'DBSecurityGroup', {
      vpc: this.vpc,
      allowAllOutbound: true,
    });

    // Create RDS Aurora cluster
    this.dbCluster = new rds.DatabaseCluster(this, 'AuroraCluster', {
      engine: rds.DatabaseClusterEngine.auroraMysql({
        version: rds.AuroraMysqlEngineVersion.VER_3_05_2,
      }),
      instanceProps: {
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.R6G, ec2.InstanceSize.XLARGE4),
        vpc: this.vpc,
        securityGroups: [securityGroup],
      },
      defaultDatabaseName: 'woocommerce',
      credentials: rds.Credentials.fromPassword('admin', cdk.SecretValue.unsafePlainText('adminpassword')), // Use secrets manager for real applications
    });
  }
}
