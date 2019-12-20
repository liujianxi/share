module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  
    outputDir: 'dist',
  
    assetsDir: 'static',
  
    filenameHashing: true,
  
    // When building in multi-pages mode, the webpack config will contain different plugins
    // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
    // Make sure to run vue inspect if you are trying to modify the options for those plugins.
  
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
  
    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,
  
    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],
  
    // 生产环境 sourceMap
    productionSourceMap: false,
  
    // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
    // corsUseCredentials: false,
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: (config) => {
    },
  
    // webpack 链接 API，用于生成和修改 webapck 配置
    // https://github.com/mozilla-neutrino/webpack-chain
    chainWebpack: (config) => {
      // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
      config.optimization
        .splitChunks({
          cacheGroups: {}
        });
  
      // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
      config.module
        .rule('eslint')
        .exclude
        .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
        .end()
    },
  
    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
      // 是否开启支持 foo.module.css 样式
      requireModuleExtension: true,
  
      // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
      extract: true,
  
      // 是否构建样式地图，false 将提高构建速度
      sourceMap: false,
  
      // css预设器配置项
      loaderOptions: {
        // 给 sass-loader 传递选项
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.sass` 这个文件
          // 注意：在 sass-loader v7 中，这个选项名是 "data"
          prependData: `@import "~@/variables.sass"`
        },
        // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
        // 因为 `scss` 语法在内部也是由 sass-loader 处理的
        // 但是在配置 `data` 选项的时候
        // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
        // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
        scss: {
        //   prependData: `@import "~@/variables.scss";`
        },
        // 给 less-loader 传递 Less.js 相关选项
        less:{
          // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
          // `primary` is global variables fields name
          globalVars: {
            primary: '#fff'
          }
        }
      }
    },
  
    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      open: true,
  
      host: '127.0.0.1',
  
      port: 3000,
  
      https: false,
  
      hotOnly: false,
  
      proxy: null,
  
      before: app => {
      }
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
  
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
  
    // 第三方插件配置
    pluginOptions: {}
  };