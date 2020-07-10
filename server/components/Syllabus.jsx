import React from "react";

import SyllabusDocument from "./SyllabusDocument";

/*
  Syllabus Components Overview
  - Syllabus
    - SyllabusDocument
      - SyllabusPages
        - SyllabusHead
        - SyllabusKeyInformation
        - SyllabusBody
        - SyllabusPageFooter
  - SyllabusStyles
  - SyllabusHtmlParser
*/
const Syllabus = (props) => <SyllabusDocument {...props} />;

export default Syllabus;
