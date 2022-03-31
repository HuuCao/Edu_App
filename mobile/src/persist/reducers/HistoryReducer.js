import {HistoryConstants} from '../constants/HistoryConstant';
import _ from 'lodash';
const initialState = {
  status: '',
  data: {
    loggedIn: false,
    user: {
      fullname: 'Man gmail',
      mail: '339107181185019',
      birthday: '07/10/2000',
      phone: '',
      createdAt:
        'Wed Jul 14 2021 18:18:33 GMT+0000 (Coordinated Universal Time)',
      is_active: true,
      avatar: 'abc',

      classID: 12,
      idUser: 9,
      lastLogin:
        'Sun Jul 18 2021 12:01:59 GMT+0000 (Coordinated Universal Time)',
    },
  },
  error: {},
  dataHistory: [],
};

export function HistoryReducer(state = initialState, action) {
  switch (action.type) {
    case HistoryConstants.GET_HISTORY_REQUEST:
      state.dataHistory = action.data;
      return state;
    case HistoryConstants.ADD_HISTORY:
      if (state.data.user != undefined) {
        var history = Object.assign([], state.dataHistory);
        history.push(action.data);
        history = _.reverse(history);
        state.dataHistory = history;
        return state;
      } else {
        return state;
      }
    case 'reload':
      return {...state, dataHistory: action.data};
    default:
      return state;
  }
}
