import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import fetchBatches from '../actions/batches/fetch'
import Title from '../components/Title'
import '../batches/BatchItem.css'

export class showBatch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    starts: PropTypes.instanceOf(Date),
    ends: PropTypes.instanceOf(Date),
    students: PropTypes.Array
  }

  componentWillMount() {
    // const { _id } = this.props
    this.props.fetchBatches()
  }


  renderStudents(student, index) {
    return (
      <div key={index} className="studentnumber">
        <h3>{student.fullName}</h3>
        <img src={student.picture} />
      </div>
    )
  }

  renderEvaluation(evaluation, index) {
    return (
      <div key={index} className="studentevaluation">
        {evaluations[0].}
        <h3>{evaluations[0].color}</h3>

      </div>
    )
  }

  render() {
    const {
      _id,
      batchNumber,
      starts,
      ends,
      students,
      evaluations,
    } = this.props


    if (!_id) return null

    return(
      <article className="Batch page">
        <header>
          <Title content={`Student: ${student.fullName} `} />
        </header>
        <div>
          {students.map(
            this
            .renderStudents
            .bind(this))}
        </div>
      </article>
    )
  }
}

const mapStateToProps = ({ batches }, { params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {}),

  const student = batch.students.reduce((prev, next) => {
    if (next._id === params.studentId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch
  }
}

export default connect(mapStateToProps, { fetchBatches })(showBatch)
