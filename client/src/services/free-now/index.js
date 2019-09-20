import axios from 'axios';
const ENV_URL = 'http://localhost:5000';

const FREE_NOW_API = `${ENV_URL}/free-now/vehicles`;

function getTaxis() {
    return axios.get(FREE_NOW_API)
}

export default getTaxis;
