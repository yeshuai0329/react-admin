export interface IRouter {
  Ppath: string | '',
  auth: boolean,
  icon: string,
  menuDefaultName: string,
  menuId: number,
  menuNameId: string,
  menuPId: number | '',
  menuType: number,
  path: string | '',
  [propName: string]: any
}