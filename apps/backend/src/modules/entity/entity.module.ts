import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntityModel } from 'src/models/Entity.model'
import { EntityService } from 'src/modules/entity/entity.service'
import { EntityResolver } from 'src/modules/entity/entity.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([EntityModel])],
  providers: [EntityService, EntityResolver],
})
export class EntityModule {}
