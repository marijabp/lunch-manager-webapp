import axios from 'axios';

export default axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' :'application/json',
          'Access-Control-Allow-Methods' : ["POST", "GET", "PUT", "DELETE", "OPTIONS"]
        },
      }
);
