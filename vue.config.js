module.exports = {
  devServer: {
    port: process.env.SERVER_PORT
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat')

    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .delete('svg')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
  }
}
