import { STATUS } from '../../src/index'
import { expect } from 'chai'

describe('STATUS', () => {
  it('status should contain 3 enums', () => {
    const count = Object.keys(STATUS).length

    expect(count).to.be.equal(3)
  })

  it('FAILED is set to 0', () => {
    expect(STATUS.FAILED).to.be.equal(0)
  })

  it('LOADING is set to 1', () => {
    expect(STATUS.LOADING).to.be.equal(1)
  })

  it('LOADED is set to 2', () => {
    expect(STATUS.LOADED).to.be.equal(2)
  })
})