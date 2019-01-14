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
  https: false,//config.kopps.https, TODO!!!
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
    //console.log("syllabus",syllabus)
    const syllabusHTML = generateHTML(syllabus, semester, language)

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
        "height": "27mm",
        "contents": {
          default: `<div class="row " style="max-width:520px;">
          <div class="pdfFooterText col-12" style="text-align: left;"> ${syllabusHTML.footerText}. 
              <span class="" style="text-align:right; float:right"> ${language === 'en' ? "Page" : "Sida"} {{page}} ${language === 'en' ? "of  " : "av  " } {{pages}}</span></div> 
            </div> `
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
