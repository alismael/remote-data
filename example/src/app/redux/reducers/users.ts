import { FETCH_USERS } from '../actions/users';
import { RemoteData, RemoteKind, Action } from 'remote-data';
import { User } from '../../models';

export type UsersStore = {
  users: RemoteData<User[], string>;
};

const initialState: UsersStore = {
  users: {
    kind: RemoteKind.NotAsked,
  },
};

export default (
  state: UsersStore = initialState,
  action: Action<User[], string>,
): UsersStore => {
  if (action.type === FETCH_USERS) {
    switch (action.kind) {
      case RemoteKind.Loading:
        return {
          ...state,
          users: {
            kind: RemoteKind.Loading,
          },
        };

      case RemoteKind.Success:
        return {
          ...state,
          users: {
            kind: RemoteKind.Success,
            data: action.data,
          },
        };

      case RemoteKind.Reject:
        return {
          ...state,
          users: {
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
