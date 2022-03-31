import {QuestionConstants} from '../constants/QuestionConstant';
import _ from 'lodash';
const initialState = {
  status: '',
  data: {
    addresses: [],
  },
  error: {},
};

export function QuestionReducer(state = initialState, action) {
  switch (action.type) {
    case QuestionConstants.GET_QUESTION_REQUEST:
      return {
        data: {...state.data},
        error: {},
      };
    default:
      return state;
  }
}
