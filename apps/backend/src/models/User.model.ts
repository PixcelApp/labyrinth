import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { EntityModel } from 'src/models/Entity.model'
import { Options, Snowflake } from 'src/models/tools'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { ProjectContributorModel } from 'src/models/ProjectContributor.model'
import { OrganizationContributorModel } from 'src/models/OrganizationContributor.model'
import { AuthModel } from 'src/models/Auth.model'

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
export class UserModel {
  @Snowflake()
  id: string

  @Field(() => UserType)
  @Column('enum', { enum: UserType })
  type: UserType

  @Field(() => EntityModel)
  @OneToOne(() => EntityModel, { cascade: true })
  @JoinColumn({ name: 'id' })
  entity: EntityModel

  @Field(() => AuthModel)
  @OneToOne(() => AuthModel, { cascade: true })
  auth: AuthModel

  @Field(() => String)
  @Column('varchar', Options.unique)
  username: string

  @Field(() => String, Options.nullable)
  @Column('text', Options.nullable)
  nickname?: string

  @Field(() => [ProjectContributorModel])
  @OneToMany(() => ProjectContributorModel, (member) => member.userId)
  projectMemberships: ProjectContributorModel[]

  @Field(() => [OrganizationContributorModel])
  @OneToMany(() => OrganizationContributorModel, (member) => member.userId)
  organizationMemberships: OrganizationContributorModel[]
}
