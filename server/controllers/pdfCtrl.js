"use strict";

const log = require("kth-node-log");

const { createPdf } = require("../libs/pdfRenderer.js");

async function getSyllabus(req, res, next) {
  const { courseCode, semester } = req.params;
  const language =
    req.params.language.length === 2 ? req.params.language : "sv";
  const { download } = req.query;
  log.debug(
    "getSyllabus: Received request for PDF with courseCode: ",
    courseCode,
    ", semester: ",
    semester,
    ", language: ",
    language
  );
  try {
    const contentDisposition = download === "true" ? "attachment" : "inline";
    const fileName = `${courseCode}-${semester}`;
    res.type("application/pdf");
    res.set(
      "Content-Disposition",
      `${contentDisposition}; filename=${fileName}.pdf`
    );
    // eslint-disable-next-line no-console
    console.time("getSyllabus: createPdf");
    await createPdf(res);
    // eslint-disable-next-line no-console
    console.timeEnd("getSyllabus: createPdf");
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
  getSyllabus,
};
