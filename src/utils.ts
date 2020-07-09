import {
  Success,
  Reject,
  RemoteDataAggregate,
  SuccessAggregate,
  RejectAggregate,
} from './models';

const remoteToSuccess = <T, E>(
  remote: RemoteDataAggregate<T, E>,
): SuccessAggregate<T> => {
  const result: SuccessAggregate<T> = {};

  Object.keys(remote).forEach(
    (r) => (result[r] = (remote[r] as Success<T>).data),
  );

  return result;
};

const remoteToReject = <T, E>(
  remote: RemoteDataAggregate<T, E>,
): RejectAggregate<E> => {
  const result: RejectAggregate<E> = {};

  Object.keys(remote).forEach(
    (r) => (result[r] = (remote[r] as Reject<E>).error),
  );

  return result;
};

export { remoteToSuccess, remoteToReject };
