import * as React from 'react';
import { RemoteData, RemoteKind } from '../../models';

interface RemoteComponentProps<T, E> {
  remote: RemoteData<T, E>;
  success: ({ data }: { data: T }) => JSX.Element;
  loading?: () => JSX.Element;
  reject?: ({ err }: { err: E }) => JSX.Element;
}

const RemoteComponent = <T, E>({
  remote,
  loading,
  reject,
  success,
}: RemoteComponentProps<T, E>) => {
  switch (remote.kind) {
    case RemoteKind.NotAsked:
      return <React.Fragment></React.Fragment>;

    case RemoteKind.Loading:
      if (loading) return loading();
      return <React.Fragment></React.Fragment>;

    case RemoteKind.Reject:
      if (reject) return reject({ err: remote.error });
      return <React.Fragment></React.Fragment>;

    case RemoteKind.Success:
      return success({ data: remote.data });

    default:
      return <React.Fragment></React.Fragment>;
  }
};

export default RemoteComponent;
