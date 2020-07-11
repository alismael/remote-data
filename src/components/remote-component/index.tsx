import * as React from 'react';
import {
  RemoteKind,
  RemoteDataAggregate,
  SuccessAggregate,
  RejectAggregate,
  RemoteData,
} from '../../models';
import { remoteToReject, remoteToSuccess } from '../../utils';

interface RemoteComponentProps<T extends RemoteDataAggregate<T>> {
  remote: T;
  success: (data: SuccessAggregate<T>) => JSX.Element;
  loading?: () => JSX.Element;
  reject?: (reject: RejectAggregate<T>) => JSX.Element;
}

const RemoteComponent = <T extends RemoteDataAggregate<T>>({
  remote,
  loading,
  reject,
  success,
}: RemoteComponentProps<T>) => {
  const remoteData: RemoteData<any, any>[] = Object.values(remote);

  if (remoteData.some((r) => r.kind === RemoteKind.NotAsked))
    return <React.Fragment></React.Fragment>;

  if (remoteData.some((r) => r.kind === RemoteKind.Loading)) {
    if (loading) return loading();
    return <React.Fragment></React.Fragment>;
  }

  if (remoteData.some((r) => r.kind === RemoteKind.Reject)) {
    if (reject) return reject(remoteToReject(remote));
    return <React.Fragment></React.Fragment>;
  }

  return success(remoteToSuccess(remote));
};

export default RemoteComponent;
