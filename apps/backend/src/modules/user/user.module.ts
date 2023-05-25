import { Module } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'
import { UserResolver } from 'src/modules/user/user.resolver'
import { EntityService } from 'src/modules/entity/entity.service'
import { UseModelsFeature } from 'src/utils'

@Module({
  imports: [UseModelsFeature],
  providers: [UserService, UserResolver, EntityService],
})
export class UserModule {}
