/**
 * 配置该文件可以参考:
 * https://cli.vuejs.org/zh/config/#%E7%9B%AE%E6%A0%87%E6%B5%8F%E8%A7%88%E5%99%A8
 *
 */

//const url = 'http://cloud-gateway:9999'//开发环境
//const url = 'http://192.168.1.5:9999'
//引入path

function resolve (dir) {
  return path.join(__dirname, dir)
}

const path = require('path') //路径引入成功
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
let publicPath = './'
module.exports = {
  publicPath: publicPath,
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  //导出excel 配置的东西。
  // resolve:{
  //   alias:{
  //     'excel': path.resolve(__dirname, '../src/excel'),//导入失败。
  //   }
  // },
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      // 'axios': 'axios'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: "zuihou-ui",
    resolve: {
      alias: {
        '@': resolve('src'),
        '@static':resolve('src/assets')
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
    //   '/auth': {
    //     target: url,
    //     ws: true,
    //     pathRewrite: {
    //       '^/auth': '/auth'
    //     }
    //   },
    }
  },
   //px转rem的配置（postcss-plugin-px2rem插件）
   lintOnSave: true,
   css: {
       loaderOptions: {
           postcss: {
               plugins: [
                   require('postcss-plugin-px2rem')({
                       // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                       // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                       //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                       // propBlackList: [], //黑名单
                       exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                       // selectorBlackList: [], //要忽略并保留为px的选择器
                       // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                       // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                       mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                       minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                   }),
               ]
           }
       }
   },
}
