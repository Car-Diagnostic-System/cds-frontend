import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import InputFacade from 'vue-input-facade'
// ***NOTE: This is required for the vue-input-facade to work***
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

createApp(App)
  .use(store)
  .use(InputFacade)
  .use(router)
  .component('v-select', vSelect)
  .mount('#app')
