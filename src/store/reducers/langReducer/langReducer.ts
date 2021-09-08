import { IAction } from "typings/store"

const defaultState: {[key:string]: string} = {}

export default (state = defaultState, { type, payload }: IAction) => {
  if (type === 'zh_CN') {
    localStorage.setItem('currentLocale', type)
    const newState = payload
    return newState
  }
  if (type === 'en_US') {
    localStorage.setItem('currentLocale', type)
    const newState = payload
    return newState
  }
  return state
}
