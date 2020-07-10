import { StyleSheet } from "@react-pdf/renderer";

import { pageMeasurements, typography } from "../libs/pdfConstants";

const { A4 } = pageMeasurements;

const styles = StyleSheet.create({
  bodyContainer: { fontFamily: "Georgia", fontSize: "12pt" },
  logotype: { height: A4.logotype, width: A4.logotype },
  pages: { padding: A4.pageMargin, flexDirection: "column" },
  content: { flexGrow: 1, padding: "0 0 10mm 0" },
  footer: { flexGrow: 0 },
  h1: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 24,
    marginTop: 24,
    marginBottom: 0,
  },
  h2: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 18,
    marginTop: 18,
    marginBottom: 6,
  },
  subHeader: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 14,
    color: "gray",
  },
  bodyText: {
    fontFamily: "Open Sans",
    fontSize: 12,
  },
  pageFooter: {
    fontFamily: "Open Sans",
    fontSize: 12,
    flexDirection: "row",
    borderTop: "1px solid black",
    paddingTop: "6pt",
  },
  pageFooterLeft: {
    flexGrow: 0,
    flexDirection: "column",
    fontSize: 12,
    textAlign: "left",
  },
  pageFooterRight: {
    flexGrow: 1,
    fontSize: 12,
    textAlign: "right",
  },
});

export default styles;
