import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrganizationModel } from 'src/models/Organization.model'

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationModel)
    private organizations: Repository<OrganizationModel>,
  ) {}

  get = (id: string) => this.organizations.findOneBy({ id })
}
