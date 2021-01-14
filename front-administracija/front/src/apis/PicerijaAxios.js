import axios from 'axios';

var PicerijaAxios = axios.create({
  baseURL: 'http://localhost:8080/api',
  /* other custom settings */
});

export default PicerijaAxios;