<template>
  <div class="container">
    <div class="header">
      <el-button :icon="HomeFilled" circle size="large"/>
      <!--      用户历史入口-->
      <el-button :icon="UserFilled" circle size="large"/>
    </div>

    <div class="content" style="display:flex;flex-direction:row;margin-top: 60px">
      <div class="left">
        <div class="search" style="display: flex;flex-direction: row">
          <el-input style="margin-right: 10px" v-model="seedKey"/>
          <el-button type="message" circle :icon="Search" size="large"/>
        </div>
        <el-card style="overflow-y: auto;margin-top: 30px;height: 550px;">
          <el-table :data="compkeyList" style="width: 100%;">
            <el-table-column prop="name" label="关键词" width="180"/>
            <el-table-column prop="weights" label="权重" width="180"/>
          </el-table>
        </el-card>
      </div>

      <div class="right">
        <div class="seedKeyDetails">
          <div class="column">
            <div
                style="width: 100px;height: 100px;border: 1px solid #a9a9a9;border-radius: 50%;text-align: center;margin-bottom: 10px">
              <p style="font-size: 30px;font-weight: 800;margin-bottom: 20px;line-height: 100px">{{ seedKey }}</p>
            </div>
            <p style="color: grey">搜索量：{{ seedKeyVolumn }}</p>
          </div>
          <div class="column">
            <div
                style="width: 100px;height: 100px;border: 1px solid #a9a9a9;border-radius: 50%;text-align: center;margin-bottom: 10px">
              <p style="font-size: 30px;font-weight: 800;margin-bottom: 20px;line-height: 100px">{{ seedKey }}</p>
            </div>
            <p style="color: grey">总搜索量：{{ seedKeyVolumn }}</p>
          </div>
          <div class="column">
            <div class="showData">
              <p class="num">{{ midkeyList.length }}</p>
              <p class="label">中介关键词个数</p>
            </div>
            <div class="showData">
              <p class="num">{{ compkeyList.length }}</p>
              <p class="label">竞争关键词个数</p>
            </div>
          </div>
        </div>
        <div class="wordle"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {
  UserFilled,
  HomeFilled,
  Search
} from "@element-plus/icons-vue"
import {useRoute} from "vue-router";

const route = useRoute()

const searchResult = JSON.parse(route.query.result)

const seedKey = searchResult.seed_keyword
const seedKeyVolumn = searchResult.seed_keyword_volume
const midkeyList = []
const compkeyList = []

searchResult.compkeys_final.forEach((item) => {
  compkeyList.push({
        name: item[0],
        weights: item[1]
      }
  )
})

searchResult.mid_kewords.forEach((item) => {
  midkeyList.push({
    id: item.id,
    name: item.midkeyname,
    midkeyvalue: item.midkeyvalue,
    compkeys: item.compkeys
  })
})
console.log(compkeyList)
console.log(searchResult)
</script>

<style scoped>
@import "@/assets/css/main.css";

:deep(.el-button.is-circle) {
  padding: 0;

}

:deep(.el-icon) {
  font-size: 16px;
}

.left {
  width: 60%;
}

.right {
  width: 30%;
  margin-left: 100px;
}

.column {
  margin: 20px;
}

.showData {
  text-align: left;
  margin-bottom: 10px;
}

.showData .num {
  font-weight: 800;
  font-size: 25px;
}

.showData .label {
  color: gray;
}

.seedKeyDetails {
  width: 100%;
  height: 200px;
  border-radius: 1%;
  background-color: rgba(255, 255, 255, 0.95);
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center
}

.wordle {
  width: 100%;
  height: 400px;
  background-color: #fff;
}
</style>
