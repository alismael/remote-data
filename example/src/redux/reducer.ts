import { combineReducers } from 'redux';
import posts from '../app/redux/reducers/posts';
import users from '../app/redux/reducers/users';

const rootReducer = combineReducers({
  posts,
  users,
});

export default rootReducer;
