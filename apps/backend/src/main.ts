import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app/app.module'
import { getConfigValue } from 'src/config'

NestFactory.create(AppModule).then((app) =>
  app.listen(getConfigValue<string>('API_PORT')),
)
