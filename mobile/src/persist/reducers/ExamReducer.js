import {ExamConstants} from '../constants/ExamConstants';
import _ from 'lodash';
const initialState = {
  status: '',
  data: {},
  error: {},
  dataExam:[],
};

export function ExamReducer(state = initialState, action) {
  switch (action.type) {
    case ExamConstants.ADD_EXAM_REQUEST:
      return {
        data: {...state.data},
        error: {},
      };
    case 'reload_exam':
      return {...state, dataExam:action.data};
    default:
      return state;
  }
}
