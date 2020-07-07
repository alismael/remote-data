import { PostsStore } from '../redux/posts/reducer';
import { UsersStore } from '../redux/users/reducer';

export interface StoreState {
  posts: PostsStore;
  users: UsersStore;
}
