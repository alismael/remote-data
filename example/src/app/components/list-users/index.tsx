import * as React from 'react';
import { User, ErrorResponse } from '../../models';

export const UsersLoading = () => <>Loading users...</>;
export const UsersError = ({ err }: { err: ErrorResponse }) => <>{err.error}</>;

const ListUsers = ({ data }: { data: User[] }) => (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
      </tr>
    </thead>
    <tbody>
      {data.map((u) => (
        <tr key={u.id}>
          <th scope="row">{u.id}</th>
          <td>{u.username}</td>
          <td>{u.email}</td>
          <td>{u.name}</td>
          <td>{u.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListUsers;
