'use strict'

/**
 * Syllabus controller is getting syllabus information using kopps api and creates
 * html and configurations for pdf
 */

const co = require('co')
const generateHTML = require('../libs/generareHTML')
const redis = require('kth-node-redis')
const log = require('kth-node-log')

module.exports = {
  getSyllabus: co.wrap(getSyllabus)
}

const config = require('../configuration').server
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
config.koppsApi.doNotCallPathsEndpoint = true // skip checking _paths, because kopps doesnt have it
config.koppsApi.connected = true

const koppsConfig = {
  koppsApi: config.koppsApi
}
const api = connections.setup(koppsConfig, koppsConfig, koppsOpts)

async function getSyllabus (req, res, next) {
  const courseCode = req.params.courseCode
  const semester = req.params.semester
  const language = req.params.language.length === 2 ? req.params.language : 'sv'
  const koppsApiInternal = api.koppsApi.client
  try {
    let syllabus = {}
    const syllabuskoppsAPI_course_tot = await koppsApiInternal.getAsync(`${config.koppsApi.basePath}syllabuses/${courseCode}/${semester}?l=${language}`)
    syllabus = syllabuskoppsAPI_course_tot.body
    // console.log("syllabus",syllabus)
    const syllabusHTML = generateHTML(syllabus, semester, language)

    const pdfConfig = {
      'format': 'A4',
      'orientation': 'portrait',
      'border': '0',
      paginationOffset: 1, // Override the initial pagination number
      'header': {
        'height': '15mm',
        'contents': '<span style="color:white;display:none;"></span>'
      },
      'footer': {
        'height': '27mm',
        'contents': {
          default: `<div class="row " style="max-width:520px;">
          <div class="pdfFooterText col-12" style="text-align: left;"> ${syllabusHTML.footerText}. 
              <span class="" style="text-align:right; float:right"> ${language === 'en' ? 'Page' : 'Sida'} {{page}} ${language === 'en' ? 'of  ' : 'av  '} {{pages}}</span></div> 
            </div> `
        }
      },
      'zoomFactor': '1',
      'base': 'https://www.kth.se',
      'type': 'pdf',
      'phantomPath': '/usr/bin/phantomjs',
      title: `${syllabusHTML.footerText}`,
      locale: language,
      lang: language,
      'timeout': 30000
    }

    res.setHeader('Content-Type', 'text/html')
    res.send({ syllabusHTML, pdfConfig })
  } catch (err) {
    next(err)
  }
}
