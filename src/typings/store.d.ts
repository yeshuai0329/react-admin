import { TConfig } from 'typings/config'

export interface RootState {
  config: TConfig,
  lang: {[key:string]: string}
}

export interface IAction {
  type: string;
  payload?: any;
}
