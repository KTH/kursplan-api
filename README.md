# Welcome to kursplan-api 👋

![Version](https://img.shields.io/badge/version-3.0.0.beta-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-18-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Introduction

The course information project (KIP) is an initiative at KTH that was launched in 2018 to improve the quality and availability of information about KTH:s courses. The background to the project is, among other things, that it was difficult for the student to find information about the courses and even more difficult to compare information about several courses. The reason for the problems is scattered course information in several places and that there is no uniformity or assigned places for the course information. The project takes measures to consolidate course information into two locations and to present the information in a manner that is uniform for KTH. The student should find the right information about the course, depending on their needs. The result of the project is a public course site where the correct course information is collected and presented uniformly. Also, a tool is developed for teachers to enter and publish course information. Eventually, this will lead to the student making better decisions based on their needs, and it will also reduce the burden on teachers and administration regarding questions and support for the student.

Kursplan-api is a microservice to generate course syllabuses for ([kursinfo-web](https://github.com/KTH/kursinfo-web)), ([kursutveckling-web](https://github.com/KTH/kursutveckling-web)) and ([kurs-pm-web](https://github.com/KTH/kurs-pm-web)) It uses [Node.js](https://nodejs.org/), and is based on [https://github.com/KTH/node-api](node-api).

### 🏠 [Homepage](https://github.com/KTH/kursplan-api)

## Overview

Kursplan-api generates syllabuses from Kopps data. [Swagger](https://swagger.io/) is used for API documentation.

Syllabuses are generated in `HTML` or as `PDF`files.

This API is independent and will not break other projects but it is important remember it is logically connected to the bigger picture of course information.

### Related Projects

- [kursinfo-web](https://github.com/KTH/kursinfo-web)
- [kursutveckling-web](https://github.com/KTH/kursutveckling-web)
- [kurs-pm-web](https://github.com/KTH/kurs-pm-web)
- [node-api](https://github.com/KTH/node-api)
- [Swagger](https://swagger.io/)
- [React-pdf](https://react-pdf.org/)
- [html-react-parser](https://github.com/remarkablemark/html-react-parser)

## Prerequisites

- Node.js 18.0.0

### Secrets for Development

Secrets during local development are ALWAYS stored in a `.env`-file in the root of your project. This file should be in .gitignore.

```
API_KEYS_0=?name=kursinfo-web&apiKey=[generate a password for public pages]&scope=read
API_KEYS_1=?name=kurs-pm-web&apiKey=[generate a password for admin page]&scope=write&scope=read
# Replace PASSWORD with a strong password
REDIS_URI=REDIS_ADDRESS:REDIS_PORT,password=REDIS_PASSWORD,ssl=True,abortConnect=False
# Replace REDIS_ADDRESS, REDIS_PORT, and REDIS_PASSWORD
SERVICE_PUBLISH
# Default value is 'api/kursplan'
SERVER_SSL
# Default value is false
SERVER_PORT
# Default value is 3001
SERVER_CERT_FILE
# Default value is empty string, ''
SERVER_CERT_PASSPHRASE
# Default value is empty string, ''
LOGGING_LEVEL
# Default value is 'debug'
LOGGING_ACCESS_LOG
# Default value is 'true'
KOPPS_API_CACHE_EXPIRE_TIME
# Default value is 3600
KOPPS_URI
# Default value is 'https://api-r.referens.sys.kth.se/api/kopps/v2/?defaultTimeout=60000'
```

These settings are also available in an `env.in` file.

## For Development

### Install

```sh
npm install
```

### Usage

Start the service on [localhost:3001/api/kursplan/swagger](http://localhost:3001/api/kursplan/swagger).

```sh
npm run start-dev
```

## In Production

Secrets and docker-compose are located in cellus-registry.

## Monitor and Dashboards

### Application Status

[localhost:3001/api/kursplan/\_monitor](http://localhost:3001/api/kursplan/_monitor)

### Application Insights

To see more detailed behaviour in project, use `Application Insights`, e.g., `kursinfo-web-stage-application-insights-kthse`.

## Use 🐳

Copy `docker-compose.yml.in` to `docker-compose.yml` and make necessary changes, if any.

```sh
docker-compose up
```

## Deploy in Stage

The deployment process is described in [Build, release, deploy](https://confluence.sys.kth.se/confluence/x/aY3_Ag). Technical details, such as configuration, is described in [How to deploy your 🐳 application using Cellus-Registy](https://gita.sys.kth.se/Infosys/cellus-registry/blob/master/HOW-TO-DEPLOY.md) and [🔧 How To Configure Your Application For The Pipeline](https://gita.sys.kth.se/Infosys/cellus-registry/blob/master/HOW-TO-CONFIGURE.md).

### Edit secrets.env

```sh
ansible-vault edit secrets.env
```

Password find in gsv-key vault

### Configure secrets.env

```
API_KEYS_2=?name=kursplan&apiKey=[generate a password for public pages]&scope=write&scope=read
API_KEYS_1=?name=kursinfo&apiKey= [generate a password for public pages]&scope=write&scope=read
API_KEYS_0=?name=kursinfo-web&apiKey= [generate a password for public pages]&scope=write&scope=read
KURSPLAN_API_KEYS=?name=kursplan&apiKey=[generate a password for public pages]&scope=write&scope=read
REDIS_URI=REDIS_ADDRESS:REDIS_PORT,password=REDIS_PASSWORD,ssl=True,abortConnect=False
```

## PDF Generation

The application has an endpoint that generates a PDF syllabus. The PDF file is generated with [React-pdf](https://react-pdf.org/). Syllabus data in `HTML` will be parsed into `React` elements with [html-react-parser](https://github.com/remarkablemark/html-react-parser), before they are added to the document element tree.

`React`components are converted with [Babel](https://babeljs.io/) into`./components-dist/`.

### Syllabus Components

```sh
Syllabus
|-- SyllabusDocument
|   |-- SyllabusPages
|       |-- SyllabusHead
|       |-- SyllabusKeyInformation
|       |-- SyllabusBody
|       |-- SyllabusPageFooter
|-- SyllabusHtmlParser
|-- SyllabusStyles
```

#### Syllabus

Entry point component. Renders `SyllabusDocument` component.

#### SyllabusDocument

Renders wrapping `Document` component, and `SyllabusPages`.

#### SyllabusPages

Renders `Page` component containing the syllabus’s pages. Inside the `Page` `SyllabusHead`, `SyllabusKeyInformation`, and `SyllabusBody` components are rendered for the syllabus content, and a`SyllabusPageFooter` component for the syllabus’s footers.

#### SyllabusHead

Renders KTH logotype, syllabus heading, and such.

#### SyllabusKeyInformation

Renders syllabus key information.

#### SyllabusBody

Renders syllabus main content with `Section` components. Contains logic for determining which data to use for certain sections.

#### SyllabusPageFooter

Renders footer text and page numbers.

#### SyllabusHtmlParser

Parses `HTML` data into `React` elements. Called from `SyllabusBody`.

#### SyllabusStyles

Contains all styles for PDF components.

## Author

👤 **KTH**

- Website: https://kth.github.io/
- Github: [@KTH](https://github.com/KTH)
