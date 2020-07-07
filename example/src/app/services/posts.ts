import { api } from 'remote-data';
import { Post } from '../models';
import { FETCH_POSTS } from '../redux/posts/constants';

const fetchPosts = () =>
  api<Post[], string>({
    method: 'GET',
    url: 'posts',
    baseURL: 'https://jsonplaceholder.typicode.com/',
    action: FETCH_POSTS,
  });

export default {
  fetchPosts,
};
