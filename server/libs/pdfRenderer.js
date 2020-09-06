"use strict";

const ReactPDF = require("@react-pdf/renderer");

const Syllabus = require("../components-dist/Syllabus").default;

async function createPdf(syllabus, semester, language) {
  return ReactPDF.renderToStream(Syllabus({ syllabus, semester, language }));
}

module.exports = {
  createPdf,
};
