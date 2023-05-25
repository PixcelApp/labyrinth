import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { Snowflake } from 'src/models/tools'
import { UserModel } from 'src/models/User.model'
import { OrganizationModel } from 'src/models/Organization.model'

@ObjectType('OrganizationContributor')
@Entity('organization_contributors')
export class OrganizationContributorModel {
  @Snowflake()
  userId: string

  @Snowflake()
  organizationId: string

  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserModel

  @OneToOne(() => OrganizationModel, { cascade: true })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationModel

  @Field(() => Number)
  @Column('integer')
  permissions: number
}
