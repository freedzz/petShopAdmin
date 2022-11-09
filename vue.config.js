const path = require('path')
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  providePlugin,
  build7z
  // donation
} = require('./src/config')
// const { webpackBarName, webpackBanner, donationConsole } = require('zx-layouts')
// if (donation) donationConsole()
const {
  version,
  author
} = require('./package.json')
const Webpack = require('webpack')
// 设置启动是控制台样式
const WebpackBar = require('webpackbar')
// 设置打包路径
const FileManagerPlugin = require('filemanager-webpack-plugin')
// 压缩图片 image-webpack-loader
const dayjs = require('dayjs')
const date = dayjs().format('YYYY_M_D')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = title || 'vue-basic-template'
process.env.VUE_APP_AUTHOR = author || 'xiaohan'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

const resolve = (dir) => path.join(__dirname, dir)
const mockServer = () => {
  if (process.env.NODE_ENV === 'development') return require('./mock')
  return ''
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    },
    after: mockServer()
  },
  configureWebpack () {
    return {
      // 设置全局@
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      // 设置进度条
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({
          name: 'vue-basic-tempalte'
        })
      ],
      module: {
        rules: [
          {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src'), resolve('test')],
            options: {
              formatter: require('eslint-friendly-formatter'),
              emitWarning: false
            }
          }
        ]
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 加载svg图标
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/remixIcon'))
    //   .add(resolve('src/colorfulIcon'))
    //   .end()

    // config.module
    //   .rule('remixIcon')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/remixIcon'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'remix-icon-[name]'
    //   })
    //   .end()

    // config.module
    //   .rule('colorfulIcon')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/colorfulIcon'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'colorful-icon-[name]'
    //   })
    //   .end()
    const svgRule = config.module.rule('svg')
    // 清除已有的所有loader
    // 如果你不这样做，接下来的loader会附加在该规则现有的loader之后
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/assets/icons/svg'))
      .end()
      .use('file-loader')
      .loader('file-loader')

    /*  config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("source-map");
    }); */
    // 设置打包
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.performance.set('hints', false)
      config.devtool('none')
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          fortawesome: {
            name: 'chunk-fortawesome',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?@fortawesome(.*)/
          }
        }
      })
      config
        .plugin('banner')
        .use(Webpack.BannerPlugin, [`xh${time}`])
        .end()
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()
    })

    if (build7z) {
      config.when(process.env.NODE_ENV === 'production', (config) => {
        config
          .plugin('fileManager')
          .use(FileManagerPlugin, [{
            onEnd: {
              delete: [`./${outputDir}/video`, `./${outputDir}/data`],
              archive: [{
                source: `./${outputDir}`,
                destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`
              }]
            }
          }])
          .end()
      })
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /* sass-loader 8.0语法 */
        // prependData: '@import "~@/styles/variables.scss";',

        /* sass-loader 9.0写法，感谢github用户 shaonialife */
        additionalData (content, loaderContext) {
          const {
            resourcePath,
            rootContext
          } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/assets/style/variables.scss'
          ) {
            return '@import "~@/assets/style/variables.scss";' + content
          }
          return content
        }
      }
    }
  }
}
