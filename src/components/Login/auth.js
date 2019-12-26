import axios from 'axios';

const Auth = {
  getCode: async () => {
    const url = 'http://localhost:4000';
    try {
      const request = {
        method: 'GET',
        url: `${url}/auth`,
        responseType: 'json'
      };
      const response = await axios(request);
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error.message);
    }
  }
};

export default Auth;