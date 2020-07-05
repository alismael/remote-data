import { FETCH_USERS } from '../actions/users';
import { RemoteData, RemoteDataKind, Action } from 'remote-data';
import { User } from '../../models';

export type UsersStore = {
  users: RemoteData<User[], string>;
};

const initialState: UsersStore = {
  users: {
    kind: RemoteDataKind.NotAsked,
  },
};

export default (
  state: UsersStore = initialState,
  action: Action<User[], string>,
): UsersStore => {
  if (action.type === FETCH_USERS) {
    switch (action.kind) {
      case RemoteDataKind.Loading:
        return {
          ...state,
          users: {
            kind: RemoteDataKind.Loading,
          },
        };

      case RemoteDataKind.Success:
        return {
          ...state,
          users: {
            kind: RemoteDataKind.Success,
            data: action.data,
          },
        };

      case RemoteDataKind.Reject:
        return {
          ...state,
          users: {
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
