import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, JoinColumn, OneToOne } from 'typeorm'
import { Snowflake } from 'src/models/tools'
import { UserModel } from 'src/models/User.model'

@ObjectType('Auth')
@Entity('auth')
export class AuthModel {
  @Snowflake()
  userId: string

  @Field(() => UserModel)
  @OneToOne(() => UserModel, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: UserModel

  @Field(() => String)
  password: string
}
