import { Column, Entity } from 'typeorm'
import { EntityModel } from 'src/models/Entity.model'
import { Field, ObjectType } from '@nestjs/graphql'

export enum UserType {
  Preview,
  Free,
  Premium,
  Moderator,
}

@ObjectType()
@Entity()
export class UserModel extends EntityModel {
  @Field()
  @Column('varchar', { unique: true })
  username: string

  @Field()
  @Column('text')
  nickname?: string

  @Field()
  @Column('enum', { enum: UserType })
  type: UserType
}
