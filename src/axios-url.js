import axios from 'axios';

const axiosUrl = axios.create({
    baseURL: 'https://daria-ch-app.firebaseio.com/'
});

export default axiosUrl;