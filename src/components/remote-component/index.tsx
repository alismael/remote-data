import * as React from 'react';
import {
  RemoteKind,
  RemoteDataAggregate,
  SuccessAggregate,
  RejectAggregate,
} from '../../models';
import { remoteToReject, remoteToSuccess } from '../../utils';

interface RemoteComponentProps<_T, _E> {
  remote: RemoteDataAggregate<any, any>;
  success: (data: SuccessAggregate<any>) => JSX.Element;
  loading?: () => JSX.Element;
  reject?: (reject: RejectAggregate<any>) => JSX.Element;
}

const RemoteComponent = <T, E>({
  remote,
  loading,
  reject,
  success,
}: RemoteComponentProps<T, E>) => {
  const remoteData = Object.values(remote);

  if (remoteData.some((r) => r.kind === RemoteKind.NotAsked))
    return <React.Fragment></React.Fragment>;

  if (remoteData.some((r) => r.kind === RemoteKind.Loading)) {
    if (loading) return loading();
    return <React.Fragment></React.Fragment>;
  }

  if (remoteData.find((r) => r.kind === RemoteKind.Reject)) {
    if (reject) return reject(remoteToReject(remote));
    return <React.Fragment></React.Fragment>;
  }

  return success(remoteToSuccess(remote));
};

export default RemoteComponent;
