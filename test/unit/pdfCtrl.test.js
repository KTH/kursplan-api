const { PassThrough } = require('stream')

jest.mock('kth-node-log', () => {
  return {
    init: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn()
  }
})

jest.mock('../../server/koppsApi')

function buildReq(overrides = {}) {
  const req = {
    headers: { accept: 'application/json' },
    body: {},
    params: {},
    query: {},
    ...overrides
  }
  return req
}

function buildRes(overrides = {}) {
  const passThrough = new PassThrough()
  const res = {
    status: jest.fn(() => res).mockName('status'),
    type: jest.fn(() => res).mockName('type'),
    send: jest.fn(() => res).mockName('send'),
    set: jest.fn(() => res).mockName('set'),
    write: (data) => {
      passThrough.write(data)
    },
    on: passThrough.on,
    once: passThrough.once,
    end: passThrough.end,
    emit: passThrough.emit,
    ...overrides
  }
  return res
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next')
}

describe('Test functions of pdfCtrl.js', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('path getSyllabus responds', async (done) => {
    const courseCode = ''
    const semester = ''
    const language = ''
    const documentName = ''
    const download = ''

    const { getSyllabus } = require('../../server/controllers/pdfCtrl')
    const req = buildReq({
      params: { courseCode, semester, language },
      query: { documentName, download }
    })
    const res = buildRes()
    const next = buildNext()

    await getSyllabus(req, res, next)
    done()
  })
})
