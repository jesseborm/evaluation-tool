// src/actions/add-student.js

import { history } from '../../store'
import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const EVALUATION_ADDED = 'EVALUATION_ADDED'

const api = new API()

export default (batchId, studentId, evaluation) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('batches')

    // debugger
    api.app.authenticate()
      .then(() => {
        // debugger
        backend.patch(batchId, { studentId, evaluation })
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })
            dispatch({ type: EVALUATION_ADDED, payload: result })
            
            console.log("Helloooooo::: " + result);
            debugger
            // history.replace('/')
            api.app.set('batches', batchId)
            history.replace(`/batches/${batchId}`)

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
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
