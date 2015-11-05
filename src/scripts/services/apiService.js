import {get, post} from 'axios';
import {decode} from 'jsonwebtoken';

class ApiService {
  static createAuthenticatedConfig(token) {
    return {headers: {Authorization: `Bearer ${token}`}};
  }

  static register(email, password) {
    return post('/api/users/register', {email, password});
  }

  static login(email, password) {
    return post('/api/users/login', {email, password});
  }

  static getStocksWithToken(token) {
    if (token) {
      const {id} = decode(token);
      return get(`/api/users/${id}/stocks`, ApiService.createAuthenticatedConfig(token));
    }
    throw new Error('Need token to get stocks!');
  }

  static searchStocks(searchString) {
    return get(`api/stocks/${searchString}`);
  }
}

export default ApiService;
