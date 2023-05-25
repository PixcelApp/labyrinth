import 'reflect-metadata'

import { DataSource } from 'typeorm'
import { getConfigValue } from 'src/config'
import { parse } from 'pg-connection-string'
import { AllModels } from 'src/models'

export const connectionOptions = parse(
  getConfigValue<string>('DATABASE_URL', { required: true }),
)

export const pgDataSource = new DataSource({
  type: 'postgres',
  entities: AllModels,
  host: connectionOptions.host,
  port: Number(connectionOptions.port),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: true,
})
