<template>
  <q-page class="q-pa-md">
    <!-- 歡迎區塊 -->
    <q-banner class="q-mb-md" color="primary" text-color="white">
      <div class="text-h6">歡迎來到我們的系統！</div>
      <div>這裡是您管理和查看資訊的地方。</div>
    </q-banner>

    <!-- 主要功能區塊 -->
    <div class="q-gutter-md">
      <div class="row">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="col-12 col-md-6"
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ feature.title }}</div>
              <p>{{ feature.description }}</p>
            </q-card-section>
            <q-card-actions>
              <q-btn
                :label="feature.buttonLabel"
                color="primary"
                flat
                @click="goToFeature(feature.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!-- 最新資訊區塊 -->
    <div class="q-mt-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">最新資訊</div>
          <q-separator />
          <q-list>
            <q-item v-for="(news, index) in newslist" :key="index" clickable>
              <q-item-section>
                <div class="text-body1">{{ news.title }}</div>
                <div class="text-caption">{{ news.date }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import apiservice from "@/utils/ApiService";

interface Feature {
  id: number;
  title: string;
  description: string;
  buttonLabel: string;
}

interface News {
  title: string;
  date: string;
}

interface Features {
  features: Feature[];
}

interface NewsList {
  newslist: News[];
}

const features = ref([] as Feature[]);
const newslist = ref([] as News[]);

const fetchData = async () => {
  const data = await apiservice.fetchApi<Features>("/api/features.json");
  if (data?.features) {
    features.value = data.features;
  }
  const data2 = await apiservice.fetchApi<NewsList>("/api/newslist.json");
  if (data2?.newslist) {
    newslist.value = data2.newslist;
  }
};

// 功能區塊點擊跳轉
const goToFeature = (featureId: number) => {
  console.log(`跳轉到功能區塊 ${featureId}`);
  // 這裡可以根據功能 ID 跳轉到相應頁面
};

fetchData();
</script>

<style scoped>
.q-banner {
  margin-bottom: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-12 {
  width: 100%;
}

.col-md-6 {
  width: 48%;
  margin-right: 4%;
}

.q-card {
  min-height: 200px;
}
</style>
