import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserModel } from 'src/models/User.model'
import { UserService } from 'src/modules/user.service'

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly users: UserService) {}

  @Query(() => UserModel, { nullable: true })
  user(@Args('id') id: string) {
    return this.users.get(id)
  }

  @Mutation(() => UserModel)
  createUser(@Args('username') username: string) {
    return this.users.create(username)
  }
}
