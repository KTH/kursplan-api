import { StyleSheet, Font } from "@react-pdf/renderer";

import { pageMeasurements, typography } from "../libs/pdfConstants";

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
Font.register({
  family: "Open Sans Italic",
  src: "server/fonts/OpenSans-Italic.ttf",
});
Font.register({ family: "Georgia", src: "server/fonts/Georgia.ttf" });
Font.register({
  family: "Georgia Italic",
  src: "server/fonts/Georgia-Italic.ttf",
});
Font.register({ family: "Georgia Bold", src: "server/fonts/Georgia-Bold.ttf" });

const { A4 } = pageMeasurements;

const styles = StyleSheet.create({
  logotype: { height: A4.logotype, width: A4.logotype },
  pages: {
    fontFamily: "Georgia",
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
  em: {
    fontFamily: "Georgia Bold",
  },
  b: {
    fontFamily: "Georgia Bold",
  },
  strong: {
    fontFamily: "Georgia Bold",
  },
  i: {
    fontFamily: "Georgia Italic",
  },
  ul: { paddingLeft: 12 },
  ol: { paddingLeft: 18 },
  ulItem: { textIndent: -9, marginBottom: 6 },
  olItem: { textIndent: -18, marginBottom: 6 },

  subHeader: {
    fontSize: 18,
    color: "#808080",
    marginTop: 30,
    borderBottomColor: "#808080",
    borderBottomWidth: 1.33,
    marginBottom: 12,
  },
  bodyText: {
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
