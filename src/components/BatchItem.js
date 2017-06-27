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
    starts: PropTypes.Date,
    ends: PropTypes.Date,
    students: PropTypes.shape({
      // _id: PropTypes.string.isRequired,
      fullName: PropTypes.string,
      picture: PropTypes.string,
      evaluation: PropTypes.shape({
        date: PropTypes.Date,
        color: PropTypes.String,
        remark: PropTypes.String
      })
    })
  }

  // toggleLike() {
  //   const { _id, liked } = this.props
  //   this.props.toggleLike(_id, liked)
  // }

  render() {
    const {
      _id,
      batchNumber,
      starts,
      ends,
      // students.fullName,
      // students.picture,
      // students.evaluation.date,
      // students.evaluation.color,
      // students.evaluation.remark,
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
          {/* <p className="author">By: { author.name }</p> */}
          {/* <CookingTime time={cookingTime} />
            <ul className="categories">
            <RecipeCategory { ...categories } />
          </ul> */}
          <p>
            {starts}
            {ends}
            {/* {students.fullName}
            {students.evaluation.color} */}
          </p>
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

const mapStateToProps = ({ currentUser }
  , { likedBy }) => ({
  liked: !!currentUser && likedBy.includes(currentUser._id),
})
export default connect(mapStateToProps
  // , { toggleLike }
)(BatchItem)
