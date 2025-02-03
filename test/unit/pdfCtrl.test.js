const { TextEncoder, TextDecoder } = require('util')

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}

jest.mock('@kth/log', () => {
  return {
    init: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  }
})

jest.mock('../../server/ladokApi', () => ({
  getLadokSyllabus: jest.fn(() =>
    Promise.resolve({
      course: {
        kod: 'ID1354',
        benamning: {
          sv: 'Applikationer för internet, grundkurs',
          en: 'Internet Applications',
        },
        omfattning: { number: '7.5', formattedWithUnit: '7,5 hp' },
        betygsskala: 'A, B, C, D, E, FX, F',
        nivainomstudieordning:  {
          id: '22',
          code: '2007GKURS',
          sv: 'Kurs, grundnivå',
          en: 'Course, First-cycle',
          creditsUnit: { code: 'HP', sv: 'Högskolepoäng', en: 'Credits' },
          level: { code: '1', sv: 'Grundnivå', en: 'First cycle' }
        },
        huvudomraden: [[Object], [Object]],
        overgangsbestammelser: undefined,
      },
      kursplan: {
        giltigfrom: 'VT2013',
        versionsnummer: '2',
        undervisningssprak:
          '<p>Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.</p>',
        larandemal:
          '<p><strong>Efter genomgången kurs skall deltagarna kunna:</strong></p>\n' +
          '<ul>\n' +
          '<li>Förklara och utföra grundläggande design av webbplats med hjälp av HTML, XHTML, CSS</li>\n' +
          '<li>Förklara och tillämpa klient-server-arkitektur för webbapplikationsutveckling med bl a AJAX och JSON</li>\n' +
          '<li>Förklara och utföra grundläggande&nbsp;programmering&nbsp;av&nbsp;klientsidan med DHTML, XML, CSS, JavaScript, SQL och DOM</li>\n' +
          '<li>Förklara och utföra grundläggande programmering av serversidan med PHP, XML, SQL</li>\n' +
          '<li>Lära sig själva om Internet-teknik och komponenter på egen hand</li>\n' +
          '<li>Tillämpa grundläggande GUI-principer och säker kommunikation med HTTPS</li>\n' +
          '</ul>',
        kursinnehall:
          '<ul>\n' +
          '<li>Användning av mjukvara, språk och tekniker för utveckling av applikationer på internet (webbapplikationer)</li>\n' +
          '<li>Mjukvarudesign, gränssnittsdesign, och kodutveckling för klientsidan och serversidan i webbapplikationer</li>\n' +
          '<li>Introduktion till HTML / XHTML</li>\n' +
          '<li>Cascading Style Sheets</li>\n' +
          '<li>Grunderna i Javascript</li>\n' +
          '<li>JavaScript och HTML-dokument</li>\n' +
          '<li>Dynamiska dokument med JavaScript</li>\n' +
          '<li>Introduktion till XML</li>\n' +
          '<li>Introduktion till Flash</li>\n' +
          '<li>Introduktion till PHP</li>\n' +
          '<li>Introduktion till Ajax</li>\n' +
          '<li>Java Web Software</li>\n' +
          '<li>Introduktion till ASP.NET (C #)</li>\n' +
          '<li>Databasåtkomst via webben</li>\n' +
          '</ul>\n' +
          '<p>(Introduktion till Ruby)</p>\n' +
          '<p>(Introduktion till Rails)</p>',
        etisktforhallandesatt:
          '<ul>\n' +
          '<li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li>\n' +
          '<li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li>\n' +
          '<li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li>\n' +
          '</ul>',
        faststallande: '<p>Kursplan för ID1354 gäller från och med VT13</p>',
        examination:
          '<ul>\n' +
          '<li>TEN1 - Tentamen, 2,5 hp, betygsskala: A, B, C, D, E, FX, F</li>\n' +
          '<li>LAB1 - Laboration, 5,0 hp, betygsskala: P, F</li>\n' +
          '</ul>',
        kommentartillexamination:
          '<p>Examinator beslutar, baserat på rekommendation från KTH:s handläggare av stöd till studenter med funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning.</p>\n' +
          '<p>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.</p>\n' +
          '<p>När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.</p>\n' +
          '<p>Examination baseras på laborationsuppgifter (LAB1, P/F) och</p>\n' +
          '<p>skriftlig tentamen &nbsp;(TEN1, A-F)</p>\n' +
          '<p>**Betygsskala:<br />\n' +
          '**LAB1, 5 hp, läxor / projekt (U / G) + TEN1, 2,5 hp (tentamen) (AF)</p>\n' +
          '<p>**Bonussystem:<br />\n' +
          '**Projekt och hemarbete som levereras och presenteras i tid och blir godkänt ger dig 1 bonuspoäng som kommer att läggas till ditt tentamensbetyg.</p>\n' +
          '<p>**Tentamen:<br />\n' +
          '**Det kommer att finnas en skriftlig tentamen som testar din teoretiska såväl som analytiska kunskap om kursinnehållet.</p>\n' +
          '<p><strong>Labs</strong>:<br />\n' +
          'Det kommer att finnas en uppsättning av hemuppgifter och ett slutprojekt som utgör den praktiska delen av kursen.</p>',
        ovrigakravforslutbetyg: '<p>Kursmomenten LAB1 och TEN1 måste vara godkända.</p>',
        kurslitteratur:
          '<p><strong>Textbook for the course:</strong><br />\n' +
          'Programming the World Wide Web, 7/E<br />\n' +
          'Robert W. Sebesta, University of Colorado, Colorado Springs<br />\n' +
          'ISBN-10: 0132665816 ISBN-13: 9780132665810<br />\n' +
          '©2013 Addison-Wesley Paper, 768 pp, Published 03/14/2012</p>\n' +
          '<p><strong>Optional reading (not in curriculum):</strong><br />\n' +
          'The following sources are useful to obtain a deeper understanding of the subject.<br />\n' +
          'Robert Eckstein, Stephen Spainhour, Webmaster in a nutshell, 3rd Edition ,Oreilly Media<br />\n' +
          'comment: a very good desktop quick reference for some titles taught in the course but unfortunately does not cover all topics.</p>',
        kursupplagg: '<p>Föreläsningar, laborationer, slutprojekt och tentamen.</p>',
        sarskildbehorighet: '<p>ID1301 eller ID1018</p>',
        gammalutrustning: '<p>LapTop</p>',
      },
    })
  ), // Mock the function to return null
}))

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
