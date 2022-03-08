export interface IEnvironmentInformationInterface {
  protocols: string[],
  scan: IScan[]
}

export interface IScan {
  coordinates: {
    x: number,
    y: number
  },
  enemies:{
    type: EnemyTypeEnum,
    number: number
  },
  allies?: number
}

export enum EnemyTypeEnum {
  SOLIDER = 'SOLIDER',
  MECH = 'MECH',
}