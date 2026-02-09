'use strict'

const log = require('@kth/log')

const i18n = require('../../i18n')
const { getLadokSyllabus } = require('../ladokApi')
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
    const syllabus = await getLadokSyllabus(courseCode, semester, language)

    if (!syllabus) {
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
    const languageIndex = language === 'en' ? 0 : 1
    const status = err.response?.status || 500
    const message = i18n.messages[languageIndex].syllabusErrorMessages.syllabus_fetching_error({ code: courseCode, semester, time_stamp: new Date().toISOString() })
    const error = new Error(`${status}: ${message}`)
    next(error)
  }
}

module.exports = {
  getSyllabus: _getSyllabus,
}
