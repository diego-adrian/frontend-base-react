import axios from 'axios';

const Auth = {
  getCode: async () => {
    const url = process.env.REACT_APP_BASE_SERVER;
    try {
      const request = {
        method: 'GET',
        url: `${url}api/public/codigo`,
        responseType: 'json'
      };
      const response = await axios(request);
      window.location.href = new URL(response.data.url);
    } catch (error) {
      console.error(error.message);
    }
  }
};

export default Auth;
