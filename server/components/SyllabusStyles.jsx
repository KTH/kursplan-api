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
    fontSize: 12,
    paddingHorizontal: A4.pageMargin,
    paddingVertical: A4.pageMargin,
  },
  content: { },
  footer: { 
    position:'absolute', 
    bottom: 0, 
    left: A4.pageMargin, 
    right: A4.pageMargin, 
  },
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
  pageFooter: {
    fontFamily: "Open Sans",
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: "#808080",
    borderTopWidth: 1.33,
    paddingTop: 6,
    paddingBottom: 18,
  },
  subHeader: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 12,
  },
  disclaimer: {
    marginTop: 24,
    marginBottom: 12,
  },
});

export default styles;
