import React from "react";
import { View, Text, Image } from "@react-pdf/renderer";

// import parse from "./SyllabusHtmlParser";
import styles from "./SyllabusStyles";

import { logotypePath } from "../libs/pdfConstants";

const formatCredits = (credits, creditUnitAbbr, language) => {
  const localeCredits =
    language === "sv" ? credits.toString().replace(".", ",") : credits;
  const creditUnit = language === "sv" ? creditUnitAbbr : "credits";
  return `${localeCredits} ${creditUnit}`;
};

const englishTranslationText = (language) =>
  language === "en"
    ? "This is a translation of the Swedish, legally binding, course syllabus."
    : "";

const SyllabusHead = ({ syllabus, language }) => {
  const { course } = syllabus;
  const { courseCode, title, credits, creditUnitAbbr, titleOther } = course;
  const creditsLabel = formatCredits(credits, creditUnitAbbr, language);
  const translationLabel = englishTranslationText(language);

  return (
    <View>
      <Image style={styles.logotype} src={logotypePath} />
      <Text style={styles.h1}>{`${courseCode} ${title} ${creditsLabel}`}</Text>
      <Text style={styles.h2}>{`${titleOther}`}</Text>
      <Text style={styles.infoText}>{`${translationLabel}`}</Text>
    </View>
  );
};

export default SyllabusHead;
