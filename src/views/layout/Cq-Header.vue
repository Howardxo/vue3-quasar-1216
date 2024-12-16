<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-btn flat dense round @click="callback" aria-label="Menu" icon="menu" />

      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref, defineProps, toRef, defineEmits } from "vue";
// const leftDrawerOpen = ref(true);

const props = defineProps({
  leftDrawerOpen: Boolean,
});

const emit = defineEmits(["switchMenu"]);

const callback = () => {
  emit("switchMenu");
};
</script>
