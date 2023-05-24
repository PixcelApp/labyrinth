import { Snowflake } from '@sapphire/snowflake'

const sf = new Snowflake(new Date('1998-11-27T00:00:00.000Z'))

export const snowflake = () => sf.generate().toString()
