import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EntityModel } from 'src/models/Entity.model'
import { JwtService } from '@nestjs/jwt'
import { getConfigValue } from 'src/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EntityModel)
    private entities: Repository<EntityModel>,
    private jwt: JwtService,
  ) {}

  get = (id: string) => this.entities.findOneBy({ id })

  login = async (id: string) => {
    const user = await this.get(id)
    return this.jwt.sign(
      { id: user.id },
      { secret: getConfigValue<string>('JWT_SECRET') },
    )
  }
}
