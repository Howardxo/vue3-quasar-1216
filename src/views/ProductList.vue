<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>產品列表</q-toolbar-title>
      <q-btn label="新增產品" color="primary" @click="addProduct" />
    </q-toolbar>

    <div class="row q-col-gutter-md q-mt-md">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        v-for="product in products"
        :key="product.id"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2 text-positive">
              價錢:NTD{{ product.price.toFixed(2) }}
            </div>
          </q-card-section>

          <q-card-actions>
            <q-chip
              :color="product.inStock ? 'green' : 'red'"
              text-color="white"
              outline
            >
              {{ product.inStock ? "有庫存" : "缺貨" }}
            </q-chip>
          </q-card-actions>

          <q-card-actions align="right">
            <q-btn
              label="編輯"
              color="primary"
              @click="editProduct(product.id)"
            />
            <q-btn
              label="刪除"
              color="negative"
              @click="deleteProduct(product.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import apiservice from "../utils/ApiService";

// 定義產品資料介面
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

interface Products {
  products: Product[];
}

const products = ref([] as Product[]);

const fetchData = async () => {
  const data = await apiservice.fetchApi<Products>("/api/products.json");
  if (data?.products) {
    products.value = data.products;
  }
};

const addProduct = () => {
  alert("新增產品功能尚未完成");
};

const editProduct = (id: number) => {
  alert("正在編輯產品ID: " + id);
};

const deleteProduct = (id: number) => {
  alert("產品 ID: " + id + " 已刪除");
};

fetchData();
</script>
