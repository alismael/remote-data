import * as React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState, Post } from '../../models';
import { RemoteData, RemoteComponent } from 'remote-data';
import { fetchPosts as fetchPostsAction } from '../../redux/actions/posts';
import { PostsError, PostsLoading, ListPosts } from '../../components';

type PostsContainerProps = {
  fetchPosts: () => Promise<void>;
  posts: RemoteData<Post[], string>;
};

const PostsContainer = ({ fetchPosts, posts }: PostsContainerProps) => {
  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <RemoteComponent
        remote={posts}
        loading={PostsLoading}
        reject={PostsError}
        success={ListPosts}
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
