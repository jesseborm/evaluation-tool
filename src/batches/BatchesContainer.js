// src/components/BatchesContainer.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'

import Title from '../components/Title'
import BatchItem from './BatchItem'
import removeBatch from '../actions/batches/remove'
import fetchBatches from '../actions/batches/fetch'
import subscribeToBatchesService from '../actions/batches/subscribe'
import CreateBatchButton from './CreateBatchButton'
import './BatchesContainer.css'


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
    return (
      <div>
        <BatchItem key={index} { ...batch }  />
        <FlatButton className="delete"
          label="Delete Batch"
          onClick={() => {this.props.removeBatch(batch._id)}}
          primary={true}
        />
      </div>
    )
  }

  render() {
    if (!this.props.signedIn) return null
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
}

const mapStateToProps = ({ batches, currentUser }) => ({
  batches,
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, {
  fetchBatches,
  subscribeToBatchesService,
  removeBatch
})(BatchesContainer)
