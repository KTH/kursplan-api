"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedSyllabus = exports.getActiveSyllabus = void 0;
// Logic copied from generareHTML

var getSelectedSyllabus = exports.getSelectedSyllabus = function getSelectedSyllabus(syllabusObject) {
  var semester = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '20101';
  var language = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var syllabuses = syllabusObject.publicSyllabusVersions;
  var count = 0;
  var selectedSyllabus = {};
  for (var i = 0; i < syllabuses.length; i++) {
    if (Number(syllabuses[i].validFromTerm.term) === Number(semester)) {
      selectedSyllabus.edition = syllabuses[i].edition;
      selectedSyllabus.index = count;
      selectedSyllabus.semesterNumber = syllabuses[i].validFromTerm.term.toString().substring(4, 5);
      selectedSyllabus.year = syllabuses[i].validFromTerm.term.toString().substring(2, 4);
    }
    count++;
  }
  return selectedSyllabus;
};
var getActiveSyllabus = exports.getActiveSyllabus = function getActiveSyllabus(syllabus, selectedSyllabus) {
  var activeSyllabus = syllabus.publicSyllabusVersions[selectedSyllabus.index];
  return activeSyllabus;
};