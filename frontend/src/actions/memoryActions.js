import { 
      CREATE_MEMORY_REQUEST,
      CREATE_MEMORY_SUCCESS,
      CREATE_MEMORY_FAILED,

      FETCH_MEMORY_REQUEST,
      FETCH_MEMORY_SUCCESS,
      FETCH_MEMORY_FAILED,

      UPDATE_MEMORY_REQUEST,
      UPDATE_MEMORY_SUCCESS,
      UPDATE_MEMORY_FAILED,

      LIKE_AND_DISLIKE_MEMORY_REQUEST,
      LIKE_AND_DISLIKE_MEMORY_SUCCESS,
      LIKE_AND_DISLIKE_MEMORY_FAILED,

      DELETE_MEMORY_REQUEST,
      DELETE_MEMORY_SUCCESS,
      DELETE_MEMORY_FAILED,

} from '../actionTypes/MemoriesActionTypes';
import * as api from '../api/Api';

export const fetchAllMemories = () => async (dispatch) => {
      dispatch({ type: FETCH_MEMORY_REQUEST });
      try {
            const {data} = await api.fetchAllMemories();
            dispatch({ type: FETCH_MEMORY_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: FETCH_MEMORY_FAILED, payload: error });    
      }
}
export const createMemory = (formdata) => async (dispatch) => {
      dispatch({ type: CREATE_MEMORY_REQUEST });
      try {
            const {data} = await api.createMemory(formdata);
            dispatch({ type: CREATE_MEMORY_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: CREATE_MEMORY_FAILED, payload: error });    
      }
}

export const updateMemory = (id, formData) => async (dispatch) => {
      dispatch({ type: UPDATE_MEMORY_REQUEST });
      try {
            const {data} = await api.updateMemory(id, formData);
            dispatch({ type: UPDATE_MEMORY_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: UPDATE_MEMORY_FAILED, payload: error });    
      }
}
export const likeAndDislikeMemory = (id, creator) => async (dispatch) => {
      dispatch({ type: LIKE_AND_DISLIKE_MEMORY_REQUEST });
      try {
            const {data} = await api.likeAndDislikeMemory(id, creator);
            if(data) {
                  dispatch({ type: LIKE_AND_DISLIKE_MEMORY_SUCCESS, payload: data.memory })
            }
      } catch (error) {
            dispatch({ type: LIKE_AND_DISLIKE_MEMORY_FAILED, payload: error });    
      }
}
export const deleteMemory = (id) => async (dispatch) => {
      
      dispatch({ type: DELETE_MEMORY_REQUEST });
      try {
            const {data} = await api.deleteMemory(id);
            dispatch({ type: DELETE_MEMORY_SUCCESS, payload: data })
      } catch (error) {
            dispatch({ type: DELETE_MEMORY_FAILED, payload: error });    
      }
}