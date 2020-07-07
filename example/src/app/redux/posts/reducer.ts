import { Reducer } from 'react';
import { combineReducers } from 'redux';
import { fetchingReducer, RemoteData } from 'remote-data';
import { Post } from '../../models';
import { FETCH_POSTS } from './constants';

export type PostsStore = {
  posts: RemoteData<Post[], string>;
};

const postsReducer: Reducer<PostsStore, any> = combineReducers({
  posts: fetchingReducer<Post[], string>(FETCH_POSTS),
});

export default postsReducer;
