import { StyleSheet } from "@react-pdf/renderer";

import { pageMeasurements, typography } from "../libs/pdfConstants";

const { A4 } = pageMeasurements;

const styles = StyleSheet.create({
  contentContainer: { fontFamily: "Georgia", fontSize: "12pt" },
  logotype: { height: A4.logotype, width: A4.logotype },
});

export default styles;
