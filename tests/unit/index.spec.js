import scriptLoader from '../../src/index'

import createPromise from '../../src/createPromise'
jest.mock('../../src/createPromise')

describe('scriptLoader', () => {
  afterEach(() => {
    createPromise.mockClear()
  })

  it('default onLoad', () => {
    createPromise.mockImplementation(() => {
      return new Promise((resolve, reject) => resolve({}))
    })

    return scriptLoader({ src: 'key-onload' })
      .then(() => {
        expect(createPromise).toHaveBeenCalled()
      })
  })

  it('default onError', () => {
    createPromise.mockImplementation(() => {
      return new Promise((resolve, reject) => reject({}))
    })

    return scriptLoader({ src: 'key-onerror' })
      .then(() => {
        expect(createPromise).toHaveBeenCalled()
      })
  })

  it('onLoad method runs after script has been loaded', () => {
    const onLoad = jest.fn()
    const onError = jest.fn()

    createPromise.mockImplementation(() => {
      return new Promise((resolve, reject) => resolve({}))
    })

    return scriptLoader({ src: 'key-onload-success' }, onLoad, onError)
      .then(() => {
        expect(createPromise).toHaveBeenCalled()
        expect(onLoad).toHaveBeenCalled()
      })
  })

  it('onError runs on script load failure', () => {
    const onLoad = jest.fn()
    const onError = jest.fn()

    createPromise.mockImplementation(() => {
      return new Promise((resolve, reject) => reject({}))
    })

    return scriptLoader({ src: 'key-onerror-failure' }, onLoad, onError)
      .then(() => {
        expect(createPromise).toHaveBeenCalled()
        expect(onError).toHaveBeenCalled()
      })
  })
})