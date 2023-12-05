<template>
  <div class="container">
    <el-table
      style="width: 100%"
      height="480"
      stripe
      :data="filterTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    >
      <el-table-column label="种子关键词" prop="seedkeyname" align="center" width="auto" min-width="35%" />
      <el-table-column label="搜索量" prop="seedkeyvolume" align="center" width="auto" min-width="35%">
        <template #default="scope">
          <el-icon><View /></el-icon>{{ " " + scope.row.seedkeyvolume }}
        </template>
      </el-table-column>
      <el-table-column label="竞争关键词" align="center">
        <template #default="scope">
          <div class="keywords-container">
            <div v-for="(key, index) in scope.row.compkeys" :key="index" class="keyword">
              {{ key.id + "." + key.compkeyname }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="auto" min-width="35%">
        <template #header>
          <el-input v-model="search" size="small" placeholder="search" style="border-radius: 30px" />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
            style="border-radius: 30px; border: 2px solid"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue"
import axios from "axios"

interface User {
  seedkeyname: string
  seedkeyvolume: number
  compkeys: string[]
}
const search = ref("")
const tableData = ref<User[]>([])
const request = axios.create({
  baseURL: "http://127.0.0.1:5000/"
})
const getLoginInfo = () => {
  return request({
    method: "GET",
    url: "/myhistory"
  })
}
onMounted(() => {
  getLoginInfo().then((res) => {
    // console.log("res=>", res.data)
    tableData.value = res.data
    console.log(tableData.value)
  })
})
const total = computed(() => tableData.value.length)
const filterTableData = computed(() =>
  tableData.value.filter((data) => {
    // const seedKeysMatch = data.compkeys.some((key) =>
    //   key.compkeyname.toLowerCase().includes(search.value.toLowerCase())
    // )
    const nameMatch = data.seedkeyname.toLowerCase().includes(search.value.toLowerCase())
    return nameMatch
  })
)

const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
const currentPage = ref(5)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
</script>
<style scoped>
.container {
  position: absolute;
  /* border: 1px solid #2d2828; */
  border-radius: 30px;
  width: 80%;
  height: 70%;
  margin: 90px 110px;
  padding: 20px;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.2);
}
.keywords-container {
  display: flex;
  flex-wrap: wrap;
  max-height: 100px; /* 设置最大高度 */
  overflow-y: auto; /* 垂直方向溢出时显示滚动条 */
}

.keyword {
  margin-right: 8px; /* 关键词之间的间距 */
  white-space: nowrap; /* 防止关键词换行 */
}

.keyword:last-child {
  margin-right: 0; /* 最后一个关键词去掉右侧间距 */
}
.demo-pagination-block {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>
