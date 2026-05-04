// // import axios from 'axios';
// // import * as Keychain from 'react-native-keychain';
 
// // const api = axios.create({
// //   baseURL: 'http://payo-app.duckdns.org:3000',
// //   timeout: 10000,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });
 
// // // ✅ FIXED INTERCEPTOR - Skips auth for login/register/otp
// // api.interceptors.request.use(
// //   async (config) => {
// //     // List of endpoints that don't need authentication
// //     const skipAuthPaths = ['/login', '/register', '/send-otp', '/verify-otp'];
// //     // Check if current URL needs to skip authentication
// //     const shouldSkipAuth = skipAuthPaths.some(path => config.url.includes(path));
// //     if (shouldSkipAuth) {
// //       return config;  // No token added for these endpoints
// //     }
// //     // For all other endpoints, add the token
// //     try {
// //       const credentials = await Keychain.getGenericPassword();
// //       if (credentials && credentials.password) {
// //         config.headers.Authorization = `Bearer ${credentials.password}`;
// //       }
// //       return config;
// //     } catch (error) {
// //       console.log('Interceptor error:', error);
// //       return config;
// //     }
// //   },
// //   (error) => Promise.reject(error)
// // );
 
// // export default api;

// import axios from 'axios';
// import * as Keychain from 'react-native-keychain';

// const api = axios.create({
//   baseURL: 'http://payo-app.duckdns.org:3001',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const getToken = () => {
//   const credentials = Keychain.getGenericPassword();
//   if (credentials) {
//     return credentials.password;
//   }
//   return null;
// };

// // ✅ CORRECT FOR YOUR BACKEND
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const credentials = await Keychain.getGenericPassword();

//       if (credentials) {
//         const token = credentials.password;

        
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     } catch (error) {
//       console.log('Interceptor error:', error);
//       return config;
//     }
//   },
//   (error) => Promise.reject(error)
// );

// export default api;



import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const api = axios.create({
  baseURL: 'http://payo-app.duckdns.org:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ FIXED (async + no error)
export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.log('GetToken error:', error);
    return null;
  }
};

// ✅ REQUEST INTERCEPTOR (no change needed, just safe)
api.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const token = credentials.password;
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log('Interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default api;