import { Module } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'
import { UserResolver } from 'src/modules/user/user.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from 'src/models/User.model'
import { EntityModel } from 'src/models/Entity.model'
import { EntityService } from 'src/modules/entity/entity.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, EntityModel])],
  providers: [UserService, UserResolver, EntityService],
})
export class UserModule {}
