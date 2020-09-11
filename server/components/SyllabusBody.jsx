import React, { Fragment } from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "./SyllabusStyles";
import parse from "./SyllabusHtmlParser";

import i18n from "../../i18n";

// Copied logic from generareHTML
const getExamObject = (dataObject, grades, courseCredits, language = 0) => {
  let examString = "";
  if (dataObject.length > 0) {
    for (let exam of dataObject) {
      if (exam.credits) {
        //* * Adding a decimal if it's missing in credits **/
        exam.credits =
          exam.credits !== "" && exam.credits.toString().indexOf(".") < 0
            ? exam.credits + ".0"
            : exam.credits;
      } else {
        exam.credits = "-";
      }

      examString += `<li>${exam.examCode} - 
                        ${exam.title},
                        ${
                          language === 0
                            ? exam.credits
                            : exam.credits.toString().replace(".", ",")
                        } ${language === 0 ? "credits" : courseCredits},  
                        ${i18n.messages[
                          language
                        ].courseInformation.course_grade_label.toLowerCase()}: ${
        grades[exam.gradeScaleCode]
      }             
                        </li>`;
    }
  }
  return examString;
};

const getLiterature = ({ literature, literatureComment }) => {
  let literatureContent = "";
  literatureContent += literature || "";
  literatureContent += literatureComment || "";
  return literatureContent;
};

// Copied logic from generareHTML
const sectionData = (syllabus, activeSyllabus, languageIndex) =>
  activeSyllabus
    ? {
        course_language: activeSyllabus.courseSyllabus.languageOfInstruction,
        course_goals: activeSyllabus.courseSyllabus.goals || "",
        course_content: activeSyllabus.courseSyllabus.content || "",
        course_disposition: activeSyllabus.courseSyllabus.disposition || "",
        course_eligibility: activeSyllabus.courseSyllabus.eligibility || "",
        course_literature: getLiterature(activeSyllabus.courseSyllabus),
        course_required_equipment:
          activeSyllabus.courseSyllabus.requiredEquipment || "",
        course_examination: getExamObject(
          syllabus.examinationSets[Object.keys(syllabus.examinationSets)[0]]
            .examinationRounds,
          syllabus.formattedGradeScales,
          syllabus.course.creditUnitAbbr,
          languageIndex
        ),
        course_examination_comments:
          activeSyllabus.courseSyllabus.examComments || "",
        course_requirments_for_final_grade:
          activeSyllabus.courseSyllabus.reqsForFinalGrade || "",
        course_transitional_reg:
          activeSyllabus.courseSyllabus.transitionalRegulations || "",
        course_ethical: activeSyllabus.courseSyllabus.ethicalApproach || "",
        course_additional_regulations:
          activeSyllabus.courseSyllabus.additionalRegulations || "",
      }
    : {};

const renderSections = (syllabus, activeSyllabus, languageIndex) => {
  const sectionsContent = sectionData(syllabus, activeSyllabus, languageIndex);
  return Object.entries(sectionsContent).map(([id, content]) => (
    <Section key={id} id={id} content={content} languageIndex={languageIndex} />
  ));
};

const Section = ({ id, content, languageIndex }) => {
  if (
    !content &&
    id !== "course_eligibility" &&
    id !== "course_goals" &&
    id !== "course_content" &&
    id !== "course_examination"
  ) {
    return null;
  }

  const sectionHeader = i18n.messages[languageIndex].courseInformation[id];
  const sectionContent = content;
  return (
    <View>
      {sectionHeader ? (
        <Text style={styles.h2}>{sectionHeader}</Text>
      ) : (
        <Fragment />
      )}
      {sectionContent ? (
        <View style={styles.bodyText}>{parse(sectionContent)}</View>
      ) : (
        <Fragment />
      )}
    </View>
  );
};

const SyllabusBody = ({ syllabus, activeSyllabus, language }) => {
  const { course } = syllabus;
  const languageIndex = language === "en" ? 0 : 1;
  const sections = renderSections(syllabus, activeSyllabus, languageIndex);
  return <View>{sections}</View>;
};

export default SyllabusBody;
