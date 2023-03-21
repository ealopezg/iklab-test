import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router';
import { login } from '../api'

import { useCounterStore } from './counter';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            try {
                const user = await login(username, password);
                this.user = user.data;
                localStorage.setItem('user', JSON.stringify(user.data));
                const counter = useCounterStore();
                counter.connect(this.user.access_token);
                router.push(this.returnUrl || '/');
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            const counter = useCounterStore();
            counter.disconnect();
            router.push('/login');
        }
    }
})

