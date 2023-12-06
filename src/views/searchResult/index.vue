<template>
  <div class="container">
    <div class="header">
        <el-button :icon="HomeFilled" circle size="large" />
      <!--      用户历史入口-->
      <el-button :icon="UserFilled" circle size="large" @click="goHistory" />
    </div>

    <div class="content" style="display:flex;flex-direction:row;margin-top: 60px">
      <div class="left">
        <div class="search" style="display: flex;flex-direction: row">
          <el-input style="margin-right: 10px" v-model="seedKey">
            <template #append>
              <el-select v-model="volume" placeholder="Select" style="width: 115px">
                <el-option value="1" label="1k">1k</el-option>
                <el-option value="10" label="10k">10k</el-option>
                <el-option value="100" label="100k">100k</el-option>
              </el-select>
            </template>
          </el-input>
          <el-button type="message" circle :icon="Search" size="large" @click="getCompkey(seedKey,volume)"/>
        </div>
        <div class="resultCard">
          <el-card style="width: 55%;margin-right: 10px;overflow-y: auto;">
            <el-table :data="midkeyList" style="height: 100%">
              <el-table-column type="selection" width="40" />
              <el-table-column prop="name" label="中介关键词" width="100"/>
              <el-table-column prop="midkeyvalue" label="权重" width="80"/>
              <el-table-column prop="compkeys" label="竞争关键词" width="200"/>
            </el-table>
            <el-button style="width: 15%;margin-top: 10px" @click="">删除</el-button>
          </el-card>
          <el-card style="width: 42%;overflow-y: auto">
            <el-table :data="compkeyList" table-layout="auto" style="height: 100%;">
              <el-table-column prop="name" label="竞争关键词" width="100"/>
              <el-table-column prop="weights" label="权重" width="80"/>
              <el-table-column label="评分">
                <template #default="scope">
                  <el-rate v-model="scope.row.$index" size="small" :colors="colors"/>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
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
            <div id="frequencyChart"></div>
            <!--            <p style="color: grey;transform: translateY(-240%)">总搜索量：{{ seedKeyVolumn }}</p>-->
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

        <div class="wordle">
          <div class="word_cloud" id="words_cloud"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  UserFilled,
  HomeFilled,
  Search
} from "@element-plus/icons-vue"
import {useRoute} from "vue-router";
import * as echarts from 'echarts';
import {ref,onMounted} from "vue";
import {getCompkey, getLoginInfo} from "@/api/seedKey";
import "echarts-wordcloud"
import router from "@/router/router";

type EChartsOption = echarts.EChartsOption

interface Data {
  name: string
  value: number
}

const route = useRoute()

const searchResult = JSON.parse(route.query.result)
const volume = ref(route.query.vol)

const seedKey = ref(searchResult.seed_keyword)
const seed_keyword_id = searchResult.seed_keyword_id
const seedKeyVolumn = searchResult.seed_keyword_volume
const midkeyList = []
const compkeyList = []

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

searchResult.compkeys_final.forEach((item) => {
  compkeyList.push({
        name: item[0],
        weights: item[1]
      }
  )
})

searchResult.mid_keywords.forEach((item) => {
  midkeyList.push({
    id: item.id,
    name: item.midkeyname,
    midkeyvalue: item.midkeyvalue,
    compkeys: Object.keys(item.compkeys)
  })
})

const goHistory= () =>{
  router.push({path:"/searchHistory"})
}
const deleteMid = ()=>{
  const hide = document.querySelector(".el-checkbox is-checked");
  console.log(hide)
}
setTimeout(() => {
  var chartDom = document.getElementById('frequencyChart')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '搜索量',
        type: 'pie',
        radius: '50%',
        data: [
          {value: seedKeyVolumn, name: seedKey},
          {value: volume.value * 1000, name: '总搜索量'}
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
}, 100)

const words_cloud = ref<Data[]>([])
onMounted(() => {
  getLoginInfo(seed_keyword_id)
      .then((res) => {
        const dataFromApi: Data[] = res.map((word: any) => ({
          name: word.compkeyname,
          value: word.value
        }))
        words_cloud.value = dataFromApi
      })
      .catch((error) => {
        console.error("Error fetching login info:", error)
      })
})

onMounted(() => {
  setTimeout(() => {
    wordCloudGraph(words_cloud.value)
  }, 100)
})

const wordCloudGraph = (data: Data[]) => {
  let chartDom = document.getElementById("words_cloud")

  echarts.init(chartDom).dispose()
  let myChart = echarts.init(chartDom)

  myChart.setOption({
    series: [
      {
        type: "wordCloud",
        data: data,
        width: '100%',
        height: '100%',
        shape: "circle", // 词云图显示排列为什么形状，默认 circle，cardioid 心形，diamond 菱形
        textStyle: {
          normal: {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: function () {
              // 随即配色，每次刷新页面都会显示不同颜色
              return (
                  "rgb(" +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(",") +
                  ")"
              )
            }
          }
        },
        emphasis: {
          focus: "self",
          textStyle: {
            textShadowBlur: 10,
            textShadowColor: "#333"
          }
        }
      }
    ]
  })
}
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
  width: 38%;
  margin-left: 30px;
}

.resultCard {
  margin-top: 30px;
  height: 565px;
  display: flex;
  flex-direction: row;
}

:deep(.el-card__body) {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  height: 213px;
  border-radius: 1%;
  background-color: rgba(255, 255, 255);
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

#frequencyChart {
  width: 180px;
  height: 200px;
  transform: translateY(-5%);
}

.word_cloud {
  width: 100%;
  height: 100%;
}
</style>
