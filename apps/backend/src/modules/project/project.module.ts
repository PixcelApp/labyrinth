import { Module } from '@nestjs/common'
import { ProjectService } from 'src/modules/project/project.service'
import { ProjectResolver } from 'src/modules/project/project.resolver'
import { EntityService } from 'src/modules/entity/entity.service'
import { UserService } from 'src/modules/user/user.service'
import { UseModelsFeature } from 'src/utils'

@Module({
  imports: [UseModelsFeature],
  providers: [ProjectService, EntityService, UserService, ProjectResolver],
})
export class ProjectModule {}
