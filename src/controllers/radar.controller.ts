import { Controller, Post } from '@nestjs/common';
import { RadarService } from 'src/services/radar.service';

@Controller('radar')
export class RadarController {
    constructor(private readonly _radarService: RadarService) { }

    @Post()
    infoRadar(): any {
        return this._radarService.infoRadar();
    }

}
