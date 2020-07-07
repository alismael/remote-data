# remote-data

> Handling asynchronous fetching of data with React/Redux

## Dependencies

### Required Peer Dependencies

These libraries are not bundled with RemoteData and required at runtime:

* [**react**](https://www.npmjs.com/package/react)

#### Usage

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

Available options:

* Beside the request options url, method, baseURL, headers, params and so on you have three optional params as follow:
* `action` - `optional` The action that will be dispatched to track the request status (loading, success, and error)
* `onSuccess` - `optional` A callback when request is done successfully
* `onError` - `optional` A callback if an error occurred

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

Updating the redux store according the dispatched actions

* The initial state of the remote data is `NotAsked`
* We have 3 more possible kinds for the data (Loading, Success, and Error)
* The dispatched action attributes
  * `type`: Determines the action type in the previous example it's FETCH_POSTS so we can differentiate between different actions
  * `kind`: Determines the current status of the remote data (NotAsked, Loading, Success, and Error)
  * `data`: ONLY when the request is succeeded
  * `error`: ONLY when the request is failed
  * `headers`: ONLY when the request is succeeded or failed

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

Available props:

* `remote` - The Remote data item should be of type RemoteData<T, E> where `T` is the data type and `E` is the error type
* `success` - The component to be rendered when data is fetched. The Fetched data (T) will be passed to the component
* `loading` - `optional` The component to be rendered while remote data is being fetched.
* `reject` - `optional` The component to be rendered when an error occurred. an Error (E) will be passed to the component

You can check the `example` folder for more details

## Development

Install dependencies:

```sh
npm install
```

Run examples at [http://localhost:3000/](http://localhost:3000/):

```sh
npm start
```

Build:

```sh
npm run build
```

## License

MIT © [alismael](https://github.com/alismael)
