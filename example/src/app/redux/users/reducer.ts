import { Reducer } from 'react';
import { combineReducers } from 'redux';
import { fetchingReducer, RemoteData } from 'remote-data';
import { User } from '../../models';
import { FETCH_USERS } from './constants';

export type UsersStore = {
  users: RemoteData<User[], string>;
};

const usersReducer: Reducer<UsersStore, any> = combineReducers({
  users: fetchingReducer<User[], string>(FETCH_USERS),
});

export default usersReducer;
