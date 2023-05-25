import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/modules/user/user.module'
import { pgDataSource } from 'src/db'
import { EntityModule } from 'src/modules/entity/entity.module'
import { ProjectModule } from 'src/modules/project/project.module'
import { OrganizationModule } from 'src/modules/organization/organization.module'
import { AppController } from 'src/app/app.controller'
import { AuthenticationModule } from '@twirelab/nestjs-auth0'
import { getConfigValue } from 'src/config'
import { AppService } from 'src/app/app.service'

@Module({
  controllers: [AppController],
  imports: [
    // config
    AuthenticationModule.forRoot({
      domain: getConfigValue<string>('BE_AUTH0_DOMAIN'),
      clientId: getConfigValue<string>('BE_AUTH0_CLIENT_ID'),
      clientSecret: getConfigValue<string>('BE_AUTH0_CLIENT_SECRET'),
    }),
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
    ProjectModule,
    OrganizationModule,
    EntityModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
