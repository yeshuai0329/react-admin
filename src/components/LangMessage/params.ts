import { ReactNode } from 'react'

export interface IObj {
  [key:string]: string
}

export interface IProps {
  children?:ReactNode;
  id: string;
  defaultText: string
  reduxLang?: IObj
}

export interface ILangMap {
  icon: string,
  nameId: string,
  defaultName: string,
  value: string
}
export const LangMap: ILangMap[] = [
  { icon: '🇨🇳', nameId: '', defaultName: '简体中文', value: 'zh_CN' },
  { icon: '🇬🇧', nameId: '', defaultName: 'English', value: 'en_US' }
]
