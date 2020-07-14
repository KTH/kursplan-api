import React, { Profiler } from "react";
import { Document } from "@react-pdf/renderer";

import SyllabusPages from "./SyllabusPages";
import { profilerToLog, timer } from "../libs/pdfUtils";

const SyllabusDocument = ({ syllabus, semester, language }) => {
  const { course } = syllabus;
  const title = `${course.courseCode}-${semester}`;
  return (
    <Profiler id="SyllabusDocument" onRender={profilerToLog}>
      <Document
        title={title}
        author="KTH"
        onRender={timer("SyllabusDocument", Date.now())}
      >
        <Profiler id="SyllabusPages" onRender={profilerToLog}>
          <SyllabusPages
            syllabus={syllabus}
            semester={semester}
            language={language}
          />
        </Profiler>
      </Document>
    </Profiler>
  );
};

export default SyllabusDocument;
