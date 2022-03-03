import { Controller, Post } from '@nestjs/common';
import { RadarService } from 'src/services/radar.service';

@Controller('radar')
export class RadarController {
    constructor(private readonly _radarService: RadarService) { }

    @Post()
    infoRadar(): string {
        return this._radarService.infoRadar();
    }

}
