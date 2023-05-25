import { AuthorizationParams } from '@auth0/auth0-react'

export const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN
export const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID

export const authorizationParams: AuthorizationParams = {
  redirect_uri: 'http://localhost:3001/auth/callback',
}
