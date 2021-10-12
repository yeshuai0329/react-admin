const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // '@primary-color': '#1DA57A',
              '@border-radius-base': '4px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
