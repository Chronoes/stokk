import axios, {get, post} from 'axios';
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
    return new Error('Need token to get stocks!');
  }

  static addNewStockWithToken(symbol, token) {
    if (token) {
      const {id} = decode(token);
      return post(`/api/users/${id}/stocks`, {symbol}, ApiService.createAuthenticatedConfig(token));
    }
    return new Error('Need token to get stocks!');
  }

  static searchStocks(searchString) {
    return get(`/api/stocks/${searchString}`);
  }

  static deleteStockWithToken(symbol, token) {
    if (token) {
      const {id} = decode(token);
      return axios.delete(`/api/users/${id}/stocks/${symbol}`, ApiService.createAuthenticatedConfig(token));
    }
    return new Error('Need token to delete stocks!');
  }

  static getStockById(id) {
    if (typeof id === 'number' && id % 1 === 0) {
      return axios.get(`/api/stocks/${id}`);
    }
    return new Error('Stock id needs to be an integer!');
  }
}

export default ApiService;
