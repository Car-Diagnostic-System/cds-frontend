import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
// ***NOTE: This is required for the vue-input-facade to work***
import InputFacade from 'vue-input-facade'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

createApp(App)
  .use(store)
  .use(InputFacade)
  .use(router)
  .use(VueSweetalert2)
  .component('v-select', vSelect)
  .mount('#app')
