import { RemoteKind } from './RemoteData';

type ActionName = string;

type NotAskedAction = {
  type: ActionName;
  kind: RemoteKind.NotAsked;
};

type LoadingAction = {
  type: ActionName;
  kind: RemoteKind.Loading;
};

type SuccessAction<T> = {
  type: ActionName;
  kind: RemoteKind.Success;
  data: T;
  headers: any;
};

type RejectAction<E> = {
  type: ActionName;
  kind: RemoteKind.Reject;
  error: E;
  headers: any;
};

export type Action<T, E> =
  | NotAskedAction
  | LoadingAction
  | SuccessAction<T>
  | RejectAction<E>;
