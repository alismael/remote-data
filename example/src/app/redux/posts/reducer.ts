import { RemoteData, RemoteKind, Action } from 'remote-data';
import { Post } from '../../models';
import { FETCH_POSTS } from './constants';

export type PostsStore = {
  posts: RemoteData<Post[], string>;
};

const initialState: PostsStore = {
  posts: {
    kind: RemoteKind.NotAsked,
  },
};

export default (
  state: PostsStore = initialState,
  action: Action<Post[], string>,
): PostsStore => {
  if (action.type === FETCH_POSTS) {
    switch (action.kind) {
      case RemoteKind.Loading:
        return {
          ...state,
          posts: {
            kind: RemoteKind.Loading,
          },
        };

      case RemoteKind.Success:
        return {
          ...state,
          posts: {
            kind: RemoteKind.Success,
            data: action.data,
          },
        };

      case RemoteKind.Reject:
        return {
          ...state,
          posts: {
            kind: RemoteKind.Reject,
            error: action.error,
          },
        };

      default:
        return state;
    }
  }

  return state;
};
