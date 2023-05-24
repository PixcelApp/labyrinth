import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel, UserType } from 'src/models/User.model'
import { Repository } from 'typeorm'
import { snowflake } from 'src/utils'
import { EntityModel } from 'src/models/Entity.model'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EntityModel)
    private entities: Repository<EntityModel>,
    @InjectRepository(UserModel)
    private users: Repository<UserModel>,
  ) {}

  get = (id: string) =>
    this.users.findOne({ where: { id }, relations: { entity: true } })

  create = async (username: string) => {
    const entity = this.entities.create({
      id: snowflake(),
    })

    const user = this.users.create({
      id: entity.id,
      entity,
      type: UserType.Preview,
      username: username.toLowerCase(),
    })

    await this.entities.save(entity)
    return await this.users.save(user)
  }
}
