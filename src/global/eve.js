import axios from 'axios';

const headers = {
    post: {'Content-Type': 'application/json'},
};

const eveUrl = 'http://localhost:9090';
const config = {
    baseURL: `${eveUrl}/api/`,
    headers,
};

export const eve = axios.create(config);
