'use strict'

const i18n = require('../i18n')

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokSyllabus(courseCode, semester, lang) {
  try {
    const course = await client.getCourseSyllabus(courseCode, semester, lang)

    return course
  } catch (error) {
    const languageIndex = lang === 'en' ? 0 : 1
    const status = error.response?.status || 500
    const message = i18n.messages[languageIndex].syllabusErrorMessages.syllabus_fetching_error({ code: courseCode, time_stamp: new Date().toISOString() })
    throw new Error(`Status code ${status}: ${message}`)
  }
}

module.exports = {
  getLadokSyllabus,
}
