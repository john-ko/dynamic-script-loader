import appendScript from '../../src/appendScript'
import getNewScript from '../../src/getNewScript'
jest.mock('../../src/getNewScript')

describe('appendScript (options, success, failure)', () => {
  let script

  beforeEach(() => {
    script = document.createElement('script')
    getNewScript.mockImplementation(() => script)
  })

  afterEach(() => {
    // clear
    script = null
    document.head.innerHTML = ''
  })

  describe('options', () => {
    it('should pass options to getNewScript method', () => {
      const mockOptions = {
        src: '//www.github.com'
      }

      appendScript(mockOptions)

      expect(getNewScript).toHaveBeenCalledWith(mockOptions)
    })
  })

  describe('success / failure arguments', () => {
    it('should set success method to the script.onload method', () => {
      const success = jest.fn()
      appendScript({}, success, () => {})

      expect(document.head.children[0].onload).toBe(success)
    })

    it('should set failure method to the script.onerror method', () => {
      const failure = jest.fn()
      appendScript({}, () => {}, failure)

      expect(document.head.children[0].onerror).toBe(failure)
    })
  })
})