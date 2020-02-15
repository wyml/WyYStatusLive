module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: process.env.VUE_APP_TITLE,
    themeColor: '#388E3C',
    iconPaths: {
      favicon32: 'img/icons/favicon.ico',
      favicon16: 'img/icons/favicon.ico',
      appleTouchIcon: 'img/icons/192.png',
      maskIcon: 'img/icons/favicon.ico',
      msTileImage: 'img/icons/144.png'
    }
  }
}