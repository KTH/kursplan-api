import React from 'react'
import { Page, View } from '@react-pdf/renderer'

import SyllabusHead from './SyllabusHead'
import SyllabusKeyInformation from './SyllabusKeyInformation'
import SyllabusBody from './SyllabusBody'
import SyllabusPageFooter from './SyllabusPageFooter'
import styles from './SyllabusStyles'

/* A4 is default page size value, explicitly set for clarity */
const SyllabusPages = ({ syllabus, language }) => (
  <Page size="A4" style={styles.pages}>
    <View style={styles.content}>
      <SyllabusHead syllabus={syllabus} language={language} />
      <SyllabusKeyInformation syllabus={syllabus} language={language} />
      <SyllabusBody syllabus={syllabus} language={language} />
    </View>
    <View fixed style={styles.footer}>
      <SyllabusPageFooter syllabus={syllabus} language={language} />
    </View>
  </Page>
)

export default SyllabusPages
