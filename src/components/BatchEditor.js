// src/components/BatchEditor.js
import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import toMarkdown from 'to-markdown'
import DatePicker from 'material-ui/DatePicker'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import createBatch from '../actions/batches/create'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './BatchEditor.css'


class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    // const { batch, start, ends } = props
    const { batchNumber, starts, ends } = props

    this.state = {
      batchNumber, starts, ends, errors: {},
    }

    this.state = {
      batchNumber,
      starts,
      ends,
      errors: {},
    }
  }

  componentWillReceiveProps(newProps) {
    const { replace, signedIn, showError } = newProps
    if (!signedIn) {
      showError('You need to be signed up to create batches!')
      replace('/sign-up')
    }
  }

  updateBatchNumber(event) {
    this.setState({
      batchNumber: this.refs.batchNumber.value
    })
  }


  updateStartDate(event, date) {
    this.setState({
      starts: this.date
    })
    console.log("start date:::" + date);
  }

  updateEndDate(event, date) {
    this.setState({
      ends: this.date
    })
    console.log("end date:::" + date);
  }



  validate(batch) {
    const { batchNumber, starts, ends } = batch

    let errors = {}
    if (!batchNumber || batchNumber === '') errors.batchNumber = 'Please enter batchNumber'

    // #FIXME // When selecting a date, throws date errors when clicking save.
    // if (!starts || starts === '') errors.starts = 'Please enter start date'
    // if (!ends || ends === '') errors.ends = 'Please enter end date'
    // if (starts >= ends) errors.dates = 'End date must come after start date'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveBatch() {
    const {
      batchNumber,
      starts,
      ends,
    } = this.state

    const batch = {
      batchNumber,
      starts,
      ends,
    }

    if (this.validate(batch)) {
      this.props.createBatch(batch)
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="text"
          ref="batchNumber"
          className="batchNumber"
          placeholder="batch number"
          defaultValue={this.state.batchNumber}
          onChange={this.updateBatchNumber.bind(this)}
          onKeyDown={this.updateBatchNumber.bind(this)} />

        { errors.batchNumber && <p className="error">{ errors.batchNumber }</p> }

        <DatePicker
          hintText="Click to select start date"
          onChange={this.updateStartDate.bind(this)}
        />

        {/* { errors.starts && <p className="error">{ errors.starts }</p> } */}

        <DatePicker
          hintText="Click to select end date"
          onChange={this.updateEndDate.bind(this)}
        />

        {/* { errors.ends && <p className="error">{ errors.ends }</p> } */}
        {/* { errors.dates && <p className="error">{ errors.dates }</p> } */}

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, { createBatch, replace, showError })(BatchEditor)
