import axios from 'axios'

const baseUrl = 'https://ikcount.com/iklab'

import { useAuthStore } from '../stores/auth';
export async function login(username, password) {
    return await axios.post(`${baseUrl}/api/login`, {
        auth: btoa(`${username}:${password}:IKLAB005`),
        privilegesDetail: true
    }).then(response => {
        return response;
    });
}

export async function count(payload) {
    const authStore = useAuthStore();
    return await axios.post(`${baseUrl}/ikcount/api/livecommand?atoken=${authStore.user.access_token}`, {
        type: payload.type,
        quantity: payload.quantity,
        client: authStore.user.client_id,
        location: payload.location_id,
        macaddress: payload.device_id,
        username: authStore.user.username,
        email: authStore.user.email
    }).then(response => {
        return response;
    }).catch(error => {
        console.log(error);
    });
}
