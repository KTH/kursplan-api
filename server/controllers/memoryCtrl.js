'use strict'

const v8 = require('node:v8'); 
const process = require('node:process');

async function _getMemoryUsage(req, res, next) {
  const { format, type } = req.query
  
  let data;
  if (type==='v8') {
    data = v8.getHeapStatistics()
  } else {
    data = process.memoryUsage()
  }

  if(format === 'json'){
    return res.send(data)
  } else {
    const dataStr = Object.values(data).join('\t')
    return res.send(dataStr)
  }
}

module.exports = {
    getMemoryUsage: _getMemoryUsage,
}
