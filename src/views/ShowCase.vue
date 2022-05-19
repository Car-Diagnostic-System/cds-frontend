<template>
  <AppLayout>
    <h1>Show Case</h1>
    {{ selected }}
    <div>
      <select class="border p-6" v-model="selected.brand">
        <option v-for="brand in brands" :value="brand" :key="brand">
          {{ brand }}
        </option>
      </select>
      <select class="border p-6" v-model="selected.model">
        <option v-for="model in models" :value="model" :key="model">
          {{ model }}
        </option>
      </select>
      <select class="border p-6" v-model="selected.nickname">
        <option
          v-for="nickname in nicknames"
          :value="nickname.nickname"
          :key="nickname"
        >
          {{ nickname.nickname }}
        </option>
      </select>
      <button @click="onClick">fetch</button>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.component.vue'
import CarService from '@/services/CarService'
export default {
  name: 'ShowCase',
  components: {
    AppLayout
  },
  data() {
    return {
      cars: [],
      selected: {
        brand: '',
        model: '',
        nickname: ''
      }
    }
  },
  created() {
    CarService.getAllCars().then((res) => {
      this.cars = res.data
    })
  },
  computed: {
    brands() {
      return Object.keys(this.cars)
    },
    models() {
      if (this.selected.brand) {
        let model = this.cars[this.selected.brand].map((car) => car.model)
        model = [...new Set(model)]
        return model
      }
      return []
    },
    nicknames() {
      if (this.selected.model) {
        return this.cars[this.selected.brand].filter((model) => {
          return model.model === this.selected.model
        })
      }
      return []
    }
  },
  methods: {
    onClick() {
      alert(JSON.stringify(this.selected))
    }
  }
}
</script>
