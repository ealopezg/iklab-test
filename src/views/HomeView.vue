<script setup>
import { count } from "../api"
import { useCounterStore } from "../stores/counter";
import { ref } from 'vue';
import NumberCard from "../components/NumberCard.vue";
const number = ref(1);
const device_id = ref("DEMO001A1L1Z1MC3");
const counter = useCounterStore();


async function handleCommand(type) {
  await counter.command(type, device_id.value, number.value);
}

</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div div class="col">
          <NumberCard title="Saliendo" :number="counter.data.counting_out"></NumberCard>
        </div>
        <div class="col">
          <NumberCard title="Entrando" :number="counter.data.counting_in"></NumberCard>
        </div>

        <div class="col">
          <NumberCard title="Aforo Actual" :number="counter.data.current_aforo"></NumberCard>
        </div>
        <div class="col">
          <NumberCard title="Cap. Máxima" :number="counter.data.max_capacity"></NumberCard>
        </div>
        <div class="col">
          <NumberCard title="Ocupación" :number="counter.data.occupancy"></NumberCard>
        </div>
      </div>
      <div class="row mt-4 justify-content-center">
        <div class="col-3">
          <div class="row">
            <span>ID Área: {{ counter.data.area_id }}</span><br>
            <span>ID Cliente: {{ counter.data.client_id }}</span><br>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">ID Dispositivo</span>
              <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" v-model="device_id">
            </div>
          </div>
          <div class="row">
            <h2>Modificar contador</h2>
            <div class="input-group mb-3">
              <button class="btn btn-outline-secondary" type="button" id="button-sub"
                @click="handleCommand('manual-sub')">-</button>
              <input type="text" class="form-control" v-model="number" style="max-width: 200px">
              <button class="btn btn-outline-secondary" type="button" id="button-add"
                @click="handleCommand('manual-add')">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
