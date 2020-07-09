import React, { Profiler } from "react";
import { Page, View } from "@react-pdf/renderer";

import SyllabusHead from "./SyllabusHead";
import SyllabusContent from "./SyllabusContent";
import SyllabusPageFooter from "./SyllabusPageFooter";
import styles from "./SyllabusStyles";
import { profilerToLog } from "../libs/pdfUtils";

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
      <Profiler id="SyllabusContent" onRender={profilerToLog}>
        <View style={styles.content}>
          <SyllabusHead
            syllabus={syllabus}
            activeSyllabus={activeSyllabus}
            language={language}
          />
          {/* <SyllabusContent {...props} /> */}
        </View>
      </Profiler>
      <Profiler id="SyllabusPageFooter" onRender={profilerToLog}>
        <View fixed style={styles.footer}>
          {/* <SyllabusPageFooter {...props} /> */}
        </View>
      </Profiler>
    </Page>
  );
};

export default SyllabusPages;
