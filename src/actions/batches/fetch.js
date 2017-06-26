// src/actions/recipes/fetch.js

import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCHED_RECIPES = 'FETCHED_RECIPES'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('recipes')

    api.app.authenticate()
      .then(() => {
        backend.find()
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: FETCHED_RECIPES,
              payload: result.data
            })
          })
          .catch((error) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })
      .catch((error) => {
        backend.find()
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: FETCHED_RECIPES,
              payload: result.data
            })
          })
          .catch((error) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })

  }
}
