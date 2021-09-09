// @ts-ignore
const ctx = require.context('./zh_CN', false, /\.ts/)

export default ctx.keys().reduce((total: any, path: string) => {
  const requireContext = ctx(path).default
  return { ...total, ...requireContext }
}, {})
