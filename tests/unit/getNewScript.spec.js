import getNewScript from '../../src/getNewScript'

describe('getNewScript (options = {})', () => {
  let script = null

  beforeEach(() => {
    script = null
  })

  describe('async option', () => {
    xit('sets async to true by default', () => {
      script = getNewScript()

      const boolean = script.getAttribute('async')

      expect(boolean).toBe('true')
    })

    it('sets async to false only if false is passed in', () => {
      script = getNewScript({ async: false })
      const boolean = script.getAttribute('async')

      expect(boolean).toBe(null)
    })
  })

  describe('defer option', () => {
    it('sets defer to true by default', () => {
      script = getNewScript()

      const boolean = script.getAttribute('defer')

      expect(boolean).toBe('true')
    })

    it('sets defer to false only if false is passed in', () => {
      script = getNewScript({ defer: false })
      const boolean = script.getAttribute('defer')

      expect(boolean).toBe(null)
    })
  })

  describe('options', () => {
    it('sets whatever options you pass in', () => {
      script = getNewScript({
        defer: false,
        src: '//www.example.com/cdn.js',
        crossorigin: 'anonymous',
      })

      const type = script.getAttribute('type')
      const async = script.getAttribute('async')
      const defer = script.getAttribute('defer')
      const src = script.getAttribute('src')
      const crossorigin = script.getAttribute('crossorigin')

      expect(type).toBe('text/javascript')
      expect(async).toBe(null)
      expect(defer).toBe(null)
      expect(src).toBe('//www.example.com/cdn.js')
      expect(crossorigin).toBe('anonymous')
    })
  })
})