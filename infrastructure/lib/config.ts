import { RegionInfo } from "aws-cdk-lib/region-info";

export const AWS_ACCOUNT_DEV = "338066357879";
export const AWS_ACCOUNT_ACC = "338066357879";

export type AWSDeployment = {
  region: RegionInfo;
  accountId: string;
};

// defing structure
export type InfrastructureConfig = {
  deployments: AWSDeployment[];
};

// Define defaults
const defaultConfig = {};

const configurations: { [key: string]: InfrastructureConfig } = {
  dev: {
    ...defaultConfig,
    deployments: [
      { region: RegionInfo.get("eu-central-1"), accountId: AWS_ACCOUNT_DEV },
    ],
  },
  acc: {
    ...defaultConfig,
    deployments: [
      { region: RegionInfo.get("eu-central-1"), accountId: AWS_ACCOUNT_ACC },
    ],
  },
};

export const getConfig = function (stage: string): InfrastructureConfig {
  return configurations[stage];
};
