'use strict'
const i18n = require('../../i18n')
const log = require('kth-node-log')
const EMPTY = ''

module.exports = function (syllabusObject, semester, lang = 'sv') {
  const language = lang === 'en' ? 0 : 1
  const selectedSyllabus = getSelectedSyllabus(syllabusObject, semester)
  const activeSyllabus = syllabusObject.publicSyllabusVersions[selectedSyllabus.index]
  // console.log('syllabusObject', activeSyllabus)

  const titleData = {
    course_code: isValidData(syllabusObject.course.courseCode),
    course_title: isValidData(syllabusObject.course.title),
    course_other_title: isValidData(syllabusObject.course.titleOther),
    course_credits: isValidData(syllabusObject.course.credits),
    course_valid_from: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.validFromTerm.term).toString().match(/.{1,4}/g) : []
  }
  //* * Adding a decimal if it's missing in credits **/
  titleData.course_credits = titleData.course_credits !== EMPTY && titleData.course_credits.toString().indexOf('.') < 0 ? titleData.course_credits + '.0' : titleData.course_credits
  const englishTranlationLine = language === 0 ? '<p>This is a translation of the Swedish, legally binding, course syllabus.</p>' : ''

  const titleHTML = `
    <h1><span property="aiiso:code">${titleData.course_code}</span>
      <span property="teach:courseTitle"> ${titleData.course_title}</span>
      <span content=${titleData.course_credits} datatype="xsd:decimal" property="teach:ects"> ${language === 0 ? titleData.course_credits : titleData.course_credits.toString().replace('.', ',')}&nbsp;${language === 0 ? 'credits' : syllabusObject.course.creditUnitAbbr} </span>
    </h1>
    <h2 class="secondTitle">
      <span property="teach:courseTitle">${titleData.course_other_title}</span>
    </h2>
    ${englishTranlationLine}
    <p> ${activeSyllabus.courseSyllabus.discontinuationText} </p> 
    <h3>${i18n.messages[language].courseInformation.course_establishment}</h3>
    <p> ${activeSyllabus.courseSyllabus.establishment} </p> 
    ${activeSyllabus.courseSyllabus.decisionToDiscontinue !== undefined
    ? '<h3>' + i18n.messages[language].courseInformation.course_decision_to_discontinue + '</h3>' + activeSyllabus.courseSyllabus.decisionToDiscontinue
    : ''}
         `

  const keyData = {
    course_grade_scale: isValidData(syllabusObject.formattedGradeScales[syllabusObject.course.gradeScaleCode], language), // TODO: can this be an array?
    course_level_code: isValidData(syllabusObject.course.educationalLevelCode),
    course_main_subject: syllabusObject.mainSubjects ? Array.isArray(syllabusObject.mainSubjects) ? syllabusObject.mainSubjects.toString() : isValidData(syllabusObject.mainSubjects) : EMPTY
  }

  // const courseLevel = keyData.course_level_code.length > 0 ? `<b>${i18n.messages[language].courseInformation.course_level_code}:</b> ${i18n.messages[language].courseInformation.course_level_code_label[keyData.course_level_code]}<br/>` : ''
  const keyInformation = `
    <h3>${i18n.messages[language].courseInformation.course_grade_label}</h3>
    <p> ${keyData.course_grade_scale}</p>
    <h3>${i18n.messages[language].courseInformation.course_level_code}</h3> 
    <p>${keyData.course_level_code.length > 0 ? i18n.messages[language].courseInformation.course_level_code_label[keyData.course_level_code] : ''}</p>
    ${keyData.course_level_code === 'BASIC' || keyData.course_level_code === 'ADVANCED'
    ? '<h3>' + i18n.messages[language].courseInformation.course_main_subject + '</h3> <p>' + keyData.course_main_subject + '</p>'
    : ''} 
    `

  const bodyInformation = {
    course_language: activeSyllabus.courseSyllabus.languageOfInstruction,
    course_goals: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.goals, language) : EMPTY,
    course_content: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.content, language) : EMPTY,
    course_disposition: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.disposition, language) : EMPTY,
    course_eligibility: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.eligibility, language) : EMPTY,
    course_literature: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.literature, language) : EMPTY,
    course_literature_comment: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.literatureComment, language) : EMPTY,
    course_required_equipment: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.requiredEquipment, language) : EMPTY,
    course_examination: getExamObject(syllabusObject.examinationSets[Object.keys(syllabusObject.examinationSets)[0]].examinationRounds, syllabusObject.formattedGradeScales, syllabusObject.course.creditUnitAbbr, language),
    course_examination_comments: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.examComments, language) : EMPTY,
    course_requirments_for_final_grade: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.reqsForFinalGrade, language) : EMPTY,
    course_transitional_reg: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.transitionalRegulations, language) : EMPTY,
    course_ethical: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.ethicalApproach, language) : EMPTY,
    course_additional_regulations: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(activeSyllabus.courseSyllabus.additionalRegulations, language) : EMPTY
  }

  let bodyHTML = ''
  let styleClass = ''
  Object.keys(bodyInformation).forEach(function (key) {
    if (bodyInformation[key].length > 0 || key === 'course_eligibility' ||
           key === 'course_goals' || key === 'course_content' || key === 'course_examination') {
      styleClass = key === 'course_goals' ? 'pdfSection1' : 'pdfSection'
      if (key === 'course_literature_comment' && bodyInformation['course_literature'].length === 0) {
        bodyHTML += toHeaderAndText(i18n.messages[language].courseInformation['course_literature'], bodyInformation[key], styleClass)
      } else {
        bodyHTML += toHeaderAndText(i18n.messages[language].courseInformation[key], bodyInformation[key], styleClass)
      }
    }
  })

  log.info('Kursplan: pageContentHtml: OK ')
  const pageContentHtml = topHtml(titleData.course_code, lang) + titleHTML + keyInformation + bodyHTML + bottomHtml()
  const footerText = validFromHtml(selectedSyllabus, language, syllabusObject.course.courseCode, 'footer')
  return { pageContentHtml, footerText }
}

function toHeaderAndText (header, text, styleClass) {
  header = header.length > 0 ? ` <h3>${header}</h3>` : ''
  return (
    `<div class="${styleClass}" >
          ${header}
       <p> ${text} </p> 
    </div>`
  )
}

function validFromHtml (selectedSyllabus, language, courseCode, type) {
  const translation = i18n.messages[language].course_pdf_footer_string
  const addText = type === 'footer' ? translation.edition + selectedSyllabus.edition : ''
  return (translation.for_code + courseCode +
            translation.valid_from + translation.semester[Number(selectedSyllabus.semesterNumber)] +
            selectedSyllabus.year + addText)
}

function getExamObject (dataObject, grades, courseCredits, language = 0) {
  let examString = ''
  if (dataObject.length > 0) {
    for (let exam of dataObject) {
      //* * Adding a decimal if it's missing in credits **/
      exam.credits = exam.credits !== EMPTY && exam.credits.toString().indexOf('.') < 0 ? exam.credits + '.0' : exam.credits

      examString += `<li>${exam.examCode} - 
                        ${exam.title},
                        ${language === 0 ? exam.credits : exam.credits.toString().replace('.', ',')} ${language === 0 ? 'credits' : courseCredits},  
                        ${i18n.messages[language].courseInformation.course_grade_label.toLowerCase()}: ${grades[exam.gradeScaleCode]}             
                        </li>`
    }
  }
  log.info('Kursplan: getExamObject is ok', examString)
  return examString
}

function isValidData (dataObject, language = 0) {
  return !dataObject ? EMPTY : dataObject
}

function topHtml (courseCode, lan) {
  const style = `<style>
        html { height: 0; }
        body{ background-color:#ffffff; font-size:11px; margin-left:40px; margin-right:40px; line-height: 15px; }
        #kth-logo{ height:80px; margin-left:15px; margin-bottom: 20px;}
        i, cite, em, dfn { font-weight:600; }
        .pdfContainer{ max-width:540px; background-color:#ffffff;}
        .pdfFooterText{  background-color:#ffffff; font-size: 9px; margin-left:10px; margin-right:10px; margin-top:20px; border-top: 1px solid #ddd; color: #444;}
        .pdfContent p{ page-break-inside: avoid;}
        .pdfContent h3{margin-top: 20px;}
        .pdfSection{page-break-inside: avoid; padding-bottom: 0px; margin-bottom: 0px;}
        .secondTitle{ margin-top: 15px; margin-bottom: 17px; color:#808080; font-size: 16px; border-bottom:1px solid #808080}
        ul li{font-family: "Open Sans", Arial, "Helvetica Neue", helvetica, sans-serif;}
    </style>
    `
  return `<!DOCTYPE html>
        <html lang="${lan}">
        <head>
            <title>KTH | ${courseCode}</title>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="${courseCode}">
            <link rel="shortcut icon" id="favicon" href="//www.kth.se/img/icon/favicon.ico">
            <link href="https://app.kth.se/style/kth-style/css/kth-bootstrap.css" rel="stylesheet">
            ${style}
        </head>
        <body>
            <div class="pdfContainer">
                <div class="pdfContent">
                    <div style="text-align: left;"><img id="kth-logo" src="https://www.kth.se/student/kurser/images/kth_logo.svg" ></div>
                    <div class="col">`
}

function getSelectedSyllabus (syllabusObject, semester = '20101', language = 0) {
  let count = 0
  let selectedSyllabus = {}
  const syllabuses = syllabusObject.publicSyllabusVersions

  for (let i = 0; i < syllabuses.length; i++) {
    if (Number(syllabuses[i].validFromTerm.term) === Number(semester)) {
      selectedSyllabus.edition = syllabuses[i].edition
      selectedSyllabus.index = count
      selectedSyllabus.semesterNumber = syllabuses[i].validFromTerm.term.toString().substring(4, 5)
      selectedSyllabus.year = syllabuses[i].validFromTerm.term.toString().substring(2, 4)
    }
    count++
  }
  log.info('Syllabus for semester ' + selectedSyllabus.semesterNumber)
  return selectedSyllabus
}

function bottomHtml () {
  return `</div></div></div></body> </html>`
}
