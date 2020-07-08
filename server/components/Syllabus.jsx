import React from "react";

import SyllabusDocument from "./SyllabusDocument";

/*
  Syllabus Components Overview
  - Syllabus
    - SyllabusDocument
      - SyllabusPages
        - SyllabusContent
        - SyllabusPageFooter
  - SyllabusStyles
  - SyllabusHtmlParser
*/
const Syllabus = ({ data }) => <SyllabusDocument data={data} />;

export default Syllabus;
