// src/auth/OAuth.js
import { cognitoConfig } from '@/config/cognito-config';

export const getAuthorizationUrl = () => {
  const { clientId, domain, redirectUri } = cognitoConfig;
  const responseType = 'code';
  const scope = 'email+openid';

  return `https://${domain}/login?response_type=${responseType}&client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
};

interface TokenResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
}

export const handleCallback = async (search: string): Promise<TokenResponse> => {
  const params = new URLSearchParams(search);
  const code = params.get('code');

  if (!code) {
    throw new Error('Authorization code not found');
  }

  const tokenUrl = `https://${cognitoConfig.domain}/oauth2/token`;
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: cognitoConfig.clientId,
    redirect_uri: cognitoConfig.redirectUri,
    code,
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Token request failed');
  }

  return response.json();
};

export const refreshAccessToken = async (refreshToken: string): Promise<TokenResponse> => {
  const tokenUrl = `https://${cognitoConfig.domain}/oauth2/token`;
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: cognitoConfig.clientId,
    refresh_token: refreshToken,
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    console.error('Token refresh request failed');
    throw new Error('Token refresh request failed');
  }

  return response.json();
};
