import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, PrimaryColumn } from 'typeorm'

@ObjectType('Entity')
@Entity('entities')
export class EntityModel {
  @Field(() => String)
  @PrimaryColumn('varchar')
  id: string
}
