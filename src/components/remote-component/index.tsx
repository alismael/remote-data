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
      return <div></div>;

    case RemoteKind.Loading:
      if (loading) return loading();
      return <div></div>;

    case RemoteKind.Reject:
      if (reject) return reject({ err: remote.error });
      return <div></div>;

    case RemoteKind.Success:
      return success({ data: remote.data });

    default:
      return <div></div>;
  }
};

export default RemoteComponent;
