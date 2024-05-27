import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DbTier } from './db-tier';
import { AppTier } from './app-tier';

export class BmoCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Instantiate each tier
    const dbTier = new DbTier(this, 'DbTier');
    const appTier = new AppTier(this, 'AppTier', { vpc: dbTier.vpc, dbCluster: dbTier.dbCluster });

  }
}
