import { RemoteKind } from './RemoteData';

export type ActionType = string;

type NotAskedAction = {
  type: ActionType;
  kind: RemoteKind.NotAsked;
};

type LoadingAction = {
  type: ActionType;
  kind: RemoteKind.Loading;
};

type SuccessAction<T> = {
  type: ActionType;
  kind: RemoteKind.Success;
  data: T;
  headers: any;
};

type RejectAction<E> = {
  type: ActionType;
  kind: RemoteKind.Reject;
  error: E;
  headers: any;
};

export type Action<T, E> =
  | NotAskedAction
  | LoadingAction
  | SuccessAction<T>
  | RejectAction<E>;
