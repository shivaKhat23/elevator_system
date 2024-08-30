import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Constants } from "./constants";

export abstract class InfraBaseStack extends Stack {
  constructor(
    scope: Construct,
    stackName: string,
    stage: string,
    props: StackProps
  ) {
    super(
      scope,
      `${Constants.appPrefix}-${props.env!.region}-${stage}-${stackName}`,
      props
    );
  }
}
