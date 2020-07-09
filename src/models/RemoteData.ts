export enum RemoteKind {
  NotAsked = 'NOT_ASKED',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Reject = 'REJECT',
}

export type NotAsked = {
  kind: RemoteKind.NotAsked;
};

export type Loading = {
  kind: RemoteKind.Loading;
};

export type Success<T> = {
  kind: RemoteKind.Success;
  data: T;
};

export type Reject<E> = {
  kind: RemoteKind.Reject;
  error: E;
};

export type RemoteData<T, E> = NotAsked | Loading | Success<T> | Reject<E>;
