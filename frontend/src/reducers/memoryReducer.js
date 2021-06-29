import { 
      // CREATE_MEMORY_REQUEST,
      CREATE_MEMORY_SUCCESS,
      CREATE_MEMORY_FAILED,

      // FETCH_MEMORY_REQUEST,
      FETCH_MEMORY_SUCCESS,
      FETCH_MEMORY_FAILED,

      // UPDATE_MEMORY_REQUEST,
      UPDATE_MEMORY_SUCCESS,
      UPDATE_MEMORY_FAILED,

      // LIKE_AND_DISLIKE_MEMORY_SUCCESS,
      // LIKE_AND_DISLIKE_MEMORY_FAILED,

      LIKE_AND_DISLIKE_MEMORY_SUCCESS,
      LIKE_AND_DISLIKE_MEMORY_FAILED,

      // DELETE_MEMORY_REQUEST,
      DELETE_MEMORY_SUCCESS,
      DELETE_MEMORY_FAILED,

} from './../actionTypes/MemoriesActionTypes';

const initialState = {
      memories: []
}

export default (state = initialState, action) => {
const { type, payload } = action;
      switch(type) {
            case CREATE_MEMORY_SUCCESS:
                  return { ...state, memories: [...state.memories, payload] };
            case CREATE_MEMORY_FAILED:
                  return { ...state, memories: state.memories };
            case FETCH_MEMORY_SUCCESS:
                  return { ...state, memories: payload };
            case FETCH_MEMORY_FAILED:
                  return { ...state, memories: state.memories };
            case LIKE_AND_DISLIKE_MEMORY_SUCCESS:
                  return { ...state, memories: payload };
            case LIKE_AND_DISLIKE_MEMORY_FAILED:
                  return { ...state, memories: state.memories };
            case UPDATE_MEMORY_SUCCESS:
                  return { ...state, memories: payload };
            case UPDATE_MEMORY_FAILED:
                  return { ...state, memories: state.memories };
            case DELETE_MEMORY_SUCCESS:
                  return { ...state, memories: state.memories.filter(memory => memory ? memory?._id !== payload?._id : memory) };
            case DELETE_MEMORY_FAILED:
                  return { ...state, memories: state.memories };

            default:
                  return state;

      }
}