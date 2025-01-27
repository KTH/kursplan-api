// Logic copied from generareHTML

const getSelectedSyllabus = (syllabusObject, semester = '20101', language = 0) => {
  const { publicSyllabusVersions: syllabuses } = syllabusObject
  let count = 0
  const selectedSyllabus = {}

  for (let i = 0; i < syllabuses.length; i++) {
    if (Number(syllabuses[i].validFromTerm.term) === Number(semester)) {
      selectedSyllabus.edition = syllabuses[i].edition
      selectedSyllabus.index = count
      selectedSyllabus.semesterNumber = syllabuses[i].validFromTerm.term.toString().substring(4, 5)
      selectedSyllabus.year = syllabuses[i].validFromTerm.term.toString().substring(2, 4)
    }
    count++
  }
  return selectedSyllabus
}

const getActiveSyllabus = (syllabus, selectedSyllabus) => {
  const activeSyllabus = syllabus.publicSyllabusVersions[selectedSyllabus.index]
  return activeSyllabus
}

export { getActiveSyllabus, getSelectedSyllabus }
