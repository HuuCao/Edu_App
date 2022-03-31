// Dung 3 thu vien chinh
// redux ( Reducer + acion )
// react-redux ( Setting Store )
// redux-thunk ( Middleware )

// combineReducer
// Có rất nhiều Reducer
// Kết hợp tụi nó lại thành 1
// Vì chỉ được 1 Reducer nói chuyện vs Store

import {applyMiddleware, combineReducers, createStore} from 'redux';

import thunkMiddleware from 'redux-thunk';

import {UserReducer} from '../reducers/UserReducer';
import {QuestionReducer} from '../reducers/QuestionReducer';
import {ExamReducer} from '../reducers/ExamReducer';
import {HistoryReducer} from '../reducers/HistoryReducer';
const allReducers = combineReducers({
  UserReducer,
  ExamReducer,
  HistoryReducer,
});
const applicationStore = createStore(
  allReducers,
  applyMiddleware(thunkMiddleware),
);

// Có bao nhiêu cái Middleware cho Redux ???
// Tại sao Redux-thunk được chọn và được sử dụng phổ biến .

export default applicationStore;
