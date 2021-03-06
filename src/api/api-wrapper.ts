import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosPromise,
} from 'axios';
import { Dispatch } from 'redux';
import { Action, RemoteKind } from '../models';

const error = (err: AxiosError) => err.response?.data;

interface Options<T, E> extends AxiosRequestConfig {
  action?: string;
  onSuccess?: (res: T) => void;
  onError?: (err: E) => void;
}

const api = <T, E>(
  options: Options<T, E>,
): ((dispatch: Dispatch<Action<T, E>>) => AxiosPromise<T>) => {
  const { action, onSuccess, onError, ...axiosConfig } = options;

  return (dispatch: Dispatch<Action<T, E>>) => {
    const onLoading = () => {
      if (action) dispatch({ type: action, kind: RemoteKind.Loading });
    };

    const onFulfilled = (res: AxiosResponse<T>) => {
      if (action)
        dispatch({
          type: action,
          kind: RemoteKind.Success,
          data: res.data,
          headers: res.headers,
        });
      if (onSuccess) onSuccess(res.data);
      return res.data;
    };

    const onRejected = (res: AxiosError<E>) => {
      if (!axios.isCancel(res)) {
        if (action)
          dispatch({
            type: action,
            kind: RemoteKind.Reject,
            error: error(res),
            headers: res.response?.headers,
          });
        if (onError) onError(error(res));
        return error(res);
      }
    };

    onLoading();
    const request = axios(axiosConfig);
    request.then(onFulfilled).catch(onRejected);
    return request;
  };
};

export default api;
