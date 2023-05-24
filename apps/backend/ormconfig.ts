import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { UserModel } from 'src/models/User.model'
import { EntityModel } from 'src/models/Entity.model'
import { DataSource } from 'typeorm'
import { parse } from 'pg-connection-string'
import { getConfigValue } from 'src/config'

interface BetterConnectionOptions extends PostgresConnectionOptions {
  readonly seeds?: string[]
  readonly factories?: string[]
}

const connectionOptions = parse(getConfigValue<string>('DATABASE_URL'))

const config: BetterConnectionOptions = {
  type: 'postgres',
  entities: [UserModel, EntityModel],
  synchronize: true,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  seeds: ['src/db/seeds/**/*.seed.ts'],
  factories: ['src/db/factories/**/*.factory.ts'],
  host: connectionOptions.host ?? undefined,
  port: Number(connectionOptions.port) || undefined,
  username: connectionOptions.user ?? undefined,
  password: connectionOptions.password ?? undefined,
  database: connectionOptions.database ?? undefined,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cli: {
    migrationsDir: 'migrations',
  },
}

export default new DataSource(config)
