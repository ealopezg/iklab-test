<script setup>
import { useAuthStore } from '../stores/auth';
import { useCounterStore } from '../stores/counter';
import { computed } from 'vue';

const counter = useCounterStore();
const authStore = useAuthStore();



async function logout(){
    await authStore.logout();
}

</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Contador</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
          </ul>
          <div class="d-flex">
            <span class="me-2">Conectado Socket: <template v-if="counter.connected">Si</template><template v-else>No</template> </span>
            <button class="btn btn-outline-success" @click="logout()" v-if="authStore.user">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
</template>