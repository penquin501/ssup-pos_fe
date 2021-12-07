module.exports = {
  transpileDependencies: [
    'vuetify'
  ],devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    // https: true,
    port: process.env.PORT,
  }
}
