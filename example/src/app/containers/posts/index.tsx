import * as React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState, Post, ErrorResponse } from '../../models';
import { RemoteData, RemoteComponent } from 'remote-data';
import { fetchPosts as fetchPostsAction } from '../../redux/posts/actions';
import { PostsError, PostsLoading, ListPosts } from '../../components';
import { AxiosPromise } from 'axios';

type PostsContainerProps = {
  fetchPosts: () => AxiosPromise<Post[]>;
  posts: RemoteData<Post[], ErrorResponse>;
};

const PostsContainer = ({ fetchPosts, posts }: PostsContainerProps) => {
  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <RemoteComponent
        remote={{ posts }}
        loading={PostsLoading}
        reject={({ posts }) => <PostsError error={posts.error} />}
        success={({ posts }) => <ListPosts posts={posts.data} />}
      />
    </>
  );
};

const mapStateToProps = ({ posts }: StoreState) => ({
  posts: posts.posts,
});
const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>,
) => ({
  fetchPosts: () => dispatch(fetchPostsAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
