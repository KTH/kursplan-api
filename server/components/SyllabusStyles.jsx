import { StyleSheet } from "@react-pdf/renderer";

import { pageMeasurements, typography } from "../libs/pdfConstants";

const { A4 } = pageMeasurements;

const styles = StyleSheet.create({
  bodyContainer: { fontFamily: "Georgia", fontSize: "12pt" },
  logotype: { height: A4.logotype, width: A4.logotype },
  pages: {
    paddingHorizontal: A4.pageMargin,
    paddingTop: A4.pageMargin,
    flexDirection: "column",
  },
  content: { flexGrow: 1, padding: "0 0 10mm 0" },
  footer: { flexGrow: 0 },
  h1: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 32,
    marginTop: 24,
    marginBottom: 0,
  },
  h2: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 18,
    marginTop: 18,
    marginBottom: 6,
  },
  p: {
    paddingBottom: 12,
  },
  subHeader: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 18,
    color: "#808080",
    marginTop: 30,
    borderBottomColor: "#808080",
    borderBottomWidth: 1.33,
    marginBottom: 12,
  },
  bodyText: {
    fontFamily: "Open Sans",
    fontSize: 12,
  },
  pageFooter: {
    fontFamily: "Open Sans",
    fontSize: 9,
    flexDirection: "row",
    borderTopColor: "#808080",
    borderTopWidth: 1.33,
    paddingTop: 6,
    paddingBottom: 18,
  },
  pageFooterLeft: {
    flexGrow: 0,
    flexDirection: "column",
    fontSize: 9,
    textAlign: "left",
  },
  pageFooterRight: {
    flexGrow: 1,
    fontSize: 9,
    textAlign: "right",
  },
});

export default styles;
