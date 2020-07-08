import React, { Profiler } from "react";
import { View, Text } from "@react-pdf/renderer";

// import parse from "./SyllabusHtmlParser";
import styles from "./SyllabusStyles";

const { profilerToLog } = require("../libs/pdfUtils");

const Section = () => {
  return <View />;
};

const SyllabusContent = ({ data }) => {
  const sections = data.sections || [];
  return (
    <View style={styles.contentContainer}>
      {sections.map((section) => (
        <Profiler
          key={`profiler-${section.id}`}
          id={section.id}
          onRender={profilerToLog}
        >
          <Section key={section.id} section={section} />
        </Profiler>
      ))}
    </View>
  );
};

export default SyllabusContent;
