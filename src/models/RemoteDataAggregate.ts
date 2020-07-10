import { RemoteData, Success, Reject } from './RemoteData';

export type RemoteDataAggregate<T> = {
  [K in keyof T]: RemoteData<any, any>;
};

export type SuccessAggregate<T extends RemoteDataAggregate<T>> = {
  [K in keyof T]: Success<any>;
};

export type RejectAggregate<T extends RemoteDataAggregate<T>> = {
  [K in keyof T]: Reject<any>;
};
