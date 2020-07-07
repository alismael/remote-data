import { combineReducers } from 'redux';
import posts from '../app/redux/posts/reducer';
import users from '../app/redux/users/reducer';

const rootReducer = combineReducers({
  posts,
  users,
});

export default rootReducer;
