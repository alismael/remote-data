import { PostsStore } from '../redux/reducers/posts';
import { UsersStore } from '../redux/reducers/users';

export interface StoreState {
  posts: PostsStore;
  users: UsersStore;
}
