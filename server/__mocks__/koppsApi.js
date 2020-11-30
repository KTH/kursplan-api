/* eslint-disable import/prefer-default-export */

const mockKoppsResponse = require('./kopps-response.json')

const getSyllabus = jest.fn(() => mockKoppsResponse).mockName('getSyllabus')

export { getSyllabus }
