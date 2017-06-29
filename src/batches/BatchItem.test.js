// src/components/BatchItem.test.js
import React from 'react'
import chai, { expect } from 'chai'
import spies from 'chai-spies'
import { render } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import { BatchItem } from './BatchItem'

chai.use(chaiEnzyme())
chai.use(spies)

const batch = {
  batchNumber: '11',
  starts: new Date(2017, 05, 15), //string and then with time T
  ends: new Date(2017, 07, 12),
  students: [
  {
    fullName: 'Han',
    picture: 'https://s-media-cache-ak0.pinimg.com/736x/34/ba/bc/34babc4956f8e334c3036747d8b8a3dc--monsters-university-disney-characters.jpg',
    evaluation: {
      date: new Date(2017, 05, 15),
      color: "green",
      remark: "Excellent"
    }
  }
  ]
}

describe('<BatchItem />', () => {
  // const toggleLike = chai.spy()
  // const container = render(<BatchItem { ...batch } toggleLike={toggleLike} />)

  it('is wrapped in a article tag with class name "batch"', () => {
    expect(container).to.have.tagName('article')
    expect(container).to.have.className('batch')
  })

  it('contains the batchNumber of the batch', () => {
    expect(container.find('h1')).to.have.text(batch.batchNumber)
  })
  //
  // it('contains the name of the first student of the batch', () => {
  //   expect(container.find('h1')).to.have.text(batch.batchNumber)
  // })
})
