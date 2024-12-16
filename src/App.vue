<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="router-link" :to="{ name: 'home' }">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>首頁</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="router-link" :to="{ name: 'product-list' }">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>產品列表</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="router-link" :to="{ name: 'create-product' }">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>新增產品</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="router-link" :to="{ name: 'user-info' }">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>使用者資訊</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="router-link" :to="{ name: 'api-test' }">
          <q-item-section avatar>
            <q-icon name="web" />
          </q-item-section>
          <q-item-section>
            <q-item-label>API 請求測試</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->
    <CqHeader
      :leftDrawerOpen="leftDrawerOpen"
      @switchMenu="switchMenu"
    ></CqHeader>
    <SlideMenu :leftDrawerOpen="leftDrawerOpen"></SlideMenu>
    <q-page-container>
      <router-view></router-view>
      <!-- <span style="font-size: 50px">{{
        `${"isOpen: " + leftDrawerOpen}`
      }}</span> -->
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import SlideMenu from "./views/layout/Slide-Menu.vue";
import CqHeader from "./views/layout/Cq-Header.vue";
import { ref } from "vue";

const leftDrawerOpen = ref(false);

const switchMenu = (value: string) => {
  console.log("HI!switchMenu", value);
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
