// @ts-ignore
const ctx = require.context('./en_US', false, /\.ts/)

export default ctx.keys().reduce((total: any, path: string) => {
  const requireContext = ctx(path).default
  return { ...total, ...requireContext }
}, {})
