import { Entity, PrimaryColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity()
export class EntityModel {
  @Field()
  @PrimaryColumn('varchar')
  id: string
}
