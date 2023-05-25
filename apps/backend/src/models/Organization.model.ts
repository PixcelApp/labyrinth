import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { EntityModel } from 'src/models/Entity.model'
import { Snowflake } from 'src/models/tools'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { OrganizationContributorModel } from 'src/models/OrganizationContributor.model'

export enum OrganizationType {
  Default,
}

registerEnumType(OrganizationType, {
  name: 'OrganizationType',
})

@ObjectType('Organization')
@Entity('organizations')
export class OrganizationModel {
  @Snowflake()
  id: string

  @Field(() => OrganizationType)
  @Column('enum', { enum: OrganizationType })
  type: OrganizationType

  @Field(() => EntityModel)
  @OneToOne(() => EntityModel, { cascade: true })
  @JoinColumn({ name: 'id' })
  entity: EntityModel

  @Field(() => [OrganizationContributorModel])
  @OneToMany(() => OrganizationContributorModel, (member) => member.userId)
  members: OrganizationContributorModel[]
}
