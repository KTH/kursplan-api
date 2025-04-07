const i18n = require('../../i18n')

const getLadokSemesterCode = semester => semester.slice(0, 2)

const getSemesterStringByLanguage = (semester, languageIndex) => {
  const semesterCode = getLadokSemesterCode(semester)
  const translatedSemester = i18n.messages[languageIndex].courseInformation.ladok_semester[semesterCode]
  return translatedSemester
}

module.exports = {
  getSemesterStringByLanguage,
}
