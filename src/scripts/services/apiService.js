import {post} from 'axios';

class ApiService {
  static register(email, password) {
    return post('/api/users/register', {email, password});
  }

  static login(email, password) {
    return post('/api/users/login', {email, password});
  }
}

export default ApiService;
