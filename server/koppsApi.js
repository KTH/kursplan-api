'use strict'

const log = require('kth-node-log')
const config = require('./configuration').server
const redis = require('kth-node-redis')
const connections = require('kth-node-api-call').Connections

const koppsOpts = {
  log,
  https: true,
  redis,
  cache: config.cache,
  timeout: 5000,
  defaultTimeout: config.koppsApi.defaultTimeout,
  retryOnESOCKETTIMEDOUT: true,
  useApiKey: false // skip key
}

config.koppsApi.doNotCallPathsEndpoint = true // skip checking _paths, because Kopps doesnt have it
config.koppsApi.connected = true

const koppsConfig = {
  koppsApi: config.koppsApi
}

const api = connections.setup(koppsConfig, koppsConfig, koppsOpts)

async function getSyllabus(courseCode, semester, language) {
  const koppsApiInternal = api.koppsApi.client
  const koppsResponse = await koppsApiInternal.getAsync(
    `${config.koppsApi.basePath}syllabuses/${courseCode}/${semester}?l=${language}`
  )
  return koppsResponse.body
}

module.exports = {
  koppsApi: api,
  getSyllabus
}
