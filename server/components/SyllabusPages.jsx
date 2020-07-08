import React, { Profiler } from "react";
import { Page, View } from "@react-pdf/renderer";

import SyllabusHead from "./SyllabusHead";
import SyllabusContent from "./SyllabusContent";
import SyllabusPageFooter from "./SyllabusPageFooter";
import styles from "./SyllabusStyles";
import { profilerToLog } from "../libs/pdfUtils";

/* A4 is default page size value, explicitly set for clarity */
const SyllabusPages = (props) => (
  <Page size="A4" style={styles.pages}>
    <Profiler id="SyllabusContent" onRender={profilerToLog}>
      <View style={styles.content}>
        <SyllabusHead {...props} />
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

export default SyllabusPages;
