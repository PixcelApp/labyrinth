import { Module } from '@nestjs/common'
import { OrganizationService } from 'src/modules/organization/organization.service'
import { OrganizationResolver } from 'src/modules/organization/organization.resolver'
import { EntityService } from 'src/modules/entity/entity.service'
import { UserService } from 'src/modules/user/user.service'
import { UseModelsFeature } from 'src/utils'

@Module({
  imports: [UseModelsFeature],
  providers: [
    OrganizationService,
    EntityService,
    UserService,
    OrganizationResolver,
  ],
})
export class OrganizationModule {}
