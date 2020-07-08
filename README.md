# remote-data

> Handling Asynchronous fetching of data with React & Redux

## Dependencies

### Required Peer Dependencies

These libraries are not bundled with remote-data and required at runtime:

* [**react**](https://www.npmjs.com/package/react)

#### Install

```sh
npm install github:alismael/remote-data
```

#### Usage

Performing a `GET` request to fetch the data

actions.ts

```ts
import { api } from 'remote-data';
import { Post } from '../models';
import { FETCH_POSTS } from './constants';

const fetchPosts = () =>
  api<Post[], string>({
    method: 'GET',
    url: 'posts',
    baseURL: 'https://jsonplaceholder.typicode.com/',
    action: FETCH_POSTS,
  });
```

Adding reducer to update the store

reducer.ts

```ts
import { Reducer } from 'react';
import { combineReducers } from 'redux';
import { fetchingReducer, RemoteData } from 'remote-data';
import { Post } from '../../models';
import { FETCH_POSTS } from './constants';

export type PostsStore = {
  posts: RemoteData<Post[], string>;
};

const postsReducer: Reducer<PostsStore, any> = combineReducers({
  posts: fetchingReducer<Post[], string>(FETCH_POSTS),
});

export default postsReducer;
```

Handling your view with `RemoteComponent` component

PostsComponent.tsx

```tsx
const PostsLoading = () => <>Loading posts...</>;
const PostsError = ({ err }: { err: string }) => <>{err}</>;
const ListPosts = ({ data }: { data: Post[] }) => <>Here you can use the fetched data</>

type PostsContainerProps = {
  fetchPosts: () => Promise<Post[]>;
  posts: RemoteData<Post[], string>;
};

const PostsContainer = ({ fetchPosts, posts }: PostsContainerProps) => {
  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <RemoteComponent
      remote={posts}
      loading={PostsLoading}
      reject={PostsError}
      success={ListPosts}
    />
  );
};

const mapStateToProps = ({ posts }: StoreState) => ({
  posts: posts.posts,
});
const mapDispatchToProps = (
  dispatch,
) => ({
  fetchPosts: () => dispatch(fetchPostsAction()),
});
connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
```

## api<T, E>

api<T, E>(config) where T, E are the types of data and the expected error

```ts
api<Post[], string>({
  method: 'GET',
  url: 'posts',
  baseURL: 'https://jsonplaceholder.typicode.com/',
  action: FETCH_POSTS,
});
```

Request Config:

* The available request config is <a href="https://github.com/axios/axios#request-config">axios request config</a> **with three more params**:
* `action` - `optional` The action that will be dispatched when the request status changed (loading, success, and error)
* `onSuccess` - `optional` A callback if the request is done successfully
* `onError` - `optional` A callback if the request failed

## fetchingReducer

Updating the redux store according the dispatched actions and the request status
It handles loading, success, fail of fetching the data

```ts
combineReducers({
  posts: fetchingReducer<Post[], string>(FETCH_POSTS),
});
```

## RemoteComponent

Renders the right component according the current status of data

```ts
<RemoteComponent
  remote={posts}
  loading={PostsLoading}
  reject={PostsError}
  success={ListPosts}
/>
```

* `remote` - The Remote data item. It should be of type RemoteData<T, E> where `T` is the data type and `E` is the error type respectively
* `success` - The component to be rendered when data is fetched. The Fetched data (T) will be passed to this component
* `loading` - `optional` The component to be rendered if remote data is in loading status.
* `reject` - `optional` The component to be rendered if an error occurred. an Error (E) will be passed to this component

You can check the `example` folder for more details

## Creating a custom reducer for updating the store

Create a reducer and manually update the store with your custom code you may need to access request

reducer.ts

```ts
import { RemoteData, RemoteKind, Action } from 'remote-data';
import { Post } from '../../models';
import { FETCH_POSTS } from './constants';

export type PostsStore = {
  posts: RemoteData<Post[], string>;
};

const initialState: PostsStore = {
  posts: {
    kind: RemoteKind.NotAsked,
  },
};

export default (
  state: PostsStore = initialState,
  action: Action<Post[], string>,
): PostsStore => {
  if (action.type === FETCH_POSTS) {
    switch (action.kind) {
      case RemoteKind.Loading:
        return {
          ...state,
          posts: {
            kind: RemoteKind.Loading,
          },
        };

      case RemoteKind.Success:
        return {
          ...state,
          posts: {
            kind: RemoteKind.Success,
            data: action.data,
          },
        };

      case RemoteKind.Reject:
        return {
          ...state,
          posts: {
            kind: RemoteKind.Reject,
            error: action.error,
          },
        };

      default:
        return state;
    }
  }

  return state;
};
```

Updating the redux store according the dispatched actions and the request status

* The initial state of the remote data is `NotAsked`
* We have 3 more possible kinds for the data (Loading, Success, and Error)
* The dispatched action attributes
  * `type`: Determines the action type in the previous example it's FETCH_POSTS so we can differentiate between different actions
  * `kind`: Determines the current status of the remote data (NotAsked, Loading, Success, and Error)
  * `data`: ONLY when the request is succeeded
  * `error`: ONLY when the request is failed
  * `headers`: ONLY when the request is succeeded or failed

## Development

To setup and run a local copy

1. Clone this repo with `git clone https://github.com/alismael/remote-data`
2. Run `npm install` in the root folder
3. Run `npm install` in the example folder
4. run `npm start` in the root and example folders.

## License

MIT © [alismael](https://github.com/alismael)
