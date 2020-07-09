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
} from '../../components';

type UsersPostsContainerProps = {
  fetchPosts: () => Promise<Post[]>;
  fetchUsers: () => Promise<User[]>;
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
        loading={PostsLoading}
        reject={({ posts, users }) => (
          <>
            <UsersError error={users} />
            <PostsError error={posts} />
          </>
        )}
        success={({ posts, users }) => (
          <>
            <ListUsers users={users} />
            <ListPosts posts={posts} />
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
export default connect(mapStateToProps, mapDispatchToProps)(UsersPostsContainer);
