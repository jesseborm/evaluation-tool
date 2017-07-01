// src/components/BatchItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './BatchItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class BatchItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.string,
    starts: PropTypes.instanceOf(Date),
    ends: PropTypes.instanceOf(Date),
    students: PropTypes.Array
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
          <p>Amount of students: {students.length}</p>

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

const mapStateToProps = ({ batches, currentUser }) => ({batches, currentUser})
export default connect(mapStateToProps)(BatchItem)
