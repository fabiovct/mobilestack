// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('@storage_Key')
//       if(value !== null) {
//           console.warn(value)
//         return value;
//       }
//     } catch(e) {
//       // error reading value
//     }
//   }

// const api = axios.create({

//     baseURL: 'http://192.168.15.4:8000/',
    
//     headers: {
//       'Authorization': 'Bearer '+getData(),
//       'Content-Type': 'application/json',
//         //'auth': localStorage.token,
//         //'Content-Type': 'multipart/form-data'
//       }
// });

// export default api;

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {STORAGE_KEYS} from '../constants';
import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:8000' });

instance.interceptors.request.use(async function (config) {

  const myToken = await AsyncStorage.getItem('@storage_Key');
  config.headers['Authorization'] = myToken ? 'Bearer '+myToken : '';
  return config;

});

export default instance; 