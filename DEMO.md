# DEMO

## README

### Overview

#### API:s

- Ladok Mellanlager (studadm-om-kursen-packages)

#### Related projects

- kursinfo-web
- kursutveckling-web
- kurs-pm-web
- studadm-om-kursen-packages
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
