import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from 'src/app/app.service'

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('credentials')
  credentials() {
    return this.service.getCredentialsGrant()
  }

  @Get('auth/callback')
  authCallback(@Query('code') code: string, @Query('state') state: string) {
    return this.service.grant(code)
  }
}
