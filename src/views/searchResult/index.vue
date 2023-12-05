<template>
  <div class="container">
    <div class="header">
      <el-button :icon="HomeFilled" circle size="large"/>
      <!--      用户历史入口-->
      <el-button :icon="UserFilled" circle size="large"/>
    </div>

    <div class="content" style="display:flex;align-items:center;flex-direction:row;margin-top: 100px">
      <div class="left">
        <div class="search" style="display: flex;flex-direction: row">
          <el-input style="margin-right: 10px" v-model="seedKey"></el-input>
          <el-button type="message" circle :icon="Search" size="large"></el-button>
        </div>
        <el-card style="overflow-y: auto;margin-top: 30px">
          <el-table :data="compkeyList" style="width: 100%">
            <el-table-column prop="name" label="关键词" width="180"/>
            <el-table-column prop="weights" label="权重" width="180"/>
          </el-table>
        </el-card>
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
const compkeyList = []

searchResult.compkeys_final.forEach((item) => {
  compkeyList.push({
        name: item[0],
        weights: item[1]
      }
  )
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

</style>
