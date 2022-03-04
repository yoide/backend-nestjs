import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';
import * as lineReader from 'line-reader';

@Injectable()
export class RadarService {
    // {protocols: string[], scan: {coordinates: }[]}
    async infoRadar(options: any): Promise<string> {
        console.log(options);

        // const res = JSON.parse(fs.readFileSync(`/NestJs/backend-nestjs/docs/test_cases.txt`, 'utf8'));
        try {
            return new Promise(async (resolve, reject) => {
                let coordinates = null;
                await lineReader.eachLine('/NestJs/backend-nestjs/docs/test_cases.txt', (line: string) => {
                    const lineValues = line.split('|');
                    const jsonValue = JSON.parse(lineValues[0]);
                    if (jsonValue.protocols?.toString() === options.protocols?.toString()) {
                        console.log(JSON.parse(lineValues[1]));
                        coordinates = lineValues[1];
                        resolve(coordinates);
                        return false;
                    }
                    // console.log(line);
                });

            })
        } catch (error) {
            return Promise.reject(error);
        }

        // return `Coordenadas para disparo : ${res}`
        // return res;
    }

}
