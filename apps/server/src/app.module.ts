import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SeedModule } from './seed/seed.module';
import TodoModule from './todo/todo.module';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    TodoModule,
    SeedModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
