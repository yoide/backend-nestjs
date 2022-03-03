import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class RadarService {

    infoRadar(): string {
        const res = fs.readFileSync(`/NestJs/backend-nestjs/docs/test_cases.txt`, 'utf8');
        return `Coordenadas para disparo : ${res}`
    }

}
