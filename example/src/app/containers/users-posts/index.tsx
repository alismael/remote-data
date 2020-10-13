import * as React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState, Post, ErrorResponse, User } from '../../models';
import { RemoteData, RemoteComponent } from 'remote-data';
import { fetchPosts as fetchPostsAction } from '../../redux/posts/actions';
import { fetchUsers as fetchUsersAction } from '../../redux/users/actions';
import {
  PostsError,
  PostsLoading,
  ListPosts,
  UsersError,
  ListUsers,
  UsersLoading,
} from '../../components';
import { AxiosPromise } from 'axios';

type UsersPostsContainerProps = {
  fetchPosts: () => AxiosPromise<Post[]>;
  fetchUsers: () => AxiosPromise<User[]>;
  posts: RemoteData<Post[], ErrorResponse>;
  users: RemoteData<User[], ErrorResponse>;
};

const UsersPostsContainer = ({
  fetchPosts,
  fetchUsers,
  posts,
  users,
}: UsersPostsContainerProps) => {
  React.useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, [fetchPosts, fetchUsers]);

  return (
    <>
      <h1 className="page-title">(Multiple) Users & Posts</h1>
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
    </>
  );
};

const mapStateToProps = ({ posts, users }: StoreState) => ({
  posts: posts.posts,
  users: users.users,
});
const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>,
) => ({
  fetchPosts: () => dispatch(fetchPostsAction()),
  fetchUsers: () => dispatch(fetchUsersAction()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPostsContainer);
