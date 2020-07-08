"use strict";

const ReactPDF = require("@react-pdf/renderer");

const Syllabus = require("../components-dist/Syllabus").default;

async function createPdf(writeStream, syllabus, semester, language) {
  // eslint-disable-next-line no-console
  console.time("createPdf: ReactPDF.renderToStream");
  const doc = await ReactPDF.renderToStream(
    Syllabus({ syllabus, semester, language })
  );
  // eslint-disable-next-line no-console
  console.timeEnd("createPdf: ReactPDF.renderToStream");
  doc.pipe(writeStream);
}

module.exports = {
  createPdf,
};
