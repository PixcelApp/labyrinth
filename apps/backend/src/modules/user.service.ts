import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel, UserType } from 'src/models/User.model'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private users: Repository<UserModel>,
  ) {}

  get = (id: string) => this.users.findOneBy({ id })

  create = (username: string) => {
    return this.users.save(
      this.users.create({
        id: 'test',
        username,
        nickname: username,
        type: UserType.Moderator,
      }),
    )
  }
}
