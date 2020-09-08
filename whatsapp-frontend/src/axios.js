import axios from 'axios';

const instance = axios.create({
  //this could be heroku
  baseURL: 'http://localhost:9000',
});

export default instance;
