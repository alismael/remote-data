import {
  RemoteDataAggregate,
  SuccessAggregate,
  RejectAggregate,
} from './models';

const remoteToSuccess = <T extends RemoteDataAggregate<T>>(
  remote: RemoteDataAggregate<T>,
): SuccessAggregate<T> => remote as SuccessAggregate<T>;

const remoteToReject = <T extends RemoteDataAggregate<T>>(
  remote: RemoteDataAggregate<T>,
): RejectAggregate<T> => remote as RejectAggregate<T>;

export { remoteToSuccess, remoteToReject };
