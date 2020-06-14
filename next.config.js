const withWorkers = require('@zeit/next-workers')
const withSourceMaps = require('@zeit/next-source-maps')
module.exports = withSourceMaps(withWorkers({
  /* config options here */
}))
