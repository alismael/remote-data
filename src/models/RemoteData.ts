export enum RemoteDataKind {
  NotAsked = 'NOT_ASKED',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Reject = 'REJECT',
}

type NotAsked = {
  kind: RemoteDataKind.NotAsked;
};

type Loading = {
  kind: RemoteDataKind.Loading;
};

type Success<T> = {
  kind: RemoteDataKind.Success;
  data: T;
};

type Reject<E> = {
  kind: RemoteDataKind.Reject;
  error: E;
};

export type RemoteData<T, E> = NotAsked | Loading | Success<T> | Reject<E>;
