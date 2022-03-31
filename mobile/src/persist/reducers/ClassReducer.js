import {ClassConstants} from '../constants/ClassConstants';

const initialState = {
  status: '',
  data: {},
  error: {},
};

export function ClassReducer(state = initialState, action) {
  switch (action.type) {
    case ClassConstants.GET_ALl_CLASS_REQUEST:
      return {
        data: {...state.data},
        error: {},
      };
    default:
      return state;
  }
}
