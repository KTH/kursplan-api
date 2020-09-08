"use strict";

const log = require("kth-node-log");

const getSyllabus = require("../koppsApi").getSyllabus;
const { createPdf } = require("../libs/pdfRenderer.js");
const PDFDocument = require("@react-pdf/pdfkit").default;

async function _getSyllabus(req, res, next) {
  const { courseCode, semester } = req.params;
  const language =
    req.params.language.length === 2 ? req.params.language : "sv";
  const { documentName, download } = req.query;
  const fileName = documentName || `${courseCode}-${semester}`;
  log.debug(
    "getSyllabus: Received request for PDF with courseCode: ",
    courseCode,
    ", semester: ",
    semester,
    ", language: ",
    language
  );
  const syllabus = await getSyllabus(courseCode, semester, language);
  try {
    if (syllabus == null) {
      log.info(
        `Could not get a syllabus for ${courseCode}, ${semester}, ${language}.`
      );
      throw `NoSyllabusException`;
    }

    const contentDisposition = download === "true" ? "attachment" : "inline";
    res.type("application/pdf");
    res.set(
      "Content-Disposition",
      `${contentDisposition}; filename=${fileName}.pdf`
    );
    // const pdf = await createPdf(syllabus, semester, language);
    const pdf = new PDFDocument({ autoFirstPage: false, lang: language });
    pdf.addPage();
    const { course } = syllabus;
    const { title, recruitmentText } = course || {};
    pdf.fontSize(24);
    pdf.text(title, { width: 410, align: "center" });
    pdf.fontSize(16);
    pdf.text(recruitmentText, {
      columns: 3,
      columnGap: 15,
      height: 100,
      width: 465,
      align: "justify",
    });
    pdf.pipe(res);
    pdf.end();

    log.debug(
      "getSyllabus: Responded to request for PDF with courseCode: ",
      courseCode,
      ", semester: ",
      semester,
      ", language: ",
      language
    );
  } catch (err) {
    log.error("getSyllabus: Failed request for PDF, error:", { err });
    next(err);
  }
}

module.exports = {
  getSyllabus: _getSyllabus,
};
