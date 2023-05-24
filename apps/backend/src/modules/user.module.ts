import { Module } from '@nestjs/common'
import { UserService } from 'src/modules/user.service'
import { UserResolver } from 'src/modules/user.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from 'src/models/User.model'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
