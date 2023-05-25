import { Args, Query, Resolver } from '@nestjs/graphql'
import { OrganizationModel } from 'src/models/Organization.model'
import { OrganizationService } from 'src/modules/organization/organization.service'

@Resolver(OrganizationModel)
export class OrganizationResolver {
  constructor(private readonly organizations: OrganizationService) {}

  @Query(() => OrganizationModel, { nullable: true })
  project(@Args('id') id: string) {
    return this.organizations.get(id)
  }
}
