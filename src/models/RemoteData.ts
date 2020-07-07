export enum RemoteKind {
  NotAsked = 'NOT_ASKED',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Reject = 'REJECT',
}

type NotAsked = {
  kind: RemoteKind.NotAsked;
};

type Loading = {
  kind: RemoteKind.Loading;
};

type Success<T> = {
  kind: RemoteKind.Success;
  data: T;
};

type Reject<E> = {
  kind: RemoteKind.Reject;
  error: E;
};

export type RemoteData<T, E> = NotAsked | Loading | Success<T> | Reject<E>;
