import createPromise from '../../src/createPromise'

import appendScript from '../../src/appendScript'
jest.mock('../../src/appendScript')

describe('createPromise (options = {})', () => {
  beforeEach(() => {

  })

  it('default parameters for options', () => {
    appendScript.mockImplementation((opt, resolve) => {
      resolve()
    })

    return createPromise()
      .then(() => {
        // passed!
        expect(appendScript).toHaveBeenCalledWith({}, expect.any(Function), expect.any(Function))
      })
      .catch(() => {
        throw new Error('promise should not have failed!')
      })
  })

  it('can resolve', () => {
    appendScript.mockImplementation((opt, resolve) => {
      resolve()
    })

    const optionMock = { src: '//www.johnko.io' }
    return createPromise(optionMock)
      .then(() => {
        // passed!
        expect(appendScript).toHaveBeenCalledWith(optionMock, expect.any(Function), expect.any(Function))
      })
      .catch(() => {
        throw new Error('promise should not have failed!')
      })
  })

  it('can reject', () => {
    appendScript.mockImplementation((opt, resolve, reject) => {
      reject()
    })

    const optionMock = { src: '//www.johnko.io' }

    return createPromise(optionMock)
      .then(() => {
        throw new Error('promise should have failed!')
      })
      .catch(() => {
        expect(appendScript).toHaveBeenCalledWith(optionMock, expect.any(Function), expect.any(Function))
      })
  })
})