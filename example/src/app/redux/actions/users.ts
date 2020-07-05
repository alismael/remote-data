import users from '../../services/users';

export const FETCH_USERS = 'FETCH_USERS';

const fetchUsers = () => users.fetchUsers();

export { fetchUsers };
