import { Controller, HttpCode, Post, Req } from '@nestjs/common';
import { RadarService } from 'src/services/radar.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('radar')
export class RadarController {
    constructor(private readonly _radarService: RadarService) { }

    @ApiOperation({ summary: 'Obtener coordenadas de enemigo' })
    @ApiResponse({ status: 201, description: 'Información coordenadas del próxmio objetivo a atacar.' })
    @Post()
    @HttpCode(201)
    infoRadar(@Req() request: Request): any {
        return this._radarService.infoRadar(request.body);
    }

}
