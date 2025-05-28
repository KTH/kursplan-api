import React, { Fragment } from 'react'
import { View, Text } from '@react-pdf/renderer'

import styles from './SyllabusStyles'
import parse from './SyllabusHtmlParser'

import i18n from '../../i18n'

// Copied logic from generareHTML
const sectionData = (syllabus = {}) => {
  const { course = {} } = syllabus
  const { educationalTypeId = null } = course

  const isContractEducation = [101992, 101993].includes(educationalTypeId)
  const courseEligibilityByEduTypeId = isContractEducation
    ? {}
    : { course_eligibility: syllabus ? syllabus.kursplan.sarskildbehorighet : '' }
  const courseAdditionalRegulationsByEduTypeId = isContractEducation
    ? {}
    : { course_additional_regulations: syllabus ? syllabus.kursplan.ovrigaForeskrifter : '' }

  return syllabus
    ? {
        ...courseAdditionalRegulationsByEduTypeId,
        ...courseEligibilityByEduTypeId,
        course_language: syllabus.kursplan.undervisningssprak,
        course_goals: syllabus.kursplan.larandemal || '',
        course_content: syllabus.kursplan.kursinnehall || '',
        course_disposition: syllabus.kursplan.kursupplagg || '',
        course_literature: syllabus.kursplan.kurslitteratur,
        course_required_equipment: syllabus.kursplan.gammalutrustning || '',
        course_examination: syllabus.kursplan.examinationModules.completeExaminationStrings || '',
        course_examination_comments: syllabus.kursplan.kommentartillexamination || '',
        course_requirments_for_final_grade: syllabus.kursplan.ovrigakravforslutbetyg || '',
        course_transitional_reg: syllabus.course.overgangsbestammelser || '',
        course_ethical: syllabus.kursplan.etisktforhallandesatt || '',
      }
    : {}
}

const renderSections = (syllabus, languageIndex) => {
  const sectionsContent = sectionData(syllabus)
  return Object.entries(sectionsContent).map(([id, content]) => (
    <Section key={id} id={id} content={content} languageIndex={languageIndex} />
  ))
}

const Section = ({ id, content, languageIndex }) => {
  if (
    !content &&
    id !== 'course_eligibility' &&
    id !== 'course_goals' &&
    id !== 'course_content' &&
    id !== 'course_examination'
  ) {
    return null
  }

  const sectionHeader = i18n.messages[languageIndex].courseInformation[id]
  const sectionContent = content
  return (
    <View>
      {sectionHeader ? <Text style={styles.h2}>{sectionHeader}</Text> : <Fragment />}
      {sectionContent ? <View style={styles.bodyText}>{parse(sectionContent)}</View> : <Fragment />}
    </View>
  )
}

const SyllabusBody = ({ syllabus, language }) => {
  const languageIndex = language === 'en' ? 0 : 1
  const view = renderSections(syllabus, languageIndex)
  return <View>{view}</View>
}

export default SyllabusBody
