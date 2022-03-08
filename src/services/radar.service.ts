import { Injectable } from '@nestjs/common';
import * as lineReader from 'line-reader';
import { EnemyTypeEnum, IEnvironmentInformationInterface } from '../Interfaces/environment-information.interface';

@Injectable()
export class RadarService {
    // {protocols: string[], scan: {coordinates: }[]}
    /**
     *
     * @param options Cuerpo de envío con información del entorno.
     * Fórmula de distancia entre dos puntos(Pitágoras): (((x2-x1)^²) + ((y2-y1)^²))²
     */
    async infoRadar(options: any): Promise<any> {
        console.log(options);
        try {
            return new Promise(async (resolve, reject) => {
                let coordinates = null;
                await lineReader.eachLine('/NestJs/backend-nestjs/docs/test_cases.txt', (line: string) => {
                    const lineValues = line.split('|');
                    const jsonValue: IEnvironmentInformationInterface = JSON.parse(lineValues[0]);
                    if (jsonValue.protocols?.toString() === options.protocols?.toString()) {
                        let distance = 0;
                          jsonValue.scan?.forEach(item => {
                               if (item.enemies.type !== EnemyTypeEnum.MECH.toLowerCase()){
                                   distance = Math.sqrt(Math.pow(item.coordinates.x, 2) + Math.pow(item.coordinates.y, 2));
                               }
                        })
                        console.log(JSON.parse(lineValues[1]));
                        coordinates = lineValues[1];
                        resolve(distance);
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
