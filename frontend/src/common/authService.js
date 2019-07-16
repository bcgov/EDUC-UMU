import axios from 'axios';
import { AuthRoutes } from '@/utils/constants.js';

export default {
  async getAuthToken() {
    try {
      const response = await axios.get(AuthRoutes.TOKEN);
      console.log("Got JWT Token!");
      return response.data;
    } catch (e) {
      console.log(`Failed to acquire JWT token - ${e}`); // eslint-disable-line no-console
      throw e;
    }
  },

  async refreshAuthToken(token) {
    try {
      const response = await axios.post(AuthRoutes.REFRESH, {
        refreshToken: token
      });
      return response.data;
    } catch (e) {
      console.log(`Failed to refresh JWT token - ${e}`); // eslint-disable-line no-console
      throw e;
    }
  }
};