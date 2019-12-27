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
      console.log('-----------------ADRIANNNNNNNNNNn-------------------');
      console.log(new URL(process.env.PUBLIC_URL, response.data.datos.url));
      console.log('------------------------------------');
      window.location.href = new URL(process.env.PUBLIC_URL, response.data.datos.url);
    } catch (error) {
      console.error(error.message);
    }
  }
};

export default Auth;