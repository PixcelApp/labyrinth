import { Snowflake } from '@sapphire/snowflake'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AllModels } from 'src/models'

const sf = new Snowflake(new Date('1998-11-27T00:00:00.000Z'))

export const snowflake = () => sf.generate().toString()

export const UseModelsFeature = TypeOrmModule.forFeature(AllModels)
