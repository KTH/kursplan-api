const { TextEncoder, TextDecoder } = require('util');

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

jest.mock('@kth/log', () => {
  return {
    init: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  }
})

jest.mock('../../server/koppsApi')

function buildReq(overrides = {}) {
  const req = {
    headers: { accept: 'application/json' },
    body: {},
    params: {},
    query: {},
    ...overrides,
  }
  return req
}

function buildRes(overrides = {}) {
  const res = {}
  const status = jest.fn().mockReturnValue(res).mockName('status')
  const type = jest.fn().mockReturnValue(res).mockName('type')
  const send = jest.fn().mockReturnValue(res).mockName('send')
  const set = jest.fn().mockReturnValue(res).mockName('set')
  res.status = status
  res.type = type
  res.send = send
  res.set = set
  res.write = jest.fn().mockName('write')
  res.on = jest.fn().mockName('on')
  res.once = jest.fn().mockName('once')
  res.end = jest.fn().mockName('end')
  res.emit = jest.fn().mockName('emit')
  return { ...res, ...overrides }
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next')
}

describe('Test functions of pdfCtrl.js', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('path getSyllabus responds', async () => {
    const courseCode = ''
    const semester = ''
    const language = ''
    const documentName = ''
    const download = ''

    const { getSyllabus } = require('../../server/controllers/pdfCtrl')
    const req = buildReq({
      params: { courseCode, semester, language },
      query: { documentName, download },
    })
    const res = buildRes()
    const next = buildNext()

    await getSyllabus(req, res, next)
    expect(res.on).toHaveBeenCalled()
  })
})
