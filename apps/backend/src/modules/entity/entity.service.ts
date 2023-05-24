import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EntityModel } from 'src/models/Entity.model'

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(EntityModel)
    private entities: Repository<EntityModel>,
  ) {}

  get = (id: string) => this.entities.findOneBy({ id })
}
