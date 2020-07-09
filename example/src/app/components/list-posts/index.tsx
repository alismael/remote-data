import * as React from 'react';
import { Post, ErrorResponse } from '../../models';

export const PostsLoading = () => <>Loading posts...</>;
export const PostsError = ({ error }: { error: ErrorResponse }) => <>{error.error}</>;

const ListPosts = ({ posts }: { posts: Post[] }) => (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>
        <th scope="col">Title</th>
        <th scope="col">Body</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((p) => (
        <tr key={p.id}>
          <th scope="row">{p.id}</th>
          <td>{p.userId}</td>
          <td>{p.title}</td>
          <td>{p.body}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListPosts;
