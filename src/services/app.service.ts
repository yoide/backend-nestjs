import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NestJs!';
  }

  infoRadar(): string {
    return 'Coordenadas para disparo'
  }
}
