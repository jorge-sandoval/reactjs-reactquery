import { Config } from '../models/config';
import { User } from '../models/user';
import BaseService from './baseService';

class UserService extends BaseService<User> {
  constructor(config: Config = { delay: 500, failRate: 0 }, items: User[] = []) {
    super('users', config, items);
  }
}

const defaultUsers = [
  { id: '1', name: 'Jorge O. Sandoval' },
  { id: '2', name: 'Gandalf' },
  { id: '3', name: 'Galadriel' },
];

const userService = new UserService(
  { delay: 1200, failRate: 0.01 },
  defaultUsers
);

export default userService;