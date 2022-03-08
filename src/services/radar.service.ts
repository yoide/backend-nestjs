import { Injectable } from '@nestjs/common';
import * as lineReader from 'line-reader';
import {
    EnemyTypeEnum,
    IEnvironmentInformationInterface,
    IScan,
} from '../Interfaces/environment-information.interface';

@Injectable()
export class RadarService {
    /**
     *
     * @param options Cuerpo de envío con información del entorno.
     * Fórmula de distancia entre dos puntos(Pitágoras): (((x2-x1)^²) + ((y2-y1)^²))²
     */
    async infoRadar(options: any): Promise<any> {
        //console.log(options);
        try {
            return new Promise(async (resolve, reject) => {
                let coordinates = null;
                await lineReader.eachLine('/Externo/Work/Test Backend NodeJs NestJs/backend-test-nestjs/docs/test_cases.txt', (line: string) => {
                    const lineValues = line.split('|');
                    const jsonValue: IEnvironmentInformationInterface = JSON.parse(lineValues[0]);
                    const { protocols } = jsonValue;
                    const lengthProtocols = protocols.length;
                    let i = 0;
                    // Declaro 3 variables fijas de protocolos que es máximo número de protocolos que tendrá un petición.
                    let protocolOne = '';
                    let protocolTwo = '';
                    let protocolThree = '';
                    let finalCoordinate = '';
                    let scanSelected: IScan;
                    if(lengthProtocols > 0) {
                        while (i < lengthProtocols) {
                            switch (protocols[i]) {
                                case 'closest-enemies':
                                    if (i === 0)
                                        protocolOne = 'closest-enemies';
                                    else if (i === 1)
                                        protocolTwo = 'closest-enemies';
                                    else if (i === 2)
                                        protocolThree = 'closest-enemies';

                                    let closetDistance = 0;
                                    jsonValue.scan.forEach(item => {
                                        const distance = Math.sqrt(Math.pow(item.coordinates.x, 2) + Math.pow(item.coordinates.y, 2));

                                        if (distance < 100 && distance < closetDistance) {
                                            if (i === 0) {
                                                scanSelected = item;
                                                closetDistance = distance;
                                            } else if (i === 1) {
                                                if (protocolOne === 'assist-allies' && item.allies) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'avoid-crossfire' && !item.allies) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'prioritize-mech' && item.enemies.type === EnemyTypeEnum.MECH.toLowerCase()) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'avoid-mech' && item.enemies.type != EnemyTypeEnum.MECH.toLowerCase()) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                }
                                            } else {
                                                if (protocolOne === 'assist-allies' && item.allies && protocolTwo === 'prioritize-mech' && item.enemies.type === EnemyTypeEnum.MECH.toLowerCase()) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'assist-allies' && item.allies && protocolTwo === 'avoid-mech' && item.enemies.type != EnemyTypeEnum.MECH.toLowerCase()) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'avoid-crossfire' && !item.allies && protocolTwo === 'prioritize-mech' && item.enemies.type === EnemyTypeEnum.MECH.toLowerCase()) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'avoid-crossfire' && !item.allies && protocolTwo === 'avoid-mech' && item.enemies.type != EnemyTypeEnum.MECH.toLowerCase()) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'prioritize-mech' && item.enemies.type === EnemyTypeEnum.MECH.toLowerCase() && protocolTwo === 'assist-allies' && item.allies) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'prioritize-mech' && item.enemies.type === EnemyTypeEnum.MECH.toLowerCase() && protocolTwo === 'avoid-crossfire' && !item.allies) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'avoid-mech' && item.enemies.type != EnemyTypeEnum.MECH.toLowerCase() && protocolTwo === 'assist-allies' && item.allies) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                } else if (protocolOne === 'avoid-mech' && item.enemies.type != EnemyTypeEnum.MECH.toLowerCase() && protocolTwo === 'avoid-crossfire' && !item.allies) {
                                                    scanSelected = item;
                                                    closetDistance = distance;
                                                }
                                            }
                                        }
                                    });

                                case 'furthest-enemies':
                                    if (i === 0)
                                        protocolOne = 'furthest-enemies';
                                    else if (i === 1)
                                        protocolTwo = 'furthest-enemies';
                                    else if (i === 2)
                                        protocolThree = 'furthest-enemies';

                                case 'assist-allies':

                                case 'avoid-crossfire':

                                case 'prioritize-mech':

                                case 'avoid-mech':

                                default:

                            }

                            i++;
                        }


                        /*       if (jsonValue.protocols?.toString() === options.protocols?.toString()) {
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
                               }*/
                        // console.log(line);
                    }
                });

            }).catch(e => console.log(e));
        } catch (error) {
            return Promise.reject(error);
        }

        // return `Coordenadas para disparo : ${res}`
        // return res;
    }

    /*
    * Hacer función por cada
    * */

}

