import {UserConstants} from '../constants/UserConstants';

const initialState = {
  status: '',
  isReLoad: false,
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

// dispatch -> Reducer -> nhan tham so truyen vao

// action  = {type:UserConstants.SIGNIN_REQUEST,data:{user:'abc'}}

// Login vao` -> data User

// dispatch data User -> Reducer -> Tat ca cac man hinh con lai

export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case UserConstants.SIGNIN_REQUEST:
      // Gọi ở màn hình Login, Truyền vào User là data , set LoggedIn = true .
      return {
        data: {...state.data, ...{user: action.data, loggedIn: true}},
        error: {},
      };
      break;
    case UserConstants.UPDATE_PROFILE:
      return {
        data: {...state.data, ...{user: action.data}},
        error: {},
      };
      break;
    case UserConstants.UPDATE_PROFILE_FULLNAME:
      return {
        data: {...state.data.user, ...{fullname: action.data}},
        error: {},
      };
    case UserConstants.UPDATE_PROFILE_CLASS:
      return {
        data: {...state.data.user, ...{classID: action.data}},
        error: {},
      };

    // case UserConstants.GET_HISTORY_REQUEST:
    //   console.log('=1====UserConstants==', action.data);
    //   return {
    //     data: {...state.data, ...{dataHistory: action.data}},
    //     error: {},
    //   };
    // case 'reload':
    //   return {...state, dataHistory: action.data};
    // case UserConstants.ADD_HISTORY:
    //   if (
    //     state.data.user != undefined &&
    //     state.data.user.history != undefined
    //   ) {
    //     var history = Object.assign([], state.data.user.history);
    //     history.push(action.data);
    //     state.data.user.history = history;
    //     return state;
    //   } else {
    //     return state;
    //   }

    case UserConstants.SIGNOUT_REQUEST:
      // thay vì
      // state.data.loggedIn = false;
      // thì nó sẽ dùng dấu 3 chấm như bên dưới
      return {
        data: {...state.data, ...{loggedIn: false}},
        error: {},
      };

    default:
      return state;
  }
}
