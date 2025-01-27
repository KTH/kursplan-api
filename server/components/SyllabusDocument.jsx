import React from 'react'
import { Document } from '@react-pdf/renderer'

import SyllabusPages from './SyllabusPages'
import { timer } from '../libs/pdfUtils'

const SyllabusDocument = ({ syllabus, semester, language }) => {
  const { course } = syllabus
  const title = `${course.kod}-${semester}`
  return (
    <Document
      title={title}
      author="KTH"
      onRender={timer('SyllabusDocument', Date.now())}
      lang={language === 'en' ? 'en-US' : 'sv-SE'}
    >
      <SyllabusPages syllabus={syllabus} language={language} />
    </Document>
  )
}

export default SyllabusDocument
