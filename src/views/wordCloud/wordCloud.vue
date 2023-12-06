<template>
  <div class="container">
    <div class="word_cloud" id="words_cloud">.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import "echarts-wordcloud"
import * as echarts from "echarts"
import axios from "axios"

interface Data {
  name: string
  value: number
}
const words_cloud = ref<Data[]>([])
const request = axios.create({
  baseURL: "http://127.0.0.1:5000/"
})
const getLoginInfo = () => {
  return request({
    method: "GET",
    url: "/compkeyfinal/52"
  })
}
onMounted(() => {
  getLoginInfo()
    .then((res) => {
      const dataFromApi: Data[] = res.data.map((word: any) => ({
        name: word.compkeyname,
        value: word.value
      }))
      words_cloud.value = dataFromApi
      console.log("start")
      console.log(words_cloud.value)
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
  console.log("abc")

  let chartDom = document.getElementById("words_cloud")

  echarts.init(chartDom).dispose()
  let myChart = echarts.init(chartDom)

  myChart.setOption({
    series: [
      {
        type: "wordCloud",
        data: data,
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
.container {
  width: 100%;
  height: 100%;
  /* background-color: black; */
}
.container .word_cloud {
  width: 80%;
  height: 600px;
}
</style>
