import * as cdk from "aws-cdk-lib";
import {
  AccountRecovery,
  OAuthScope,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  UserPoolDomain,
  VerificationEmailStyle,
  CfnUserPoolGroup,
} from "aws-cdk-lib/aws-cognito";
import { RegionInfo } from "aws-cdk-lib/region-info";
import { Construct } from "constructs";
import { getGlobalName } from "./common";
import { Constants } from "./constants";
import { InfraBaseStack } from "./infra-base-stack";

export class CognitoStack extends InfraBaseStack {
  readonly userPoolArn: string;

  constructor(
    scope: Construct,
    stackName: string,
    stage: string,
    props: cdk.StackProps
  ) {
    super(scope, stackName, stage, props);

    //Cognito
    const userPool = new UserPool(this, "cognito-user-pool", {
      userPoolName: getGlobalName(
        RegionInfo.get(this.region),
        stage,
        "cognito-user-pool"
      ),
      deletionProtection: true,
      selfSignUpEnabled: false,
      signInCaseSensitive: true,
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      signInAliases: {
        email: true,
        phone: false,
        username: false,
      },
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireDigits: false,
        requireLowercase: false,
        requireUppercase: false,
      },
      userVerification: {
        emailStyle: VerificationEmailStyle.CODE,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
    });

    new UserPoolDomain(this, "cognito-user-pool-domain", {
      userPool,
      cognitoDomain: {
        domainPrefix: `${Constants.appPrefix}-${stage}`,
      },
    });

    const defaultUserPoolClientConfig = {
      userPool,
      authSessionValidity: cdk.Duration.minutes(3),
      idTokenValidity: cdk.Duration.hours(1),
      accessTokenValidity: cdk.Duration.hours(1),
      refreshTokenValidity: cdk.Duration.days(30),
      preventUserExistenceErrors: false,
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
    };

    new UserPoolClient(this, "cognito-user-pool-client-frontend", {
      ...defaultUserPoolClientConfig,
      userPoolClientName: getGlobalName(
        RegionInfo.get(this.region),
        stage,
        "cognito-user-pool-client-frontend"
      ),
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        userSrp: false,
        custom: false,
      },
      oAuth: {
        callbackUrls: ["http://localhost:5173/callback"],
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [OAuthScope.EMAIL, OAuthScope.OPENID],
      },
    });

    new UserPoolClient(this, "cognito-user-pool-client-postman", {
      ...defaultUserPoolClientConfig,
      userPoolClientName: getGlobalName(
        RegionInfo.get(this.region),
        stage,
        "cognito-user-pool-client-postman"
      ),
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        userSrp: false,
        custom: false,
      },
      generateSecret: true,
      oAuth: {
        callbackUrls: ["https://oauth.pstmn.io/v1/callback"],
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [OAuthScope.EMAIL, OAuthScope.OPENID],
      },
    });

    new UserPoolClient(this, "cognito-user-pool-client-aws-sdk", {
      ...defaultUserPoolClientConfig,
      userPoolClientName: getGlobalName(
        RegionInfo.get(this.region),
        stage,
        "cognito-user-pool-client-aws-sdk"
      ),
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        userSrp: false,
        custom: false,
      },
      disableOAuth: true,
    });

    const adminGroup = new CfnUserPoolGroup(this, "AdminGroup", {
      groupName: "Admin",
      userPoolId: userPool.userPoolId,
      description: "Group for admins",
      precedence: 1,
    });

    const usersGroup = new CfnUserPoolGroup(this, "UsersGroup", {
      groupName: "User",
      userPoolId: userPool.userPoolId,
      description: "Group for general users",
      precedence: 2,
    });
  }
}
