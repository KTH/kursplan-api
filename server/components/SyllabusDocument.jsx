import React, { Profiler } from "react";
import { Document, Font } from "@react-pdf/renderer";

import SyllabusPages from "./SyllabusPages";
import { profilerToLog, timer } from "../libs/pdfUtils";

Font.register({
  family: "Open Sans",
  src: "server/fonts/OpenSans-Regular.ttf",
});
Font.register({
  family: "Open Sans SemiBold",
  src: "server/fonts/OpenSans-SemiBold.ttf",
});
Font.register({
  family: "Open Sans Bold",
  src: "server/fonts/OpenSans-Bold.ttf",
});
Font.register({ family: "Georgia", src: "server/fonts/Georgia.ttf" });

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
