import { Reducer } from 'react';
import { combineReducers } from 'redux';
import { fetchingReducer, RemoteData } from 'remote-data';
import { User, ErrorResponse } from '../../models';
import { FETCH_USERS } from './constants';

export type UsersStore = {
  users: RemoteData<User[], ErrorResponse>;
};

const usersReducer: Reducer<UsersStore, any> = combineReducers({
  users: fetchingReducer<User[], ErrorResponse>(FETCH_USERS),
});

export default usersReducer;
