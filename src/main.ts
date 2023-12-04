import App from "./App.vue"
import router from "@/router/router"
import { createApp } from "vue"
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(router)
app.mount("#app")
app.use(ElementPlus)
