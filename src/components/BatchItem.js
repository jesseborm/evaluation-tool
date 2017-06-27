// src/components/BatchItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import './BatchItem.css'
import { Link } from 'react-router'
// import CookingTime from './CookingTime'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class BatchItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    starts: PropTypes.instanceOf(Date),
    ends: PropTypes.instanceOf(Date),
    students: PropTypes.Array
  }

  renderStudents() {
    // students.map()
  }

  render() {
    const {
      _id,
      batchNumber,
      starts,
      ends,
      students,
    } = this.props

    return(
      <article className="batch">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${null || PLACEHOLDER })` }} />
          <h1>
            <Link to={`/batches/${_id}`}>Batch: { batchNumber }</Link>
          </h1>
          <p>Starts on: {starts}</p>
          <p>Ends on: {ends}</p>

          {/* {students.fullName}
          {students.evaluation.color} */}

        </header>
        <main>
          {/* <ReactMarkdown source={} /> */}
        </main>
        {/* <footer>
          <LikeButton
            liked={liked}
            likes={likedBy.length}
            onChange={this.toggleLike.bind(this)} />
        </footer> */}
      </article>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({currentUser})
export default connect(mapStateToProps
  // , { toggleLike }
)(BatchItem)
