const path = require('path')

const isPath = (value) => value !== path.basename(value)

module.exports = isPath
