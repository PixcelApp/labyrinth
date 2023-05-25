import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProjectModel } from 'src/models/Project.model'
import { ProjectService } from 'src/modules/project/project.service'

@Resolver(ProjectModel)
export class ProjectResolver {
  constructor(private readonly projects: ProjectService) {}

  @Query(() => ProjectModel, { nullable: true })
  project(@Args('id') id: string) {
    return this.projects.get(id)
  }

  @Mutation(() => ProjectModel)
  createProject(@Args('name') name: string) {
    return this.projects.create(name)
  }
}
