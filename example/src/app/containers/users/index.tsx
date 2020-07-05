import * as React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState, User } from '../../models';
import { RemoteData, RemoteDataContainer } from 'remote-data';
import { fetchUsers as fetchUsersAction } from '../../redux/actions/users';
import { UsersLoading, UsersError, ListUsers } from '../../components';

type UsersContainerProps = {
  fetchUsers: () => Promise<void>;
  users: RemoteData<User[], string>;
};
const UsersContainer = ({ fetchUsers, users }: UsersContainerProps) => {
  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="page-title">Users</h1>
      <RemoteDataContainer
        remote={users}
        loading={UsersLoading}
        reject={UsersError}
        success={ListUsers}
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
