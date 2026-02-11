'use strict'

const i18n = require('../i18n')

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokSyllabus(courseCode, semester, lang) {
  try {
    return client.getCourseSyllabus(courseCode, semester, lang)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getLadokSyllabus,
}
