// src/reducers/batches.test.js

import { expect } from 'chai'
import reducer from './batches'

describe('bactches reducer', () => {
  const initialState = []

  it('returns an empty array for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })
})
