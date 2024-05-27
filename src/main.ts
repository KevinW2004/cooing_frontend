import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// element-plus >>>>
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// <<<< element-plus
// element-plus icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
