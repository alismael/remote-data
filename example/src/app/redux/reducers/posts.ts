import { FETCH_POSTS } from '../actions/posts';
import { RemoteData, RemoteDataKind, Action } from 'remote-data';
import { Post } from '../../models';

export type PostsStore = {
  posts: RemoteData<Post[], string>;
};

const initialState: PostsStore = {
  posts: {
    kind: RemoteDataKind.NotAsked,
  },
};

export default (
  state: PostsStore = initialState,
  action: Action<Post[], string>,
): PostsStore => {
  if (action.type === FETCH_POSTS) {
    switch (action.kind) {
      case RemoteDataKind.Loading:
        return {
          ...state,
          posts: {
            kind: RemoteDataKind.Loading,
          },
        };

      case RemoteDataKind.Success:
        return {
          ...state,
          posts: {
            kind: RemoteDataKind.Success,
            data: action.data,
          },
        };

      case RemoteDataKind.Reject:
        return {
          ...state,
          posts: {
            kind: RemoteDataKind.Reject,
            error: action.error,
          },
        };

      default:
        return state;
    }
  }

  return state;
};
