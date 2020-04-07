<template>
  <Swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>Welcome!</swiper-slide>
    <swiper-slide v-for="(slide,i) in items" :index="i" :key="i">
        <img v-bind:data-src="slide.src" style="max-height: 80vh;" class="swiper-lazy">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import PhotoService from '@/services/PhotoService'
import 'swiper/css/swiper.css'
export default {
  name: 'carrousel',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: true,
        lazy: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
        // Some Swiper option/callback...
      },
      items: [{
        src: 'http://localhost:8081/famphoto/fermi-moon-1280x640.jpg'
      }]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
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
<style scoped>
.swiper-container {
  height: 100% !important ;
  width: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 38px;
  font-weight: 700;
  background-color: #eee;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

</style>
