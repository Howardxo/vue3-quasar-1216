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
            <q-item v-for="(news, index) in newsList" :key="index" clickable>
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

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const features = ref([]);
const newsList = ref([]);
onMounted(() => {
  axios
    .get("/api/features.json")
    .then(({ data }) => {
      features.value = data;
    })
    .catch((error) => {
      console.error("獲取功能區塊時發生錯誤:", error);
    });
  axios
    .get("/api/newlist.json")
    .then(({ data }) => {
      newsList.value = data;
    })
    .catch((error) => {
      console.error("獲取最新資訊時發生錯誤:", error);
    });
});

// 功能區塊點擊跳轉
const goToFeature = (featureId) => {
  console.log(`跳轉到功能區塊 ${featureId}`);
  // 這裡可以根據功能 ID 跳轉到相應頁面
};
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
