#!/usr/bin/env node

// this file is used when package is installed through npm
// and used as binary script

process.env.NODE_ENV = 'production'

require('./index')
