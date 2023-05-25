import { Module } from '@nestjs/common'
import { EntityService } from 'src/modules/entity/entity.service'
import { EntityResolver } from 'src/modules/entity/entity.resolver'
import { UseModelsFeature } from 'src/utils'

@Module({
  imports: [UseModelsFeature],
  providers: [EntityService, EntityResolver],
})
export class EntityModule {}
