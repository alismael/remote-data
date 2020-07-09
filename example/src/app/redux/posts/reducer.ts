import { Reducer } from 'react';
import { combineReducers } from 'redux';
import { fetchingReducer, RemoteData } from 'remote-data';
import { Post, ErrorResponse } from '../../models';
import { FETCH_POSTS } from './constants';

export type PostsStore = {
  posts: RemoteData<Post[], ErrorResponse>;
};

const postsReducer: Reducer<PostsStore, any> = combineReducers({
  posts: fetchingReducer<Post[], ErrorResponse>(FETCH_POSTS),
});

export default postsReducer;
