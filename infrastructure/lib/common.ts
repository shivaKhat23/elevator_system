import { RegionInfo } from "aws-cdk-lib/region-info";
import { Constants } from "./constants";

export function createEnv(region: string, accountId: string) {
  return {
    region: region,
    account: accountId,
  };
}

export function getGlobalName(region: RegionInfo, stage: string, name: string) {
  return `${Constants.appPrefix}-${region.name}-${stage}-${name}`;
}
