module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名
        // '@': 'src',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network'
      }
    }
  },
  // devServer:{
  //   proxy:{
  //     '/':{
  //       target:process.env.VUE_APP_BASE_API,
  //       ws:false,
  //       changeOrigin:true,
  //       pathRewrite:{
  //         '^':'/'
  //       }
  //     }
  //   }
  // },

}
