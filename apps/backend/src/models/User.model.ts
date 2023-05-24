import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { EntityModel } from 'src/models/Entity.model'
import { Options } from 'src/models/tools'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

export enum UserType {
  Preview,
  Free,
  Premium,
  Moderator,
}

registerEnumType(UserType, {
  name: 'UserType',
})

@ObjectType('User')
@Entity('users')
export class UserModel extends EntityModel {
  @JoinColumn()
  @Field(() => EntityModel)
  @OneToOne(() => EntityModel, {
    nullable: false,
    cascade: true,
  })
  entity: EntityModel

  @Field(() => String)
  @Column('varchar', Options.unique)
  username: string

  @Field(() => String, Options.nullable)
  @Column('text', Options.nullable)
  nickname?: string

  @Field(() => UserType)
  @Column('enum', { enum: UserType })
  type: UserType
}
