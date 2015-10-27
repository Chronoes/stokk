import {post} from 'axios';

class ApiService {
  static register(email, password) {
    return post('/api/register', {email, password});
  }

  static login(email, password) {
    return post('/api/login', {email, password});
  }
}

export default ApiService;
