import posts from '../../services/posts';

export const FETCH_POSTS = 'FETCH_POSTS';

const fetchPosts = () => posts.fetchPosts();

export { fetchPosts };
