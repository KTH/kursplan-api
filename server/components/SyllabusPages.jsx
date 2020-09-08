import React from "react";
import { Page, View } from "@react-pdf/renderer";

import SyllabusHead from "./SyllabusHead";
import SyllabusKeyInformation from "./SyllabusKeyInformation";
import SyllabusBody from "./SyllabusBody";
import SyllabusPageFooter from "./SyllabusPageFooter";
import styles from "./SyllabusStyles";

// Logic copied from generareHTML
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

const getActiveSyllabus = (syllabus, selectedSyllabus) => {
  const activeSyllabus =
    syllabus.publicSyllabusVersions[selectedSyllabus.index];
  return activeSyllabus;
};

/* A4 is default page size value, explicitly set for clarity */
const SyllabusPages = ({ syllabus, semester, language }) => {
  const selectedSyllabus = getSelectedSyllabus(syllabus, semester);
  const activeSyllabus = getActiveSyllabus(syllabus, selectedSyllabus);
  return (
    <Page size="A4" style={styles.pages}>
      <View style={styles.content}>
        <SyllabusHead
          syllabus={syllabus}
          activeSyllabus={activeSyllabus}
          language={language}
        />
        <SyllabusKeyInformation
          syllabus={syllabus}
          activeSyllabus={activeSyllabus}
          language={language}
        />
        <SyllabusBody
          syllabus={syllabus}
          activeSyllabus={activeSyllabus}
          language={language}
        />
      </View>
      <View fixed style={styles.footer}>
        <SyllabusPageFooter
          syllabus={syllabus}
          semester={semester}
          language={language}
        />
      </View>
    </Page>
  );
};

export default SyllabusPages;
