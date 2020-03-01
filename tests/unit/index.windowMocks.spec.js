import scriptLoader from '../../src/index'

import createPromise from '../../src/createPromise'
jest.mock('../../src/createPromise')

describe('scriptLoader with window spy', () => {
  beforeEach(() => {
    createPromise.mockClear()
  })

  afterEach(() => {
  })

  describe('window spy', () => {
    let windowSpy

    beforeEach(() => {
      windowSpy = jest.spyOn(global, 'window', 'get')
      windowSpy.mockImplementation(() => ({}))
    })

    afterEach(() => {
      windowSpy.mockClear()
    })

    it('fails if window is not defined', () => {
      windowSpy.mockImplementation(() => undefined)

      return scriptLoader()
        .catch(e => {
          expect(e).toBe('sorry bro client side only')
        })
    })

    it('fails when src is not set', () => {
      return scriptLoader()
        .catch(e => {
          expect(e).toBe('src must be set!')
        })
    })

    it('if dynamic script loader has been set', () => {
      windowSpy.mockImplementation(() => {
        return {
          dynamicScriptLoader: {
            'key': 'Promise!'
          }
        }
      })

      expect(scriptLoader({ src: 'key' })).toBe('Promise!')
    })
  })
})