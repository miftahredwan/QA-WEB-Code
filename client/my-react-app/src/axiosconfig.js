// // import axios from 'axios'

// // const axiosBase = axios.create({
// //     // baseURL: 'http://localhost:5500/api/',
// //     // eslint-disable-next-line no-undef
// //     baseURL: process.env.REACT_APP_BACKEND_URL,
// // })

// // export default axiosBase

// import axios from 'axios';

// const axiosBase = axios.create({
//     // eslint-disable-next-line no-undef
//     baseURL: process.env.REACT_APP_BACKEND_URL,
// });

// export default axiosBase;


import axios from 'axios';

const axiosBase = axios.create({
    // eslint-disable-next-line no-undef
    // baseURL: process.env.REACT_APP_BACKEND_URL,

    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_BACKEND_URL 
    // || 'https://qa-web-code-8.onrender.com', // fallback URL
});

console.log('Axios base URL:', axiosBase.defaults.baseURL);

export default axiosBase;
