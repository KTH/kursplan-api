'use strict'

/**
 * Syllabus controller is getting syllabus information using kopps api and creates
 * html and configurations for pdf
 */

const Sample = require('../models').sample.Sample
const co = require('co')
const { safeGet } = require('safe-utils')
const generateHTML = require('../libs/generareHTML')

module.exports = {
  getSyllabus: co.wrap(getSyllabus)
}


const config = require('../configuration').server
const BasicAPI = require('kth-node-api-call').BasicAPI

let koppsApiInternal = new BasicAPI({
  hostname: config.kopps.host,
  basePath: '/api/kopps/internal/',
  https: false,//config.kopps.https,
  json: true,
  // Kopps is a public API and needs no API-key
  defaultTimeout: config.kopps.defaultTimeout
})


function * getSyllabus (req, res, next) {

  const courseCode = req.params.courseCode
  const semester = req.params.semester
  const language = req.params.language.length === 2 ? req.params.language : "sv"
  
  try {
    let syllabus = {}
    const syllabuskoppsAPI_course_tot = yield koppsApiInternal.getAsync(`syllabuses/${courseCode}/${semester}?lang=${language}`)
    syllabus = syllabuskoppsAPI_course_tot.body
   
    const syllabusHTML = generateHTML(syllabus, semester, language)
    console.log("syllabus",syllabusHTML)
    const pdfConfig = {
      "format": "A4",        
      "orientation": "portrait", 
      "border": "0",           
      paginationOffset: 1,       // Override the initial pagination number
      "header": {
        "height": "15mm",
        "contents": ""
      },
      "footer": {
        "height": "18mm",
        "contents": {
          default: `<div class="pdfFooterText" style="text-align: left;"> ${syllabusHTML.footerText}. <div style="text-align: right;">Sida {{page}} av {{pages}}</div></div> `,
        }
      },
      "zoomFactor": "1",
      "base": "https://www.kth.se", 
      "type": "pdf",
      "phantomPath": "/usr/bin/phantomjs",
      "timeout": 30000
    }

    res.send({ syllabusHTML, pdfConfig})

  } catch (err) {
    next(err)
  }
}
