'use strict'

/**
 * Sample API controller. Can safely be removed.
 */

const Sample = require('../models').sample.Sample
const co = require('co')
const { safeGet } = require('safe-utils')
const PDFDocument = require('pdfkit')



module.exports = {
  getData: co.wrap(getData),
  postData: co.wrap(postData),
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



function * getData (req, res, next) {
  try {
    let doc = {}
    if (process.env.NODE_MOCK) {
      doc = yield { _id: 0, name: 'mockdata' }
    } else {
      doc = yield Sample.findById(req.params.id)
    }

    if (!doc) {
      return next()
    }

    res.json({ id: doc._id, name: doc.name })
  } catch (err) {
    next(err)
  }
}

function * getSyllabus (req, res, next) {

  const courseCode = req.params.courseCode
  const semester = req.params.semester

  res.writeHead( 200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=Kursplan.pdf'
    } )
  var doc = new PDFDocument()
  doc.info.Title="Kursplan_"
  doc.pipe(res)  
  doc.circle(280, 200, 50).fill("#6600FF")
  var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.'
  doc.text(lorem,{
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 2,
    height: 300,
    ellipsis: true,
    color: '#0000FF'
  })
  doc.text(lorem)
  doc.text(lorem)
  doc.text(lorem)
  doc.text(lorem)
  doc.addPage().fillColor('blue')
  .text('Here is a link!').underline(100, 100, 160, 27, {
    color: '#0000FF'
  }).link(100, 100, 160, 27, 'http://google.com/')
  doc.end()

  console.log("!!!",res)
  try {
    let syllabus = {}
    //const syllabuskoppsAPI_course_tot = yield koppsApiInternal.getAsync(`courses/${courseCode}`)
    //syllabus = syllabuskoppsAPI_course_tot.body
    //console.log("syllabus",syllabus);
    
    //res.json({ courseCode: courseCode, courseTitle: semester})
  } catch (err) {
    next(err)
  }
}

function * postData (req, res, next) {
  try {
    let doc = yield Sample.findById(req.params.id)

    if (!doc) {
      doc = new Sample({
        _id: req.params.id,
        name: req.body.name
      })
    } else {
      doc.name = req.body.name
    }

    yield doc.save()
    res.json({ id: doc._id, name: doc.name })
  } catch (err) {
    next(err)
  }
}
