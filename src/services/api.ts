import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.cibernetsolutions.com.br:8443/mdsv/apex_dev/egus.web',
});

export default api