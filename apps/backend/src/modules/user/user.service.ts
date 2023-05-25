import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel, UserType } from 'src/models/User.model'
import { Repository } from 'typeorm'
import { snowflake } from 'src/utils'
import { EntityModel } from 'src/models/Entity.model'
import {
  OrganizationModel,
  OrganizationType,
} from 'src/models/Organization.model'
import { OrganizationContributorModel } from 'src/models/OrganizationContributor.model'
import { Permissions } from 'sdk/permissions'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EntityModel)
    private entities: Repository<EntityModel>,
    @InjectRepository(UserModel)
    private users: Repository<UserModel>,
    @InjectRepository(OrganizationModel)
    private organizations: Repository<OrganizationModel>,
    @InjectRepository(OrganizationContributorModel)
    private organizationContributors: Repository<OrganizationContributorModel>,
  ) {}

  get = (id: string) => this.users.findOneBy({ id })

  create = (username: string) => {
    const entity = new EntityModel()
    entity.id = snowflake()

    const user = new UserModel()
    user.type = UserType.Preview
    user.username = username.toLowerCase()
    user.entity = entity

    return this.users.save(user)
  }
}
