module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', { modules: false }]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
  /*
  plugins: [
    'component',
    {
      libraryName: 'mint-ui',
      style: true
    }
  ]
  * */
}
