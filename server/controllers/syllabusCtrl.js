"use strict";

/**
 * Syllabus controller is getting syllabus information using kopps api and creates
 * html and configurations for pdf
 */

const co = require("co");
const generateHTML = require("../libs/generareHTML");
const redis = require("kth-node-redis");
const log = require("kth-node-log");

module.exports = {
  getSyllabus: co.wrap(_getSyllabus),
};

const getSyllabus = require("../koppsApi").getSyllabus;

async function _getSyllabus(req, res, next) {
  const courseCode = req.params.courseCode;
  const semester = req.params.semester;
  const language =
    req.params.language.length === 2 ? req.params.language : "sv";
  try {
    const syllabus = await getSyllabus(courseCode, semester, language);
    const syllabusHTML = generateHTML(syllabus, semester, language);

    const pdfConfig = {
      format: "A4",
      orientation: "portrait",
      border: "0",
      paginationOffset: 1, // Override the initial pagination number
      header: {
        height: "15mm",
        contents: '<span style="color:white;display:none;"></span>',
      },
      footer: {
        height: "27mm",
        contents: {
          default: `<div class="row " style="max-width:520px;">
          <div class="pdfFooterText col-12" style="text-align: left;"> ${
            syllabusHTML.footerText
          }. 
              <span class="" style="text-align:right; float:right"> ${
                language === "en" ? "Page" : "Sida"
              } {{page}} ${
            language === "en" ? "of  " : "av  "
          } {{pages}}</span></div> 
            </div> `,
        },
      },
      zoomFactor: "1",
      base: "https://www.kth.se",
      type: "pdf",
      phantomPath: "/usr/bin/phantomjs",
      title: `${syllabusHTML.footerText}`,
      locale: language,
      lang: language,
      timeout: 30000,
    };

    res.setHeader("Content-Type", "text/html");
    res.send({ syllabusHTML, pdfConfig });
  } catch (err) {
    next(err);
  }
}
