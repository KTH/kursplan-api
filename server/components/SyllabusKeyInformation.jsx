import React from 'react'
import { View, Text, Image } from '@react-pdf/renderer'

import styles from './SyllabusStyles'

import i18n from '../../i18n'

const getEducationalLevelCode = course => course.nivainomstudieordning.code

const showMainSubject = course => {
  // TODO: any particular rules that should apply here? This function is a product from before when we used Kopps
  const educationalLevelCode = getEducationalLevelCode(course)
  return educationalLevelCode === 'UPHPGKURS' || educationalLevelCode === 'UPHPAKURS'
}

const SyllabusKeyInformation = ({ syllabus, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  const { course } = syllabus
  const { betygsskala } = course

  const courseGradeHeader = i18n.messages[languageIndex].courseInformation.course_grade_label
  const courseLevelCodeHeader = i18n.messages[languageIndex].courseInformation.course_level_code
  const courseLevelCodeText = course.nivainomstudieordning[language]
  const mainSubjectHeader = i18n.messages[languageIndex].courseInformation.course_main_subject

  return (
    <View>
      <Text style={styles.h2}>{`${courseGradeHeader}`}</Text>
      <Text style={styles.bodyText}>{`${betygsskala}`}</Text>
      <Text style={styles.h2}>{`${courseLevelCodeHeader}`}</Text>
      <Text style={styles.bodyText}>{`${courseLevelCodeText}`}</Text>
      {showMainSubject(course) && (
        <View>
          <Text style={styles.h2}>{`${mainSubjectHeader}`}</Text>
          <Text style={styles.bodyText}>{`${course.huvudomraden[0][language]}`}</Text>
        </View>
      )}
    </View>
  )
}

export default SyllabusKeyInformation
