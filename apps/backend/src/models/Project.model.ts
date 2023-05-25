import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { EntityModel } from 'src/models/Entity.model'
import { Snowflake } from 'src/models/tools'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { ProjectContributorModel } from 'src/models/ProjectContributor.model'

export enum ProjectType {
  Default,
  Simple,
}

registerEnumType(ProjectType, {
  name: 'ProjectType',
})

@ObjectType('Project')
@Entity('projects')
export class ProjectModel {
  @Snowflake()
  id: string

  @Field(() => ProjectType)
  @Column('enum', { enum: ProjectType })
  type: ProjectType

  @Field(() => String)
  @Column('text', { nullable: false })
  name: string

  @Field(() => EntityModel)
  @OneToOne(() => EntityModel, { cascade: true })
  @JoinColumn({ name: 'id' })
  entity: EntityModel

  @Field(() => [ProjectContributorModel])
  @OneToMany(() => ProjectContributorModel, (member) => member.userId)
  members: ProjectContributorModel[]
}
