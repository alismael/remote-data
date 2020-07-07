import { RemoteData, RemoteKind, Action, ActionType } from '../models';

export type State<T, E> = RemoteData<T, E>;

const initialState: State<any, any> = {
  kind: RemoteKind.NotAsked,
};

export default <T, E>(actionType: ActionType) => (
  state: State<T, E> = initialState,
  action: Action<T, E>,
): State<T, E> => {
  if (action.type === actionType) {
    switch (action.kind) {
      case RemoteKind.Loading:
        return {
          ...state,
          kind: RemoteKind.Loading,
        };

      case RemoteKind.Success:
        return {
          ...state,
          kind: RemoteKind.Success,
          data: action.data,
        };

      case RemoteKind.Reject:
        return {
          ...state,
          kind: RemoteKind.Reject,
          error: action.error,
        };

      default:
        return state;
    }
  }

  return state;
};
