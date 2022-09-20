import React from 'react'
import { Page, View } from '@react-pdf/renderer'

import SyllabusHead from './SyllabusHead'
import SyllabusKeyInformation from './SyllabusKeyInformation'
import SyllabusBody from './SyllabusBody'
import SyllabusPageFooter from './SyllabusPageFooter'
import styles from './SyllabusStyles'
import { getActiveSyllabus, getSelectedSyllabus } from './syllabusFilter'

/* A4 is default page size value, explicitly set for clarity */
const SyllabusPages = ({ syllabus, semester, language }) => {
  const selectedSyllabus = getSelectedSyllabus(syllabus, semester)
  const activeSyllabus = getActiveSyllabus(syllabus, selectedSyllabus)

  return (
    <Page size="A4" style={styles.pages}>
      <View style={styles.content}>
        <SyllabusHead syllabus={syllabus} activeSyllabus={activeSyllabus} language={language} />
        <SyllabusKeyInformation syllabus={syllabus} activeSyllabus={activeSyllabus} language={language} />
        <SyllabusBody syllabus={syllabus} activeSyllabus={activeSyllabus} language={language} />
      </View>
      <View fixed style={styles.footer}>
        <SyllabusPageFooter syllabus={syllabus} semester={semester} language={language} />
      </View>
    </Page>
  )
}

export default SyllabusPages
