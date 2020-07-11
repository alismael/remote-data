# remote-data

> Handle modeling, fetching, and displaying remote data in React/Redux apps

## Idea

A React library aimed at modeling, fetching, and displaying remote data and the states it can be in.

This library provides:

* [api](#apit-e) request wrapper based on <a href="https://github.com/axios/axios">Axios</a> to make the HTTP requests
* [fetchingReducer](#fetchingreducer) to update the store
* [RemoteComponent](#remotecomponent) to handle displaying remote data

## Dependencies

### Required Peer Dependencies

These libraries are not bundled with remote-data but required at runtime:

* [**React**](https://www.npmjs.com/package/react)
* [**Redux**](https://www.npmjs.com/package/redux)
* [**Axios**](https://www.npmjs.com/package/axios)

#### Install

```sh
npm i @alismael/remote-data
```

#### Usage

Performing a `GET` request to fetch the data

actions.ts

```ts
import { api } from 'remote-data';
import { Post, ErrorResponse } from '../models';
import { FETCH_POSTS } from './constants';

const fetchPosts = () =>
  api<Post[], ErrorResponse>({
    method: 'GET',
    url: 'posts',
    baseURL: 'https://jsonplaceholder.typicode.com/',
    action: FETCH_POSTS,
  });
```

Adding a reducer to update the store

reducer.ts

```ts
import { Reducer } from 'react';
import { combineReducers } from 'redux';
import { fetchingReducer, RemoteData } from 'remote-data';
import { Post, ErrorResponse } from '../../models';
import { FETCH_POSTS } from './constants';

export type PostsStore = {
  posts: RemoteData<Post[], ErrorResponse>;
};

const postsReducer: Reducer<PostsStore, any> = combineReducers({
  posts: fetchingReducer<Post[], ErrorResponse>(FETCH_POSTS),
});

export default postsReducer;
```

Displaying your remote data

PostsComponent.tsx

```tsx
const PostsLoading = () => <>Loading posts...</>;
const PostsError = ({ err }: { err: ErrorResponse }) => <>{err}</>;
const ListPosts = ({ data }: { data: Post[] }) => <>Here you can use the fetched data</>

type PostsContainerProps = {
  fetchPosts: () => Promise<Post[]>;
  posts: RemoteData<Post[], ErrorResponse>;
};

const PostsContainer = ({ fetchPosts, posts }: PostsContainerProps) => {
  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <RemoteComponent
      remote={{ posts }}
      loading={PostsLoading}
      reject={({ posts }) => <PostsError error={posts.error} />}
      success={({ posts }) => <ListPosts posts={posts.data} />}
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

You can check the `example` folder for more details

## api<T, E>

api<T, E>(config) where T, E are the types of data and the expected error respectively

```ts
import { api } from 'remote-data';

api<Post[], ErrorResponse>({
  method: 'GET',
  url: 'posts',
  baseURL: 'https://jsonplaceholder.typicode.com/',
  action: FETCH_POSTS,
});
```

Request Config

In addition to axios <a href="https://github.com/axios/axios#request-config">request config</a> there are **three more options**:

* `action`: is the action type that will be dispatched when request state changed. If not provided no action will be dispatched.
* `onSuccess`, `onError`: are the callbacks to be triggered for the relevant request state.

## fetchingReducer

fetchingReducer<T, E>(actionType) a reducer for managing the state of the remote data

```ts
import { fetchingReducer } from 'remote-data';

combineReducers({
  posts: fetchingReducer<Post[], ErrorResponse>(FETCH_POSTS),
});
```

* `actionType`: it should be the same as the action passed to the [`api`](#apit-e) request wrapper

## RemoteComponent

Handle displaying of your remote data.

```tsx
import { RemoteComponent } from 'remote-data';

<RemoteComponent
  remote={{ posts }}
  loading={PostsLoading}
  reject={({ posts }) => <PostsError error={posts.error} />}
  success={({ posts }) => <ListPosts posts={posts.data} />}
/>
```

Only `remote` and `success` are required

* `remote` passing your remote data here, it should be of type [RemoteData<T, E>](#remotedatat-e)
* `loading`, `success`, and `reject` will be rendered for the relevant state

You can handle displaying multiple remote data at once with one component. [here](#handle-displaying-multiple-remote-data-with-remotecomponent-component)

## RemoteData<T, E>

RemoteData<T, E> where `T` is the data type and `E` is the error type respectively

```ts
enum RemoteKind {
  NotAsked = 'NOT_ASKED',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Reject = 'REJECT',
}

type NotAsked = {
  kind: RemoteKind.NotAsked;
};

type Loading = {
  kind: RemoteKind.Loading;
};

type Success<T> = {
  kind: RemoteKind.Success;
  data: T;
};

type Reject<E> = {
  kind: RemoteKind.Reject;
  error: E;
};

type RemoteData<T, E> = NotAsked | Loading | Success<T> | Reject<E>;
```

## Action<T, E>

Action<T, E> where `T` is the data type and `E` is the error type respectively

```ts
type ActionType = string;

type NotAskedAction = {
  type: ActionType;
  kind: RemoteKind.NotAsked;
};

type LoadingAction = {
  type: ActionType;
  kind: RemoteKind.Loading;
};

type SuccessAction<T> = {
  type: ActionType;
  kind: RemoteKind.Success;
  data: T;
  headers: any;
};

type RejectAction<E> = {
  type: ActionType;
  kind: RemoteKind.Reject;
  error: E;
  headers: any;
};

type Action<T, E> =
  | NotAskedAction
  | LoadingAction
  | SuccessAction<T>
  | RejectAction<E>;
```

## Handle displaying multiple remote data with `RemoteComponent` component

```tsx
<RemoteComponent
  remote={{ posts, users }}
  loading={() => (
    <>
      <PostsLoading />
      <UsersLoading />
    </>
  )}
  reject={({ posts, users }) => (
    <>
      {users.error && <UsersError error={users.error} />}
      {posts.error && <PostsError error={posts.error} />}
    </>
  )}
  success={({ posts, users }) => (
    <>
      <h1 className="page-title">Users</h1>
      <ListUsers users={users.data} />
      <h1 className="page-title">Posts</h1>
      <ListPosts posts={posts.data} />
    </>
  )}
/>
```

## Create a custom reducer to manually update the store

You can create your custom reducer, here's an example:

```ts
import { RemoteData, RemoteKind, Action } from 'remote-data';
import { Post, ErrorResponse } from '../../models';
import { FETCH_POSTS } from './constants';

export type PostsStore = {
  posts: RemoteData<Post[], ErrorResponse>;
};

const initialState: PostsStore = {
  posts: {
    kind: RemoteKind.NotAsked,
  },
};

export default (
  state: PostsStore = initialState,
  action: Action<Post[], ErrorResponse>,
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

* Initialize your state
* Verify the action type and kind
* Update your state

`action` is of type [Action<T, E>](#actiont-e)

## Development

To setup and run locally

1. Clone this repo with `git clone https://github.com/alismael/remote-data`
2. Run `npm install` in the root folder
3. Run `npm install` in the example folder
4. run `npm start` in the root and example folders

## License

MIT © [alismael](https://github.com/alismael)