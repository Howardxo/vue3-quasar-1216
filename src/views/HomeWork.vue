<template>
  <div class="zipcode-form">
    <!-- 郵遞區號輸入欄位 -->
    <label for="zipcode">郵遞區號</label>
    <div class="zipcode-input-container">
      <input
        type="text"
        v-model="zipcode"
        id="zipcode"
        class="input-field"
        placeholder="請輸入郵遞區號"
      />
      <button @click="searchByZipcode" class="search-button">搜尋</button>
    </div>

    <!-- 縣市選擇下拉欄 -->
    <label for="city">縣市</label>
    <select
      v-model="selectedCity"
      @change="filterRegions"
      id="city"
      class="select-field"
    >
      <option value="" disabled>請選擇縣市</option>
      <option v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </option>
    </select>

    <!-- 區域選擇下拉欄 -->
    <label for="region">區域</label>
    <select
      v-model="selectedRegion"
      @change="handleRegionChange"
      id="region"
      class="select-field"
    >
      <option value="" disabled>請選擇區域</option>
      <option
        v-for="region in filteredRegions"
        :key="region.zip"
        :value="region.name"
      >
        {{ region.name }}
      </option>
    </select>

    <!-- 顯示錯誤訊息 -->
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      zipcode: "", // 用來綁定郵遞區號
      selectedCity: "", // 用來綁定所選縣市
      selectedRegion: "", // 用來綁定所選區域
      cities: [], // 縣市列表
      filteredRegions: [], // 根據選擇的縣市篩選出的區域
      zipcodeData: null, // 存儲從 API 獲得的郵遞區號資料
      error: "", // 錯誤訊息
    };
  },
  created() {
    // 當組件創建時請求郵遞區號資料
    axios
      .get("/api/zipcodeData.json")
      .then(({ data }) => {
        this.zipcodeData = data; // 保存郵遞區號資料
        this.cities = Object.keys(data); // 獲取縣市名稱
      })
      .catch((error) => {
        console.error("錯誤:", error);
        this.error = "無法加載郵遞區號資料，請稍後再試。"; // 顯示錯誤訊息
      });
  },
  methods: {
    // 根據郵遞區號搜尋縣市和區域
    searchByZipcode() {
      if (this.zipcode.length === 3) {
        let found = false;
        // 遍歷所有縣市資料，根據郵遞區號找到對應的縣市和區域
        for (let city of this.cities) {
          const regions = this.zipcodeData[city];
          const region = regions.find((r) => r.zip === this.zipcode);
          if (region) {
            this.selectedCity = city; // 自動填入縣市
            this.selectedRegion = region.name; // 自動填入區域
            this.filteredRegions = regions; // 更新篩選後的區域
            found = true;
            this.error = ""; // 清除錯誤訊息
            break;
          }
        }
        if (!found) {
          this.selectedCity = "";
          this.selectedRegion = "";
          this.filteredRegions = [];
          this.error = "無法找到對應的縣市區域，請檢查郵遞區號。";
        }
      } else {
        this.error = "請輸入有效的三位數郵遞區號。";
      }
    },

    // 根據所選的縣市篩選區域
    filterRegions() {
      this.filteredRegions = this.selectedCity
        ? this.zipcodeData[this.selectedCity]
        : [];
      this.selectedRegion = ""; // 清空已選擇的區域
      this.zipcode = ""; // 清空郵遞區號
    },

    // 當區域改變時，自動填充對應的郵遞區號
    handleRegionChange() {
      const regionData = this.zipcodeData[this.selectedCity]?.find(
        (region) => region.name === this.selectedRegion
      );
      if (regionData) {
        this.zipcode = regionData.zip; // 填充郵遞區號
      }
    },
  },
};
</script>

<style scoped>
.zipcode-form {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-field,
.select-field {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.select-field {
  height: 35px;
}

.input-field:focus,
.select-field:focus {
  outline-color: #4a90e2;
  border-color: #4a90e2;
}

.zipcode-input-container {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.search-button {
  padding: 8px 12px;
  margin-left: 8px;
  border: 1px solid #ccc;
  background-color: #4a90e2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #357ab7;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}
</style>
