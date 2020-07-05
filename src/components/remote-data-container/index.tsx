import * as React from 'react';
import { RemoteData, RemoteDataKind } from '../../models';

interface RemoteDataContainerProps<T, E> {
  remote: RemoteData<T, E>;
  success: ({ data }: { data: T }) => JSX.Element;
  loading?: () => JSX.Element;
  reject?: ({ err }: { err: E }) => JSX.Element;
}

const RemoteDataContainer = <T, E>({
  remote,
  loading,
  reject,
  success,
}: RemoteDataContainerProps<T, E>) => {
  switch (remote.kind) {
    case RemoteDataKind.NotAsked:
      return <div></div>;

    case RemoteDataKind.Loading:
      if (loading) return loading();
      return <div></div>;

    case RemoteDataKind.Reject:
      if (reject) return reject({ err: remote.error });
      return <div></div>;

    case RemoteDataKind.Success:
      return success({ data: remote.data });

    default:
      return <div></div>;
  }
};

export default RemoteDataContainer;
