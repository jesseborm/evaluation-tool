// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import LikeButton from '../components/LikeButton'
import RecipeCategory from './RecipeCategory'
import toggleLike from '../actions/recipes/toggleLike'
import './RecipeItem.css'
import { Link } from 'react-router'
import CookingTime from './CookingTime'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class RecipeItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    pescatarian: PropTypes.bool,
    liked: PropTypes.bool,
    toggleLike: PropTypes.func.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  }

  toggleLike() {
    const { _id, liked } = this.props
    this.props.toggleLike(_id, liked)
  }

  render() {
    const {
      _id,
      title,
      summary,
      vegan,
      vegetarian,
      pescatarian,
      photo,
      liked,
      author,
      cookingTime,
      likedBy,
    } = this.props

    const categories = { vegan, vegetarian, pescatarian }

    return(
      <article className="recipe">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${photo || PLACEHOLDER })` }} />
          <h1>
            <Link to={`/recipes/${_id}`}>{ title }</Link>
          </h1>
          <p className="author">By: { author.name }</p>
          <CookingTime time={cookingTime} />
          <ul className="categories">
            <RecipeCategory { ...categories } />
          </ul>
        </header>
        <main>
          <ReactMarkdown source={summary} />
        </main>
        <footer>
          <LikeButton
            liked={liked}
            likes={likedBy.length}
            onChange={this.toggleLike.bind(this)} />
        </footer>
      </article>
    )
  }
}

const mapStateToProps = ({ currentUser }, { likedBy }) => ({
  liked: !!currentUser && likedBy.includes(currentUser._id),
})
export default connect(mapStateToProps, { toggleLike })(RecipeItem)
