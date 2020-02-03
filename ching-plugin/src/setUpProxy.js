const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/itemDetails?itemId=",{
      target: "https://us-central1-daipos.cloudfunctions.net",
      changeOrigin: true
    })
  )
}
