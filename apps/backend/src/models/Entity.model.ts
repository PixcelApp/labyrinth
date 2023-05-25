import { ObjectType } from '@nestjs/graphql'
import { Entity } from 'typeorm'
import { Snowflake } from 'src/models/tools'

@ObjectType('Entity')
@Entity('entities')
export class EntityModel {
  @Snowflake()
  id: string
}
