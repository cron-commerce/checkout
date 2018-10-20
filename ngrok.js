const ngrok = require('ngrok')

ngrok.connect({
  addr: process.env.PORT,
  subdomain: 'cron-checkout',
}).then(url => {
  console.log(`Available at ${url}`)
})