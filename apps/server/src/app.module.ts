import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';
import TodoModule from './todo/todo.module';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [TodoModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
