'use strict'
const i18n = require('../../i18n')
const EMPTY = ""

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

    const titleHTML = `
        <h1><span property="aiiso:code">${titleData.course_code}</span>
            <span property="teach:courseTitle"> ${titleData.course_title},</span>
            <span content=${titleData.course_credits} datatype="xsd:decimal" property="teach:ects"> ${titleData.course_credits} ${language === 0 ? " credits" : " hp"} </span>
        </h1>
        <h2 class="secondTitle">
            <span property="teach:courseTitle">${titleData.course_other_title}</span>
        </h2>
        <p>${validFromHtml(selectedSyllabus, language, syllabusObject.course.courseCode, "title") }</p>
         `

    const keyData ={
        course_grade_scale: isValidData(syllabusObject.formattedGradeScales[syllabusObject.course.gradeScaleCode],language), //TODO: can this be an array?
        course_level_code: isValidData(syllabusObject.course.educationalLevelCode),
        course_main_subject: syllabusObject.mainSubjects ?  Array.isArray(syllabusObject.mainSubjects) ? syllabusObject.mainSubjects.map(sub => sub + " ") : isValidData(syllabusObject.mainSubjects) : EMPTY
    }

    const keyInformation = `
        <p>
            <b>Betygsskala:</b> ${keyData.course_grade_scale}<br/>
            <b>Utbildningsnivå:</b> ${keyData.course_level_code}<br/>
            <b>Huvudområde:</b> ${keyData.course_main_subject}
        </p>
        `

    const bodyInformation ={
      course_goals: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.goals, language) : EMPTY,
      course_content:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.content, language): EMPTY,
      course_disposition:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.disposition, language): EMPTY, 
      course_language: i18n.messages[language].courseInformation.course_language_default_text,
      course_eligibility:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.eligibility, language): EMPTY, 
      course_requirments_for_final_grade:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.reqsForFinalGrade, language): EMPTY,
      course_literature: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.literature, language): EMPTY, 
      course_required_equipment: syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.requiredEquipment, language): EMPTY,
      course_examination: getExamObject(syllabusObject.examinationSets[Object.keys(syllabusObject.examinationSets)[0]].examinationRounds, syllabusObject.formattedGradeScales, language),
      course_examination_comments:  syllabusObject.publicSyllabusVersions && syllabusObject.publicSyllabusVersions.length > 0 ? isValidData(syllabusObject.publicSyllabusVersions[selectedSyllabus.index].courseSyllabus.examComments, language):EMPTY,
      course_ethical: i18n.messages[language].courseInformation.course_ethical_text
    }

    let bodyHTML = ""
    Object.keys(bodyInformation).forEach(function (key) {
        if(bodyInformation[key].length > 0 
            || key === 'course_literature' || key === 'course_eligibility' 
            || key === 'course_goals' || key === 'course_content' || key === 'course_examination')
        bodyHTML += toHeaderAndText(i18n.messages[language].courseInformation[key], bodyInformation[key])
    })

    

    console.log("!!pageContentHtml: OK !!")
    const pageContentHtml = topHtml(titleData.course_code) + titleHTML + keyInformation + bodyHTML + bottomHtml()
    const footerText = validFromHtml(selectedSyllabus, language, syllabusObject.course.courseCode, "footer") 
    return {pageContentHtml, footerText}
}

function toHeaderAndText(header, text){
    return(
        `<div>
          <h3>${header}</h3>
          <p> ${text} </p> 
        </div>`
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
     examString += `<li>${exam.examCode} - 
                    ${exam.title},
                    ${exam.credits},  
                    Betygskala: ${grades[exam.gradeScaleCode]}             
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
    const style = `<style>
        body{ background-color:#ffffff; font-size:11px; margin-left:40px; margin-right:40px; line-height: 15px;}
        #kth-logo{ height:80px; margin-left:15px; margin-bottom: 20px;}
        .pdfContainer{ max-width:540px; background-color:#ffffff;}
        .pdfFooterText{ width:520px; background-color:#ffffff; font-size: 9px; margin-left:10px; margin-right:10px; padding-top: 10px; border-top: 1px solid #ddd;  display: inline-block; color: #444;}
        .pdfContent p{margin-bottom: 5px;}
        .pdfContent h3{margin-top: 20px;}
        .secondTitle{ margin-top: -25px; margin-bottom: 17px; color:#444; font-size: 16px;}
        ul li{font-family: "Open Sans", Arial, "Helvetica Neue", helvetica, sans-serif;}
    </style>
    `
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
            ${style}
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