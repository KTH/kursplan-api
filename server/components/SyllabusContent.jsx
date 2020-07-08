import React, { Profiler } from "react";
import { View, Text } from "@react-pdf/renderer";

// import parse from "./SyllabusHtmlParser";
import styles from "./SyllabusStyles";

const { profilerToLog } = require("../libs/pdfUtils");

const Section = () => {
  return <View />;
};

const SyllabusContent = ({ syllabus }) => {
  const { course } = syllabus;
  return (
    <View style={styles.contentContainer}>
      <Profiler
        key={`profiler-syllabus-content`}
        id={`profiler-syllabus-content`}
        onRender={profilerToLog}
      >
        <Text>{course.recruitmentText}</Text>
      </Profiler>
      ))}
    </View>
  );
};

export default SyllabusContent;
