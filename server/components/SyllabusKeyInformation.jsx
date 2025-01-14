import React from 'react'
import { View, Text, Image } from '@react-pdf/renderer'

import styles from './SyllabusStyles'

import i18n from '../../i18n'

const getEducationalLevelCode = course => course.educationalLevelCode

const getCourseLevelCodeText = (course, languageIndex) => {
  const educationalLevelCode = getEducationalLevelCode(course)
  return educationalLevelCode
    ? i18n.messages[languageIndex].courseInformation.course_level_code_label[educationalLevelCode]
    : ''
}

const showMainSubject = course => {
  const educationalLevelCode = getEducationalLevelCode(course)
  return educationalLevelCode === 'BASIC' || educationalLevelCode === 'ADVANCED'
}

const getMainSubjectText = syllabus => {
  if (syllabus.mainSubjects && Array.isArray(syllabus.mainSubjects)) {
    return syllabus.mainSubjects.toString()
  }
  return syllabus.mainSubjects || ''
}

const SyllabusKeyInformation = ({ syllabus, activeSyllabus, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  const { course } = syllabus
  const { formattedGradeScale } = syllabus

  const courseGradeHeader = i18n.messages[languageIndex].courseInformation.course_grade_label
  const courseLevelCodeHeader = i18n.messages[languageIndex].courseInformation.course_level_code
  const courseLevelCodeText = getCourseLevelCodeText(course, languageIndex)
  const mainSubjectHeader = i18n.messages[languageIndex].courseInformation.course_main_subject

  return (
    <View>
      <Text style={styles.h2}>{`${courseGradeHeader}`}</Text>
      <Text style={styles.bodyText}>{`${formattedGradeScale}`}</Text>
      <Text style={styles.h2}>{`${courseLevelCodeHeader}`}</Text>
      <Text style={styles.bodyText}>{`${courseLevelCodeText}`}</Text>
      {showMainSubject(course) && (
        <View>
          <Text style={styles.h2}>{`${mainSubjectHeader}`}</Text>
          <Text style={styles.bodyText}>{`${getMainSubjectText(syllabus)}`}</Text>
        </View>
      )}
    </View>
  )
}

export default SyllabusKeyInformation
