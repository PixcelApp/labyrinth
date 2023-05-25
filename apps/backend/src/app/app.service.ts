import { Injectable } from '@nestjs/common'
import { InjectAuthentication } from '@twirelab/nestjs-auth0'
import { AuthenticationClient } from 'auth0'
import { getConfigValue } from 'src/config'

@Injectable()
export class AppService {
  constructor(
    @InjectAuthentication()
    private readonly authentication: AuthenticationClient,
  ) {}

  getCredentialsGrant = () =>
    this.authentication.clientCredentialsGrant({
      audience: getConfigValue<string>('VITE_AUTH0_AUDIENCE'),
    })

  grant = (code: string) =>
    this.authentication.oauth.authorizationCodeGrant({
      code,
      redirect_uri: 'http://localhost:3001/auth/callback',
    })
}
