import axios from 'axios';
const ENV_URL = 'http://localhost:5000';

const SHARE_NOW_API = `${ENV_URL}/share-now/vehicles`;

function getVehicles() {
    return axios.get(SHARE_NOW_API)
}

export default getVehicles;
