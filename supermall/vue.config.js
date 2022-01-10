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
  }
}
