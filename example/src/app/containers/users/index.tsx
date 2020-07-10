import * as React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState, User, ErrorResponse } from '../../models';
import { RemoteData, RemoteComponent } from 'remote-data';
import { fetchUsers as fetchUsersAction } from '../../redux/users/actions';
import { UsersLoading, UsersError, ListUsers } from '../../components';

type UsersContainerProps = {
  fetchUsers: () => Promise<User[]>;
  users: RemoteData<User[], ErrorResponse>;
};

const UsersContainer = ({ fetchUsers, users }: UsersContainerProps) => {
  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <h1 className="page-title">Users</h1>
      <RemoteComponent
        remote={{ users }}
        loading={UsersLoading}
        reject={({ users }) => <UsersError error={users.error} />}
        success={({ users }) => <ListUsers users={users.data} />}
      />
    </>
  );
};

const mapStateToProps = ({ users }: StoreState) => ({
  users: users.users,
});
const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, {}, AnyAction>,
) => ({
  fetchUsers: () => dispatch(fetchUsersAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
