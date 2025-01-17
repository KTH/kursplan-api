import React, { Fragment } from 'react'
import { View, Text, Image } from '@react-pdf/renderer'

import parse from './SyllabusHtmlParser'
import styles from './SyllabusStyles'

import i18n from '../../i18n'
import { logotypePath } from '../libs/pdfConstants'

const englishTranslationText = language =>
  language === 'en' ? 'This is a translation of the Swedish, legally binding, course syllabus.' : ''

const SyllabusHead = ({ syllabus, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  const { course, kursplan } = syllabus
  const { kod, benamning } = course
  const { faststallande } = kursplan
  const { discontinuationText, decisionToDiscontinue } = kursplan || {}
  const omfattning = course.omfattning.formattedWithUnit
  const translationText = englishTranslationText(language)
  const establishmentHeader = i18n.messages[languageIndex].courseInformation.course_establishment
  const discontinuationHeader = i18n.messages[languageIndex].courseInformation.course_decision_to_discontinue

  return (
    <View>
      <Image style={styles.logotype} src={logotypePath} />
      <Text style={styles.h1}>{`${kod} ${benamning[language]} ${omfattning}`}</Text>
      <Text style={styles.subHeader}>{`${benamning[language === 'sv' ? 'en' : 'sv']}`}</Text>
      <View style={styles.disclaimer}>
        <Text style={styles.p}>{`${translationText}`}</Text>
        {discontinuationText && <Text style={styles.p}>{`${discontinuationText}`}</Text>}
      </View>
      <Text style={styles.h2}>{`${establishmentHeader}`}</Text>
      <Text style={styles.bodyText}>{parse(faststallande)}</Text>
      {decisionToDiscontinue ? (
        <Fragment>
          <Text style={styles.h2}>{`${discontinuationHeader}`}</Text>
          <Text style={styles.bodyText}>{parse(decisionToDiscontinue)}</Text>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </View>
  )
}

export default SyllabusHead
