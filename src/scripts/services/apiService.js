import {post} from 'axios';

class ApiService {
  register(email, password) {
    return post('/api/register', {email, password});
  }
}

// singleton
export default new ApiService();
