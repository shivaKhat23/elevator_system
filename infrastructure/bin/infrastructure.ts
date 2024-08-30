#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { CognitoStack } from "../lib/cognito-stack";
import { createEnv } from "../lib/common";
import { InfrastructureConfig, getConfig } from "../lib/config";

const app = new cdk.App();

const stage = process.env.STAGE ?? "dev";
const singleRegion = process.env.REGION ?? undefined;

// Load stage config
const stageConfig: InfrastructureConfig = getConfig(stage);

stageConfig.deployments.forEach((deployment, i) => {
  if (singleRegion && deployment.region.name != singleRegion) {
    console.log(
      `Skipping deployment in region ${deployment.region.name} (
      "REGION" env var has been set to "${singleRegion}").`
    );
  } else {
    const env = createEnv(deployment.region.name, deployment.accountId);

    const cognitoStack = new CognitoStack(app, "cognito", stage, { env });
  }
});
