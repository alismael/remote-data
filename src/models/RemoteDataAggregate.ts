import { RemoteData } from "./RemoteData";

export type RemoteDataAggregate<T, E> = {
  [key: string]: RemoteData<T, E>;
};

export type SuccessAggregate<T> = {
  [key: string]: T;
};

export type RejectAggregate<E> = {
  [key: string]: E;
};