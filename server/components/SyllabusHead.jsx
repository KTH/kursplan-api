import React, { Fragment } from 'react'
import { View, Text, Image } from '@react-pdf/renderer'

import parse from './SyllabusHtmlParser'
import styles from './SyllabusStyles'

import i18n from '../../i18n'
import { logotypePath } from '../libs/pdfConstants'

const formatCredits = (credits, creditUnitAbbr, language) => {
  const decimals = credits % 1 !== 0
  const decimalCredits = decimals ? credits : Number(credits).toFixed(1)
  const localeCredits = language === 'sv' ? decimalCredits.toString().replace('.', ',') : decimalCredits
  const creditUnit = language === 'sv' ? creditUnitAbbr : 'credits'
  return `${localeCredits} ${creditUnit}`
}

const englishTranslationText = language =>
  language === 'en' ? 'This is a translation of the Swedish, legally binding, course syllabus.' : ''

const SyllabusHead = ({ syllabus, activeSyllabus = {}, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  const { course } = syllabus
  const { courseCode, title, credits, creditUnitAbbr, titleOther } = course
  const { courseSyllabus } = activeSyllabus
  const { discontinuationText, establishment, decisionToDiscontinue } = courseSyllabus || {}

  const creditsText = formatCredits(credits, creditUnitAbbr, language)
  const translationText = englishTranslationText(language)
  const establishmentHeader = i18n.messages[languageIndex].courseInformation.course_establishment
  const discontinuationHeader = i18n.messages[languageIndex].courseInformation.course_decision_to_discontinue

  return (
    <View>
      <Image style={styles.logotype} src={logotypePath} />
      <Text style={styles.h1}>{`${courseCode} ${title} ${creditsText}`}</Text>
      <Text style={styles.subHeader}>{`${titleOther}`}</Text>
      <View style={styles.disclaimer}>
        <Text style={styles.p}>{`${translationText}`}</Text>
        {discontinuationText && <Text style={styles.p}>{`${discontinuationText}`}</Text>}
      </View>
      <Text style={styles.h2}>{`${establishmentHeader}`}</Text>
      <Text style={styles.bodyText}>{parse(establishment)}</Text>
      {decisionToDiscontinue ? (
        <View>
          <Text style={styles.h2}>{`${discontinuationHeader}`}</Text>
          <Text style={styles.bodyText}>{`${decisionToDiscontinue}`}</Text>
        </View>
      ) : (
        <Fragment />
      )}
    </View>
  )
}

export default SyllabusHead
