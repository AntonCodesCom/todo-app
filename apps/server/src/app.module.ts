import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import TodoModule from './todo/todo.module';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [TodoModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
