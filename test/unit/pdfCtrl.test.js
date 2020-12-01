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
  const res = {
    status: jest.fn().mockReturnValue(res).mockName('status'),
    type: jest.fn().mockReturnValue(res).mockName('type'),
    send: jest.fn().mockReturnValue(res).mockName('send'),
    set: jest.fn().mockReturnValue(res).mockName('set'),
    write: jest.fn().mockName('write'),
    on: jest.fn().mockName('on'),
    once: jest.fn().mockName('once'),
    end: jest.fn().mockName('end'),
    emit: jest.fn().mockName('emit'),
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
    expect(res.on).toHaveBeenCalled()
    done()
  })
})
