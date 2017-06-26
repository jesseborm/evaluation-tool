// src/recipes/RecipesContainer.test.js
import React from 'react'
import chai, { expect } from 'chai'
import spies from 'chai-spies'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import { RecipesContainer } from './RecipesContainer'
import Title from '../components/Title'
import RecipeItem from './RecipeItem'
import recipes from '../seeds/recipes'

chai.use(chaiEnzyme())
chai.use(spies)

describe('<RecipesContainer />', () => {
  const fetchRecipes = chai.spy()
  const container = shallow(
    <RecipesContainer
      recipes={recipes}
      fetchRecipes={fetchRecipes} />
  )

  it('is wrapped in a div with class name "recipes"', () => {
    expect(container).to.have.className('wrapper')
    expect(container).to.have.className('recipes')
  })

  it('contains a Title', () => {
    expect(container).to.have.descendants(Title)
  })

  it('sets the Title to "All Recipes"', () => {
    expect(container).to.contain(<Title content="All Recipes" />)
  })

  it('renders all recipes as a RecipeItem', () => {
    expect(container).to.have.exactly(recipes.length).descendants(RecipeItem)
  })

  it('calls fetchRecipes in componentWillMount', () => {
    fetchRecipes.reset()

    shallow(
      <RecipesContainer
        recipes={recipes}
        fetchRecipes={fetchRecipes} />)

    expect(fetchRecipes).to.have.been.called.exactly.once()
  })
})
