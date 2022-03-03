import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';
import * as lineReader from 'line-reader';

@Injectable()
export class RadarService {
    // {protocols: string[], scan: {coordinates: }[]}
    infoRadar(): string {
        // const res = JSON.parse(fs.readFileSync(`/NestJs/backend-nestjs/docs/test_cases.txt`, 'utf8'));
        try {
            let coordinates = null;
            lineReader.eachLine('/NestJs/backend-nestjs/docs/test_cases.txt', (line: string) => {
                const lineValues = line.split('|');
                const jsonValue = JSON.parse(lineValues[0]);
                if (jsonValue.protocols?.toString() === 'avoid-mech') {
                    console.log(JSON.parse(lineValues[1]));
                    coordinates = lineValues[1];
                }
                // console.log(line);
            });
            return coordinates ?? 'No se encontrado el objetivo'
        } catch (error) {
            return 'Error'
        }

        // return `Coordenadas para disparo : ${res}`
        // return res;
    }

}
