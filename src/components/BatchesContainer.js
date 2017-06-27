// src/components/BatchesContainer.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../components/Title'
import BatchItem from './BatchItem'

import './BatchesContainer.css'
import fetchBatches from '../actions/batches/fetch'
import subscribeToBatchesService from '../actions/batches/subscribe'
import CreateBatchButton from './CreateBatchButton'

export class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.array.isRequired,
    fetchBatches: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToBatchesService()
  }

  renderBatch(batch, index) {
    return <BatchItem key={index} { ...batch }  />
  }

  render() {
    if (this.props.signedIn) {
      return(
        <div className="batches wrapper">
          <header>
            <Title content="All Batches" />
            <CreateBatchButton />
          </header>

          <main>
            { this.props.batches.map(this.renderBatch.bind(this)) }
          </main>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({
  batches,
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, {
  fetchBatches, subscribeToBatchesService
})(BatchesContainer)
