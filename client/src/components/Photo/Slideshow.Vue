<template>
<div>
  <v-carousel class="cara" app >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
      cycle
    ></v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
import PhotoService from '@/services/PhotoService'
export default {
  data () {
    return {
      items: [{
        src: 'http://localhost:8081/famphoto/fermi-moon-1280x640.jpg'
      }]
    }
  },
  methods: {
    updateList: async function () {

    }
  },
  created: async function () {
    var arr = []
    const list = await PhotoService.getlist()
    const baseURL = await PhotoService.getBaseURL()

    // console.log(list)
    for (const img in list.data) {
      arr.push({src: baseURL + list.data[img]})
    }
    // console.log(this.$data.items[0].src)
    this.$data.items = arr
    // console.log(this.$items)
  }
}
</script>

<style>
.cara,
.cara .v-window__container,
.cara .v-window,
.cara .v-carousel__item,
.cara .v-responsive {
  height: 100% !important;
  width: 100% !important;
  background-size: contain;
  object-fit: contain;
  display: block;
}

 </style>
