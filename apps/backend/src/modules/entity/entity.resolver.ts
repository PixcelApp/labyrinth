import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserModel } from 'src/models/User.model'
import { EntityModel } from 'src/models/Entity.model'
import { EntityService } from 'src/modules/entity/entity.service'

@Resolver(UserModel)
export class EntityResolver {
  constructor(private readonly entities: EntityService) {}

  @Query(() => EntityModel, { nullable: true })
  entity(@Args('id') id: string) {
    return this.entities.get(id)
  }
}
