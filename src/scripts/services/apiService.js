import {post} from 'axios';

class ApiService {
  register(email, password) {
    return post('/api/register', {email, password});
  }

  login(email, password) {
    return post('/api/login', {email, password});
  }
}

// singleton
export default new ApiService();
