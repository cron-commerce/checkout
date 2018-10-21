const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript(withSass({
  publicRuntimeConfig: {
    CORE_GRAPHQL_URL: process.env.CORE_GRAPHQL_URL,
  }
}))