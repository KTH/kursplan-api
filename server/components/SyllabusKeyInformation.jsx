import React from 'react'
import { View, Text } from '@react-pdf/renderer'

import styles from './SyllabusStyles'

import i18n from '../../i18n'

const getEducationalLevelCode = course => course.nivainomstudieordning.level.code

const showMainSubject = course => {
  const educationalLevelCode = getEducationalLevelCode(course)
  return educationalLevelCode === '1' || educationalLevelCode === '2'
}

const SyllabusKeyInformation = ({ syllabus, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  const { course } = syllabus
  const { betygsskala } = course

  const courseGradeHeader = i18n.messages[languageIndex].courseInformation.course_grade_label
  const courseLevelCodeHeader = i18n.messages[languageIndex].courseInformation.course_level_code
  const courseLevelCodeText =
    course.nivainomstudieordning.code === 'FUPKURS'
      ? courseLevelCodeTextForPreparatory[language]
      : course.nivainomstudieordning.level[language]
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
          <Text style={styles.bodyText}>{`${course.huvudomraden.map(item => item[language]).join(', ')}`}</Text>
        </View>
      )}
    </View>
  )
}

export default SyllabusKeyInformation
