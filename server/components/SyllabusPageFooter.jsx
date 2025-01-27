import React from 'react'
import { View, Text } from '@react-pdf/renderer'

import styles from './SyllabusStyles'
import i18n from '../../i18n'

const footerText = (languageIndex, syllabus) => {
  const { kod } = syllabus.course
  const translation = i18n.messages[languageIndex].course_pdf_footer_string
  return (
    translation.for_code +
    kod +
    translation.valid_from +
    syllabus.kursplan.giltigfrom +
    translation.edition +
    syllabus.kursplan.versionsnummer
  )
}

const SyllabusPageFooter = ({ syllabus, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  return (
    <View style={styles.pageFooter}>
      <Text>{footerText(languageIndex, syllabus)}</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          languageIndex ? `Sida ${pageNumber} av ${totalPages}` : `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  )
}

export default SyllabusPageFooter
