<template>
  <div id="example">
  <carousel-3d :height="400" >
    <slide v-for="(slide,i) in items" :index="i" :key="i">
        <img v-bind:src="slide.src">
    </slide>
  </carousel-3d>
  </div>
</template>

<script>

import { Carousel3d, Slide } from 'vue-carousel-3d'
import PhotoService from '@/services/PhotoService'
export default {
  data () {
    return {
      items: [{
        src: 'http://localhost:8081/famphoto/fermi-moon-1280x640.jpg'
      }]
    }
  },
  components: {
    Carousel3d,
    Slide
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
