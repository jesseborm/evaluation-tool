import React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import Title from './Title'

chai.use(chaiEnzyme())

describe('<Title />', () => {
  const title = shallow(<Title content="Am I here?" />)

  it('is an h1', () => {
    expect(title).to.have.tagName('h1')
  })

  it('renders the content prop', () => {
    expect(title).to.have.text('Am I here?')
  })

  it('can handle different content props', () => {
    const title = shallow(<Title content="I am soooo different!" />)

    expect(title).to.have.text('I am soooo different!')
  })
})
