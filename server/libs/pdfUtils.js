"use strict";

const log = require("kth-node-log");

function profilerToLog(
  id,
  phase,
  actualTime,
  baseTime,
  startTime,
  commitTime,
  interactions
) {
  log.debug(
    "Profiler",
    id,
    "actualTime:",
    actualTime,
    "baseTime:",
    baseTime,
    "startTime:",
    startTime,
    "commitTime:",
    commitTime,
    "interactions:",
    interactions
  );
}

function timer(id, startTime) {
  return function endTimer() {
    log.debug("Timer:", id, Date.now() - startTime, "ms");
  };
}

module.exports = {
  profilerToLog,
  timer,
};
