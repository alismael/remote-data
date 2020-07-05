import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { Action, RemoteDataKind } from '../models';

interface Options<T, E> extends AxiosRequestConfig {
  action?: string;
  onSuccess?: (res: T) => void;
  onError?: (err: E) => void;
}

const api = <T, E>(options: Options<T, E>) => {
  const { action, onSuccess, onError, ...axiosConfig } = options;

  return (dispatch: Dispatch<Action<T, E>>) => {
    const onLoading = () => {
      if (action) dispatch({ type: action, kind: RemoteDataKind.Loading });
    };

    const onFulfilled = (res: AxiosResponse<T>) => {
      if (action)
        dispatch({
          type: action,
          kind: RemoteDataKind.Success,
          data: res.data,
          headers: res.headers,
        });
      if (onSuccess) onSuccess(res.data);
    };

    const onRejected = (res: AxiosError<E>) => {
      if (!axios.isCancel(res)) {
        if (action)
          dispatch({
            type: action,
            kind: RemoteDataKind.Reject,
            error: res.response?.headers['x-error'],
            headers: res.response?.headers,
          });
      }
    };

    onLoading();
    return axios(axiosConfig).then(onFulfilled).catch(onRejected);
  };
};

export default api;
