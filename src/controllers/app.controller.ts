import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) { }

  @Get()
  getHello(): string {
    return this._appService.getHello();
  }
}
