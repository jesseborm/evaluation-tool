// src/actions/add-student.js

import { history } from '../../store'
import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const STUDENT_ADDED = 'STUDENT_ADDED'

const api = new API()

export default (batchId, newStudent) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('batches')

    backend.patch(batchId, newStudent)

      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: STUDENT_ADDED,
          payload: result
        })
        // history.replace('/batches/:batchId')
        // history.replace(`/batches/:${_id}`)

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