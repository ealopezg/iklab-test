<script setup>
import Navbar from "@/components/navbar.vue"
import { onMounted } from "vue"
import { useCounterStore } from "./stores/counter";

onMounted(() => {
  window.addEventListener("beforeunload", async (event) => {
    const counterStore = useCounterStore();
    if (counterStore.connected) {
      await counterStore.disconnect();
      console.log("Disconnecting");
    }
    return false;
  });

});
</script>


<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <Navbar></Navbar>
    </div>
    <div class="row align-items-center">
      <div class="col">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>
