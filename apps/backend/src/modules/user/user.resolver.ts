import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { UserModel } from 'src/models/User.model'
import { UserService } from 'src/modules/user/user.service'
import { EntityModel } from 'src/models/Entity.model'
import { EntityService } from 'src/modules/entity/entity.service'

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private readonly users: UserService,
    private readonly entities: EntityService,
  ) {}

  @Query(() => UserModel, { nullable: true })
  user(@Args('id') id: string) {
    return this.users.get(id)
  }

  @Mutation(() => UserModel)
  createUser(@Args('username') username: string) {
    return this.users.create(username)
  }

  @ResolveField(() => EntityModel)
  entity(@Parent() { entity }: UserModel) {
    return this.entities.get(entity.id)
  }
}
