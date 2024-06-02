import axios from 'axios';
import Cookies from 'js-cookie';

// Axios instance with default configuration
const instance = axios.create({
  // baseURL: 'https://backend-nkmuh2i6ga-el.a.run.app/api/v1', // Your API base URL
  timeout: 10000, // Timeout in milliseconds
  // Other default config options...
});

// Request interceptor to send all cookies
instance.interceptors.request.use(
  (config) => {
    // Add all cookies to the request headers
    config.withCredentials = true;
    const allCookies = document.cookie.split(';').reduce((cookies, cookie) => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = decodeURIComponent(value);
      return cookies;
    }, {});

    config.headers.Cookie = Object.entries(allCookies)
      .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
      .join('; ');
      console.log(allCookies)
      console.log(config.headers.Cookie)

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to store all cookies
instance.interceptors.response.use(
  (response) => {
    // Get cookies from the response headers
    const responseCookies = response.headers['set-cookie'];

    if (responseCookies) {
      responseCookies.forEach((cookie) => {
        const cookieParts = cookie.split(';')[0].split('=');
        const name = cookieParts[0];
        const value = cookieParts[1];
        Cookies.set(name, value); // Store cookie using js-cookie
      
      });
    }
    console.log(Cookies)
    console.log(responseCookies);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
