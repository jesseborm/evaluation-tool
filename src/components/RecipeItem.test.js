// src/recipes/RecipeItem.test.js
import React from 'react'
import chai, { expect } from 'chai'
import spies from 'chai-spies'
import { render } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import { RecipeItem } from './RecipeItem'

chai.use(chaiEnzyme())
chai.use(spies)

const recipe = {
  _id: '1234',
  title: 'Spanish Omelette',
  summary: 'A traditional dish from Spanish cuisine called tortilla española or tortilla de patatas. It is an omelette made with eggs and potatoes, sometimes also with onion and/or chives or garlic; fried in oil and often served cold as an appetizer.',
  vegan: false,
  vegetarian: true,
  pescatarian: false,
  liked: false,
}

describe('<RecipeItem />', () => {
  const toggleLike = chai.spy()
  const container = render(<RecipeItem { ...recipe } toggleLike={toggleLike} />)

  it('is wrapped in a article tag with class name "recipe"', () => {
    expect(container).to.have.tagName('article')
    expect(container).to.have.className('recipe')
  })

  it('contains the title of the recipe', () => {
    expect(container.find('h1')).to.have.text(recipe.title)
  })
})
