'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const { server: serverConfig } = require('./configuration')

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokSyllabus(courseCode, semester, lang) {
  try {
    const course = await client.getCourseSyllabus(courseCode, semester, lang)

    return course
  } catch (error) {
    throw new Error(error.message)
  }
}

async function getLadokSyllabuses(courseCode, semester, lang) {
  try {
    const course = await client.getCourseSyllabuses(courseCode, semester, lang)

    return course
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getLadokSyllabus,
  getLadokSyllabuses,
}
