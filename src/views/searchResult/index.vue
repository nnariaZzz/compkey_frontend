<template>
  <div class="container">
    <div class="header">
      <el-button :icon="HomeFilled" circle size="large"/>
      <!--      用户历史入口-->
      <el-button :icon="UserFilled" circle size="large"/>
    </div>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
@import "@/assets/css/main.css";

/*header*/
.header {
  width: 100%;
  position: absolute;
  top: 0;
  padding: 30px;
}

:deep(.el-button.is-circle) {
  padding: 0;

}

:deep(.el-icon) {
  font-size: 16px;
}

.container {
  background-image: url('@/assets/img/banner-bg.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  padding: 290px 0px 180px 0px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
