import React from 'react'
import { View, Text } from '@react-pdf/renderer'

import styles from './SyllabusStyles'
import i18n from '../../i18n'
import { getSelectedSyllabus } from './syllabusFilter'

const footerText = (languageIndex, syllabus, semester) => {
  const { courseCode } = syllabus.course
  const selectedSyllabus = getSelectedSyllabus(syllabus, semester, languageIndex)
  const translation = i18n.messages[languageIndex].course_pdf_footer_string
  return (
    translation.for_code +
    courseCode +
    translation.valid_from +
    translation.semester[Number(selectedSyllabus.semesterNumber)] +
    selectedSyllabus.year +
    translation.edition +
    selectedSyllabus.edition
  )
}

const SyllabusPageFooter = ({ syllabus, semester, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  return (
    <View style={styles.pageFooter}>
      <Text>{footerText(languageIndex, syllabus, semester)}</Text>
      <Text render={({ pageNumber, totalPages }) =>
          languageIndex ? `Sida ${pageNumber} av ${totalPages}` : `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  )
}

export default SyllabusPageFooter
