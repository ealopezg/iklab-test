<template>
    <div class="container">
        <div class="card">
        <div class="card-body">
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Nombre de usuario o email</label>
                    <input type="text" class="form-control" v-model="loginData.username">
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" v-model="loginData.password">
                </div>
                <h6 class="text-danger">{{ errors }}</h6>
                <button class="btn btn-primary" @click="login()">Iniciar Sesión</button>
        </div>
        </div>
        
    </div>
</template>

<script setup>
import {ref} from "vue"
import { useAuthStore } from '@/stores/auth.js';
const authStore = useAuthStore();
const loginData = ref({
    username: "",
    password: ""
});

const errors = ref("");

async function login() {
    const isLogin = await authStore.login(loginData.value.username, loginData.value.password);
    if (!isLogin) {
        errors.value = "Usuario o contraseña inválido"
    }
}  
</script>

<style lang="scss" scoped>
.card{
    max-width: 300px;
}
</style>