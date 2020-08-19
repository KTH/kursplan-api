import React from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "./SyllabusStyles";
import i18n from "../../i18n";

const getSelectedSyllabus = (
  syllabusObject,
  semester = "20101",
  language = 0
) => {
  let count = 0;
  let selectedSyllabus = {};
  const syllabuses = syllabusObject.publicSyllabusVersions;

  for (let i = 0; i < syllabuses.length; i++) {
    if (Number(syllabuses[i].validFromTerm.term) === Number(semester)) {
      selectedSyllabus.edition = syllabuses[i].edition;
      selectedSyllabus.index = count;
      selectedSyllabus.semesterNumber = syllabuses[i].validFromTerm.term
        .toString()
        .substring(4, 5);
      selectedSyllabus.year = syllabuses[i].validFromTerm.term
        .toString()
        .substring(2, 4);
    }
    count++;
  }
  return selectedSyllabus;
};

const footerText = (languageIndex, syllabus, semester) => {
  const { courseCode } = syllabus.course;
  const selectedSyllabus = getSelectedSyllabus(
    syllabus,
    semester,
    languageIndex
  );
  const translation = i18n.messages[languageIndex].course_pdf_footer_string;
  return (
    translation.for_code +
    courseCode +
    translation.valid_from +
    translation.semester[Number(selectedSyllabus.semesterNumber)] +
    selectedSyllabus.year +
    translation.edition +
    selectedSyllabus.edition
  );
};

const SyllabusPageFooter = ({ syllabus, semester, language }) => {
  const languageIndex = language === "en" ? 0 : 1;
  const { course } = syllabus;
  return (
    <View style={styles.pageFooter}>
      <Text style={styles.pageFooterLeft}>
        {footerText(languageIndex, syllabus, semester)}
      </Text>
      <Text
        style={styles.pageFooterRight}
        render={({ pageNumber, totalPages }) =>
          languageIndex
            ? `Sida ${pageNumber} av ${totalPages}`
            : `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </View>
  );
};

export default SyllabusPageFooter;
