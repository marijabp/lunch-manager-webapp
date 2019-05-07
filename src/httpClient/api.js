import axios from 'axios';

export default axios.create(
    {
        baseURL: process.env === 'development' ? 'http://localhost:8080' : 'https://lunch-manager-webapp.herokuapp.com',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' :'application/json',
          'Access-Control-Allow-Methods' : ["POST", "GET", "PUT", "DELETE", "OPTIONS"]
        },
      }
);
