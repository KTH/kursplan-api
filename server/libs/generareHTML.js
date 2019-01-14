'use strict'
const i18n = require('../../i18n')
const EMPTY = ""
const pdfStyle = require('./pdfStyle')

module.exports = function (syllabusObject, semester, lang = 'sv'){
    const language = lang === 'en' ? 0 : 1
    const selectedSyllabus = getSelectedSyllabus(syllabusObject, semester)

    const titleData = {
      course_code: isValidData(syllabusObject.course.courseCode),
      course_title: isValidData(syllabusObject.course.title),
      course_other_title:isValidData(syllabusObject.course.titleOther),
      course_credits:isValidData(syllabusObject.course.credits),
      course_valid_from: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].validFromTerm.term).toString().match(/.{1,4}/g) : []
    }
    //** Adding a decimal if it's missing in credits **/
    titleData.course_credits = titleData.course_credits !== EMPTY && titleData.course_credits.toString().indexOf('.') < 0 ? titleData.course_credits+".0": titleData.course_credits

    const englishTranlationLine = language == 0 ? '<p>This is a translation of the Swedish, legally binding, course syllabus.</p>':''
    const titleHTML = `
        <h1><span property="aiiso:code">${titleData.course_code}</span>
            <span property="teach:courseTitle"> ${titleData.course_title}</span>
            <span content=${titleData.course_credits} datatype="xsd:decimal" property="teach:ects"> ${language === 0 ? titleData.course_credits : titleData.course_credits.toString().replace('.',',') }&nbsp;${language === 0 ? "credits" : "hp"} </span>
        </h1>
        <h2 class="secondTitle">
            <span property="teach:courseTitle">${titleData.course_other_title}</span>
        </h2>
       
        <p>${validFromHtml(selectedSyllabus, language, syllabusObject.course.courseCode, "title") }</p>
        ${englishTranlationLine} 
         `

    const keyData ={
        course_grade_scale: isValidData(syllabusObject.formattedGradeScales[syllabusObject.course.gradeScaleCode],language), //TODO: can this be an array?
        course_level_code: isValidData(syllabusObject.course.educationalLevelCode),
        course_main_subject: syllabusObject.mainSubjects ?  Array.isArray(syllabusObject.mainSubjects) ? syllabusObject.mainSubjects.toString() : isValidData(syllabusObject.mainSubjects) : EMPTY
    }

    const courseLevel =  keyData.course_level_code.length > 0 ? `<b>${i18n.messages[language].courseInformation.course_level_code}:</b> ${i18n.messages[language].courseInformation.course_level_code_label[keyData.course_level_code]}<br/>` : ""
    const keyInformation = `
        <p>
            <b>${i18n.messages[language].courseInformation.course_grade_label}:</b> ${keyData.course_grade_scale}<br/>
            <b>${i18n.messages[language].courseInformation.course_level_code}:</b> ${keyData.course_level_code.length > 0 ? i18n.messages[language].courseInformation.course_level_code_label[keyData.course_level_code] : ""}<br/>
            <b>${keyData.course_level_code === 'BASIC' || keyData.course_level_code === 'ADVANCED' ? i18n.messages[language].courseInformation.course_main_subject : "" }</b> ${keyData.course_main_subject}
        </p>
        `

    const bodyInformation ={
      course_goals: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.goals, language) : EMPTY,
      course_content:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.content, language): EMPTY,
      course_disposition:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.disposition, language): EMPTY, 
      course_language: i18n.messages[language].courseInformation.course_language_default_text,
      course_eligibility:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.eligibility, language): EMPTY, 
      course_literature: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.literature, language): EMPTY, 
      course_literature_comment: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.literatureComment, language): EMPTY, 
      course_required_equipment: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.requiredEquipment, language): EMPTY,
      course_examination: getExamObject(syllabusObject.examinationSets[Object.keys(syllabusObject.examinationSets)[0]].examinationRounds, syllabusObject.formattedGradeScales, language),
      course_examination_comments:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.examComments, language):EMPTY,
      course_requirments_for_final_grade:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.reqsForFinalGrade, language): EMPTY,
      course_ethical: i18n.messages[language].courseInformation.course_ethical_text
    }

    let bodyHTML = ""
    let styleClass = ""
    Object.keys(bodyInformation).forEach(function (key) {
        if(bodyInformation[key].length > 0 
           || key === 'course_literature' || key === 'course_eligibility' 
           || key === 'course_goals' || key === 'course_content' || key === 'course_examination'){
            styleClass = key === 'course_goals' ? 'pdfSection1' : 'pdfSection'
            //console.log("text length", bodyInformation[key].length)
            bodyHTML += toHeaderAndText(i18n.messages[language].courseInformation[key], bodyInformation[key], styleClass)
        }
    })

    

    console.log("!!pageContentHtml: OK !!")
    const pageContentHtml = topHtml(titleData.course_code) + titleHTML + keyInformation + bodyHTML + bottomHtml()
    const footerText = validFromHtml(selectedSyllabus, language, syllabusObject.course.courseCode, "footer") 
    return {pageContentHtml, footerText}
}

function toHeaderAndText(header, text, styleClass){
    header = header.length > 0 ? ` <h3>${header}</h3>`: ''
    return(
        `<span class="${styleClass}" >
          ${header}
          <p> ${text} </p> 
        </span>`
    )
}

function validFromHtml(selectedSyllabus, language, courseCode, type){
    const translation = i18n.messages[language].course_pdf_footer_string
    const addText = type === "footer" ? translation.edition + selectedSyllabus.edition : ""
    return( translation.for_code + courseCode + 
            translation.valid_from + translation.semester[Number(selectedSyllabus.semesterNumber)] + 
            selectedSyllabus.year + addText )      
}

function getExamObject(dataObject, grades, language = 0){
  let examString = ""
  if(dataObject.length > 0){
    for(let exam of dataObject){
        //** Adding a decimal if it's missing in credits **/
        exam.credits = exam.credits !== EMPTY && exam.credits.toString().length === 1 ? exam.credits+".0": exam.credits

        examString += `<li>${exam.examCode} - 
                        ${exam.title},
                        ${language === 0 ? exam.credits : exam.credits.toString().replace('.',',')} ${language === 0 ? " credits" : " hp"},  
                        ${i18n.messages[language].courseInformation.course_grade_label.toLowerCase()}: ${grades[exam.gradeScaleCode]}             
                        </li>`
    }
  }
  console.log("!!getExamObject is ok!!")
  return examString 
}

function isValidData(dataObject, language = 0){
    return !dataObject ? EMPTY : dataObject
  }

function topHtml(courseCode){
   
    return `<!DOCTYPE html>
        <html>
        <head>
            <title>KTH | ${courseCode}</title>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">
            <link rel="shortcut icon" id="favicon" href="//www.kth.se/img/icon/favicon.ico">
            <link href="https://app.kth.se/style/kth-style/css/kth-bootstrap.css" rel="stylesheet">
            ${pdfStyle()}
        </head>
        <body>
            <div class="pdfContainer">
                <div class="pdfContent">
                    <div style="text-align: left;"><img id="kth-logo" src="https://www.kth.se/student/kurser/images/kth_logo.svg" ></div>
                    <div class="col">`
}       

function getSelectedSyllabus(syllabusObject, semester = "20101", language = 0){
    let count = 0;
    let selectedSyllabus = {}
    const syllabuses = syllabusObject.publicSyllabusVersions

    for(let i =0; i < syllabuses.length; i++ ) { 
        if(Number(syllabuses[i].validFromTerm.term) === Number(semester)){
            selectedSyllabus.edition = syllabuses[i].edition
            selectedSyllabus.index = count
            selectedSyllabus.semesterNumber = syllabuses[i].validFromTerm.term.toString().substring(4,5),
            selectedSyllabus.year = syllabuses[i].validFromTerm.term.toString().substring(2,4)
        }
        count++
    }
    
    return selectedSyllabus
}

function bottomHtml(){  
    return `</div></div></div></body> </html>`
}