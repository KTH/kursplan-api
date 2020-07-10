import { StyleSheet } from "@react-pdf/renderer";

import { pageMeasurements, typography } from "../libs/pdfConstants";

const { A4 } = pageMeasurements;

const styles = StyleSheet.create({
  bodyContainer: { fontFamily: "Georgia", fontSize: "12pt" },
  logotype: { height: A4.logotype, width: A4.logotype },
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
});

export default styles;
