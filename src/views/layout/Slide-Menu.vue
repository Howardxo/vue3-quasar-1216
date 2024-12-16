<template>
  <q-drawer v-if="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
    <q-list>
      <q-item-label header>Essential Links</q-item-label>
      <q-item
        v-for="(item, index) in menuItems"
        :key="index"
        clickable
        tag="router-link"
        :to="item.to"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
          <q-item-label caption>{{ item.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { defineProps, toRef } from "vue";
import { menuItems } from "@/assets/menuItems"; // 引入外部的 menuItems

const props = defineProps({
  leftDrawerOpen: Boolean,
});

const leftDrawerOpen = toRef(props, "leftDrawerOpen");
</script>
