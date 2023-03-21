<template>
    <div class="card">
        <div class="card-body">
            <div class="container">
                <p class="text-center">
                <h3>{{ props.title }}</h3>
                <h1 :class="changed ? 'text-success' : '' " >{{ number }}</h1>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,toRef,watch} from 'vue'
const props = defineProps({
    title: String,
    number: {
        type: Number,
        default: 0
    }
});

const changed = ref(false);

const number = toRef(props, 'number');

watch(number, async (oldNumber, newNumber) => {
    changed.value = true;
    setTimeout(() => changed.value = false, 2000);
})


</script>