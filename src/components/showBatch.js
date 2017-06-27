import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import './BatchItem.css'
import fetchBatches from '../actions/batches/fetch'
import Title from '../components/Title'

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

  // linkToStudent(){
  //   return (
  //     <Link to={`/batches/${_id}/students/${student._id}`}></Link>
  //       )
  // }


  renderStudents(student, index) {

    // const student = batch.student
    // console.log(student)
    return (
      // <div key={index} { ...student } />
      <div key={index} className="studentnumber">

        <Link to={`/batches/${this.props._id}/students/${student._id}`}>
          <h3>{student.fullName}</h3>
        </Link>
        <img src={student.picture} />
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
    } = this.props


    if (!_id) return null

    return(
      <article className="Batch page">
        <header>
          {/* <div
            className="cover"
          style={{ backgroundImage: `url(${batches.student.picture})` }} /> */}
          <Title content={`Batch number: ${batchNumber} `} />
        </header>
        <div>{students.map(this.renderStudents.bind(this))}</div>
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
  }, {})

  return {
    ...batch
  }
}

export default connect(mapStateToProps, { fetchBatches })(showBatch)