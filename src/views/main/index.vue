<template>
  <div class="container">
    <div class="header">
      <el-button :icon="HomeFilled" circle size="large"/>
      <!--      用户历史入口-->
      <el-button :icon="UserFilled" circle size="large"/>
    </div>
    <div class="content" style="display:flex;align-items:center;flex-direction:column;">
      <div class="title">
        <p style="font-size:20px;font-weight:550;">Comkey Recommendation System</p>
        <p style="font-size:55px;font-weight:800;margin: 30px 0px;">竞争性关键词推荐系统</p>
      </div>
      <form autocomplete="off" action="">
        <div class="finder">
          <div class="finder__outer">
            <div class="finder__inner">
              <div class="finder__icon" ref="icon"/>
              <input class="finder__input" type="text" name="q" v-model="seedKey"/>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {getCompkey} from '@/api/seedKey/index'
import {
  UserFilled,
  HomeFilled
} from "@element-plus/icons-vue"
import {searchResultType} from "@/api/seedKey/index";
import {useRouter} from "vue-router";

const router = useRouter()
const seedKey = ref()

onMounted(() => {
  const input = document.querySelector(".finder__input");
  const finder = document.querySelector(".finder");
  const form = document.querySelector("form");

  input.addEventListener("focus", () => {
    finder.classList.add("active");
  });

  input.addEventListener("blur", () => {
    if (input.value.length === 0) {
      finder.classList.remove("active");
    }
  });

  //搜素
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    getCompkey(seedKey.value).then((res) => {
      router.push({path: '/result', query: {result: JSON.stringify(res)}})
    }).catch((err) => {
      console.log(err)
    })
    finder.classList.add("processing");
    finder.classList.remove("active");
    input.disabled = true;
    setTimeout(() => {
      finder.classList.remove("processing");
      input.disabled = false;
      if (input.value.length > 0) {
        finder.classList.add("active");
      }
    }, 1000);
  });
})
</script>

<style scoped>
@import "@/assets/css/main.css";

:deep(.el-button.is-circle) {
  padding: 0;

}

:deep(.el-icon) {
  font-size: 16px;
}

.title {
  color: white;
  position: relative;
  top: 150px;
  text-align: center;
}

/*搜索框*/
form {
  transition: all 0.5s;
  position: absolute;
  top: 50%;
  transform: translateY(20%);
}

.finder {
  border: 1px solid #fff;
  background-color: #f6f5f0;
  border-radius: 15px;
  padding: 8px;
  box-shadow: 9px 9px 16px rgba(189, 189, 189, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);
}

.finder__outer {
  display: flex;
  width: 1000px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: inset 10px 10px 15px -10px #c3c3c3, inset -10px -10px 15px -10px #ffffff;
}

.finder__inner {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
}

.finder__form {
  flex: 1;
  height: calc(100% + 3rem);
}

.finder__input {
  height: calc(100% + 3rem);
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1.5rem;
  letter-spacing: 0.75px;
}

.finder__icon {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  transition: all 0.2s;
  box-shadow: inset 0 0 0 20px #292929;
  border-radius: 50%;
  position: relative;
}

.finder__icon:after, .finder__icon:before {
  display: block;
  content: "";
  position: absolute;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.finder__icon:after {
  width: 10px;
  height: 10px;
  background-color: #292929;
  border: 3px solid #f6f5f0;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  left: 0px;
  right: 0;
  margin: auto;
  border-radius: 50%;
}

.active .finder__icon:after {
  border-width: 10px;
  background-color: #f6f5f0;
}

.finder__icon:before {
  width: 4px;
  height: 13px;
  background-color: #f6f5f0;
  top: 50%;
  left: 20px;
  transform: rotateZ(45deg) translate(-50%, 0);
  transform-origin: 0 0;
  border-radius: 4px;
}

.active .finder__icon:before {
  background-color: #292929;
  width: 6px;
  transform: rotateZ(45deg) translate(-50%, 25px);
}

.processing .finder__icon {
  transform-origin: 50%;
  animation: spinner 0.3s linear infinite;
  animation-delay: 0.5s;
}

.active .finder__icon {
  transform: translateY(-5px);
}

@keyframes spinner {
  0% {
    transform: rotateZ(45deg);
  }
  100% {
    transform: rotateZ(405deg);
  }
}
</style>
