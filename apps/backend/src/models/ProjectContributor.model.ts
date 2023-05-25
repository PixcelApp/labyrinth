import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { Snowflake } from 'src/models/tools'
import { UserModel } from 'src/models/User.model'
import { ProjectModel } from 'src/models/Project.model'

@ObjectType('ProjectContributor')
@Entity('project_contributors')
export class ProjectContributorModel {
  @Snowflake()
  userId: string

  @Snowflake()
  projectId: string

  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserModel

  @OneToOne(() => ProjectModel, { cascade: true })
  @JoinColumn({ name: 'projectId' })
  project: ProjectModel

  @Field(() => Number)
  @Column('integer')
  permissions: number
}
