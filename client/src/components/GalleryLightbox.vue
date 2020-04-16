<template>
  <div id="app" class="Box" >
    <div class="container">
      <!-- <h1> Gallery </h1> -->

      <div class="gallery">
        <div v-for="(client, idx) in images" :key="idx" class="pic" @click="() => showIndex(idx)">
          <img :src="client.src ? client.src : client">
        </div>
      </div>
      
      <vue-easy-lightbox
        :visible="visible"
        :index="index"
        :imgs="images"
        :moveDisabled="false"
        @hide="handleHide"
      />
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  components: {
    VueEasyLightbox
  },
  data () {
    return {
      images: [],
      visible: false,
      index: 0 // default
    }
  },

  mounted () {
    this.importAll(require.context('@/assets', false, /\.(png|jpe?g|svg)$/));
  },

  methods: {
    showUrl (url) {
      // this.index = index
      this.imgs = url
      this.visible = true
    },
    showIndex (index) {
      this.index = index
      this.visible = true
    },
    handleHide () {
      this.visible = false
    },
    importAll (r) {
      r.keys().forEach(key => (this.images.push(r(key))));
    }
  }
}
</script>

<style scoped>
  .Box {
    padding: 0px;
    color: rgb(131, 30, 30);
    margin: 0 0 0 0px;
    /* background: #272727 */
  }
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 70px;
  }
  .gallery {
    /* width: 90%; */
    /* max-width: 2080px; */
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .pic {
    width: calc(30% - 30px);
    margin: 15px;
    cursor: pointer;
  }
  .pic:hover img {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0);
    transform: scale(1.01);
  }
  img {
    width: 100%;
    transition: 0.3s ease;
  }
  .btn {
    cursor: pointer;
    outline: none;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    height: 50px;
    padding: 0 8px;
    margin-left: 20px;
    background-color: #50d1c1;
    border-color: #50d1c1;
    border-radius: 4px;
    color: #fff;
    transition: 0.3s;
  }
  .btn:active {
    color: #ccc;
    background-color: #6ab5ae;
    border-color: #6ab5ae;
    outline: none;
  }
</style>
