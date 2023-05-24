import 'reflect-metadata'

import { DataSource } from 'typeorm'
import { getConfigValue } from 'src/config'
import { EntityModel } from 'src/models/Entity.model'
import { UserModel } from 'src/models/User.model'
import { parse } from 'pg-connection-string'

export const connectionOptions = parse(getConfigValue<string>('DATABASE_URL'))

export const pgDataSource = new DataSource({
  type: 'postgres',
  entities: [EntityModel, UserModel],
  host: connectionOptions.host,
  port: Number(connectionOptions.port),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: true,
})
