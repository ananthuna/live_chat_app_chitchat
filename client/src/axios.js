import axios from 'axios'
import { baseUrl } from './url';

const instance = axios.create({
    baseURL: baseUrl,
    
  });

  export default instance