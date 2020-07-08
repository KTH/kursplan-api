import React, { Profiler } from "react";
import { View, Text, Image } from "@react-pdf/renderer";

// import parse from "./SyllabusHtmlParser";
import styles from "./SyllabusStyles";

const { profilerToLog } = require("../libs/pdfUtils");
import { logotypePath } from "../libs/pdfConstants";

const Section = () => {
  return <View />;
};

const SyllabusHead = ({ data }) => {
  const sections = data.sections || [];
  return <Image style={styles.logotype} src={logotypePath} />;
};

export default SyllabusHead;
