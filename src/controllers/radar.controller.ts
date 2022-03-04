import { Controller, HttpCode, Post, Req } from '@nestjs/common';
import { RadarService } from 'src/services/radar.service';
import { Request } from 'express';

@Controller('radar')
export class RadarController {
    constructor(private readonly _radarService: RadarService) { }

    @Post()
    @HttpCode(201)
    infoRadar(@Req() request: Request): any {
        return this._radarService.infoRadar(request.body);
    }

}
