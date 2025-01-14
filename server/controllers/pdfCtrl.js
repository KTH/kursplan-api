'use strict'

const log = require('@kth/log')

const { getSyllabus } = require('../koppsApi')
const { getLadokSyllabus, getLadokSyllabuses } = require('../ladokApi')
const { createPdf } = require('../libs/pdfRenderer.js')

async function _getSyllabus(req, res, next) {
  const { courseCode, semester } = req.params
  const language = req.params.language.length === 2 ? req.params.language : 'sv'
  const { documentName, download } = req.query
  const fileName = documentName || `${courseCode}-${semester}`
  log.debug(
    'getSyllabus: Received request for PDF with courseCode: ',
    courseCode,
    ', semester: ',
    semester,
    ', language: ',
    language
  )
  try {
    const koppsSyllabus = await getSyllabus(courseCode, semester, language)
    if (koppsSyllabus) {
      log.debug('KOPPS SYLLABUS: ', koppsSyllabus)
    }
    const syllabuses = await getLadokSyllabuses(courseCode, semester, language)
    if (syllabuses) {
      log.debug('LADOK SYLLABUSES: ', syllabuses)
    }
    const syllabus = await getLadokSyllabus(courseCode, semester, language)
    if (syllabus) {
      log.debug('LADOK SYLLABUS: ', syllabus)
    }

    if (syllabus == null) {
      log.debug(`Could not get a syllabus for ${courseCode}, ${semester}, ${language}.`)
      res.sendStatus(404)
      return
    }

    const contentDisposition = download === 'true' ? 'attachment' : 'inline'
    res.type('application/pdf')
    res.set('Content-Disposition', `${contentDisposition}; filename=${fileName}.pdf`)
    const pdfStream = await createPdf(syllabus, semester, language)
    pdfStream.pipe(res)

    log.debug(
      'getSyllabus: Responded to request for PDF with courseCode: ',
      courseCode,
      ', semester: ',
      semester,
      ', language: ',
      language
    )
  } catch (err) {
    log.error('getSyllabus: Failed request for PDF, error:', { err })
    next(err)
  }
}

// async function _getSyllabus(req, res, next) {
//   const { courseCode, semester } = req.params
//   const language = req.params.language.length === 2 ? req.params.language : 'sv'
//   const { documentName, download } = req.query
//   const fileName = documentName || `${courseCode}-${semester}`
//   log.debug(
//     'getSyllabus: Received request for PDF with courseCode: ',
//     courseCode,
//     ', semester: ',
//     semester,
//     ', language: ',
//     language
//   )
//   try {
//     const syllabus = await getSyllabus(courseCode, semester, language)

//     if (syllabus == null) {
//       log.debug(`Could not get a syllabus for ${courseCode}, ${semester}, ${language}.`)
//       res.sendStatus(404)
//       return
//     }

//     const contentDisposition = download === 'true' ? 'attachment' : 'inline'
//     res.type('application/pdf')
//     res.set('Content-Disposition', `${contentDisposition}; filename=${fileName}.pdf`)
//     const pdfStream = await createPdf(syllabus, semester, language)
//     pdfStream.pipe(res)

//     log.debug(
//       'getSyllabus: Responded to request for PDF with courseCode: ',
//       courseCode,
//       ', semester: ',
//       semester,
//       ', language: ',
//       language
//     )
//   } catch (err) {
//     log.error('getSyllabus: Failed request for PDF, error:', { err })
//     next(err)
//   }
// }

module.exports = {
  getSyllabus: _getSyllabus,
}
