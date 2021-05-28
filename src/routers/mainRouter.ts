import asyncComponent from './AsyncComponent'
export const NotFind = asyncComponent(() => import(/* webpackChunkName: "NotFind" */'pages/NotFind/NotFind'))
