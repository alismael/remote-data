import { api } from 'remote-data';
import { User } from '../models';
import { FETCH_USERS } from '../redux/actions/users';

const fetchUsers = () => {
  return api<User[], string>({
    method: 'GET',
    url: 'users',
    baseURL: 'https://jsonplaceholder.typicode.com/',
    action: FETCH_USERS,
  });
};

export default {
  fetchUsers,
};
