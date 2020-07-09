import { api } from 'remote-data';
import { Post, ErrorResponse } from '../models';
import { FETCH_POSTS } from '../redux/posts/constants';

const fetchPosts = () =>
  api<Post[], ErrorResponse>({
    method: 'GET',
    url: 'posts',
    baseURL: 'https://jsonplaceholder.typicode.com/',
    action: FETCH_POSTS,
  });

export default {
  fetchPosts,
};
