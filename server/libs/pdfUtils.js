"use strict";

const log = require("kth-node-log");

function timer(id, startTime) {
  return function endTimer() {
    log.debug("Timer:", id, Date.now() - startTime, "ms");
  };
}

module.exports = {
  timer,
};
