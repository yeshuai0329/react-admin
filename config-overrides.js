// 这个配置是less-loader @5.0.0版本的配置
const {
  override,
  addLessLoader,
  fixBabelImports,
  removeModuleScopePlugin
} = require('customize-cra')

module.exports = override(
  // webpack扩展支持less
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
    sourceMap: true
  }),
  // webpack扩展支持antd组件库按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css' // 自动打包相关的样式 默认为 style:'css'
  }),
  removeModuleScopePlugin()

)
