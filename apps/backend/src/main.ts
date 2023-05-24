import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app/app.module'

NestFactory.create(AppModule).then((app) => app.listen(3000))
