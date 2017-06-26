// src/reducers/recipes.test.js

import { expect } from 'chai'
import reducer from './recipes'

describe('recipes reducer', () => {
  const initialState = []

  it('returns an empty array for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })
})
