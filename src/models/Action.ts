import { RemoteDataKind } from './RemoteData';

type ActionName = string;

type NotAskedAction = {
  type: ActionName;
  kind: RemoteDataKind.NotAsked;
};

type LoadingAction = {
  type: ActionName;
  kind: RemoteDataKind.Loading;
};

type SuccessAction<T> = {
  type: ActionName;
  kind: RemoteDataKind.Success;
  data: T;
  headers: any;
};

type RejectAction<E> = {
  type: ActionName;
  kind: RemoteDataKind.Reject;
  error: E;
  headers: any;
};

export type Action<T, E> =
  | NotAskedAction
  | LoadingAction
  | SuccessAction<T>
  | RejectAction<E>;
