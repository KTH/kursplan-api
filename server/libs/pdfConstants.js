"use strict";

const logotypePath = "server/img/KTH_logo_blue.png";

const pageMeasurements = {
  A4: {
    logotype: "26mm",
    pageMargin: "20mm",
  },
};

const EMPTY = ["This course does not belong to any Main field of study.", "Denna kurs tillhör inget huvudområde."];
const NOT_AVAILABLE = "N/A";
const LANGUAGE = { en: "English", sv: "Svenska" };

module.exports = {
  logotypePath,
  pageMeasurements,
  EMPTY,
  NOT_AVAILABLE,
  LANGUAGE,
};
