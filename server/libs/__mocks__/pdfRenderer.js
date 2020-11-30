/* eslint-disable import/prefer-default-export */
const createPdf = jest
  .fn(() => {
    return {
      pipe: jest.fn(() => createPdf).mockName('pipe')
    }
  })
  .mockName('createPdf')

export { createPdf }
