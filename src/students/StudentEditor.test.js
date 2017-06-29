// src/students/StudentEditor.test.js
import React from 'react'
import chai, { expect } from 'chai'
import spies from 'chai-spies'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'

import { StudentEditor } from './StudentEditor'
import createBatch from '../actions/batches/create'
import batches from '../seeds/batches'

chai.use(chaiEnzyme())
chai.use(spies)

describe('StudentEditor', () => {
  const fetchBatches = chai.spy()
  const container = shallow(
    <BatchesContainer
      batches={batches}
      fetchBatches={fetchBatches} />
  )

  it('is wrapped in a div with class name "batches"', () => {
    expect(container).to.have.className('wrapper')
    expect(container).to.have.className('batches')
  })

  it('contains a Title', () => {
    expect(container).to.have.descendants(Title)
  })

  it('sets the Title to "All Batches"', () => {
    expect(container).to.contain(<Title content="All Batches" />)
  })

  it('renders all batches as a BatchItem', () => {
    expect(container).to.have.exactly(batches.length).descendants(BatchItem)
  })

  it('calls createBatch when clicking save button', () => {
    fetchBatches.reset()

    shallow(
      <BatchesContainer
        batches={batches}
        fetchBatches={fetchBatches} />)

    expect(fetchBatches).to.have.been.called.exactly.once()
  })
})



describe('Adding a student to a batch', () => {
  const createBatch = chai.spy()

  it('calls the createBatch', () => {
    expect()
  })

  it('shows the new student on the batch', () => {
    expect()
  })
})
