// src/students/StudentItem.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './StudentItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class StudentItem extends PureComponent {

  // componentWillMount() {
  //   const {
  //     batch,
  //     getCurrentBatch,
  //   } = this.props
  //
  //   const { batchId } = this.props.params
  //   getBatch(batchId)
  // }

  renderStudent() {

  }

  render() {
    const {
      _id,
      fullName,
      picture,
      evaluation,
    } = this.props

    return(
      <article className="student-item">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${null || PLACEHOLDER })` }} />

        </header>
        <main>

        </main>
      </article>
    )
  }


}

mapStateToProps = ({ currentBatch, currentUser }) => ({
  currentBatch, currentUser })
export default connect(mapStateToProps)(StudentItem)
