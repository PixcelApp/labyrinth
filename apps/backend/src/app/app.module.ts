import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/modules/user.module'
import { pgDataSource } from 'src/db'

@Module({
  imports: [
    // config
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
      definitions: {
        path: join(process.cwd(), 'generated/graphql.ts'),
        outputAs: 'class',
      },
    }),
    TypeOrmModule.forRoot(pgDataSource.options),
    // modules
    UserModule,
  ],
})
export class AppModule {}
