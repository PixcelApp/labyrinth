import { Module } from '@nestjs/common'
import { EntityService } from 'src/modules/entity/entity.service'
import { EntityResolver } from 'src/modules/entity/entity.resolver'
import { UseModelsFeature } from 'src/utils'
import { getConfigValue } from 'src/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UseModelsFeature,
    PassportModule,
    JwtModule.register({
      secret: getConfigValue<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [EntityService, EntityResolver],
})
export class AuthModule {}
