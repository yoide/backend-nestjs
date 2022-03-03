import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { RadarController } from './controllers/radar.controller';
import { AppService } from './services/app.service';
import { RadarService } from './services/radar.service';

@Module({
  imports: [],
  controllers: [AppController, RadarController],
  providers: [AppService, RadarService],
})
export class AppModule { }
