import { Controller, Get } from '@nestjs/common';
import { ObjectId } from 'bson';
import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/object-id')
  generateObjectId(): ObjectId {
    return new ObjectId();
  }
}
