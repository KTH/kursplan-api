# DEMO

## README

### Overview

#### API:s

- Kopps (syllabuses)

#### Related projects

- kursinfo-web
- kursutveckling-web
- kurs-pm-web
- node-api
- Swagger
- React-pdf
- html-react-parser

#### Paths

- /v1/syllabus/:courseCode/:semester/:language
- Swagger http://localhost:3003/api/kursplan/swagger/?url=/api/kursplan/swagger.json#/v1/getSyllabusByCourseCode (5678)

#### Components

Syllabus
|-- SyllabusDocument
|   |-- SyllabusPages
|       |-- SyllabusHead
|       |-- SyllabusKeyInformation
|       |-- SyllabusBody
|       |-- SyllabusPageFooter
|-- SyllabusHtmlParser
|-- SyllabusStyles
