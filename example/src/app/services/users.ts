import { api } from 'remote-data';
import { User, ErrorResponse } from '../models';
import { FETCH_USERS } from '../redux/users/constants';

const fetchUsers = () =>
  api<User[], ErrorResponse>({
    method: 'GET',
    url: 'users',
    baseURL: 'https://jsonplaceholder.typicode.com/',
    action: FETCH_USERS,
  });

export default {
  fetchUsers,
};
