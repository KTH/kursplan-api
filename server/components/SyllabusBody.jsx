import React, { Profiler } from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "./SyllabusStyles";
import parse from "./SyllabusHtmlParser";

import i18n from "../../i18n";
import profilerToLog from "../libs/pdfUtils";

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

const getLiterature = ({ literature, literatureComment }) =>
  literature ? literature : literatureComment;

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
  console.log("sectionsContent", sectionsContent);
  return Object.entries(sectionsContent).map(([id, content]) => (
    <Section id={id} content={content} languageIndex={languageIndex} />
  ));
};

const Section = ({ id, content, languageIndex }) => {
  if (!content) return null;
  const sectionHeader = i18n.messages[languageIndex].courseInformation[id];
  const sectionContent = content; // TODO: Parse HTML
  return (
    <View>
      <Text style={styles.h2}>{sectionHeader}</Text>
      <Text style={styles.bodyText}>{parse(sectionContent)}</Text>
    </View>
  );
};

const SyllabusBody = ({ syllabus, activeSyllabus, language }) => {
  const { course } = syllabus;
  const languageIndex = language === "en" ? 0 : 1;
  const sections = renderSections(syllabus, activeSyllabus, languageIndex);
  return (
    <View style={styles.bodyContainer}>
      <Profiler
        key={`profiler-syllabus-body`}
        id={`profiler-syllabus-body`}
        onRender={profilerToLog}
      >
        {sections}
      </Profiler>
    </View>
  );
};

export default SyllabusBody;
