import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProjectModel } from 'src/models/Project.model'
import { EntityModel } from 'src/models/Entity.model'
import { snowflake } from 'src/utils'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectModel)
    private projects: Repository<ProjectModel>,
  ) {}

  get = (id: string) => this.projects.findOneBy({ id })

  create = (name: string) => {
    const entity = new EntityModel()
    entity.id = snowflake()

    const project = new ProjectModel()
    project.entity = entity
    project.members = []

    return this.projects.save(entity)
  }
}
