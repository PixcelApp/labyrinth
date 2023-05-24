import { connectionOptions, pgDataSource } from 'src/db'
;(async () => {
  await pgDataSource.initialize()

  await pgDataSource.query(
    `CREATE DATABASE IF NOT EXISTS "${connectionOptions.database}";`,
  )

  await pgDataSource.synchronize()
})()
