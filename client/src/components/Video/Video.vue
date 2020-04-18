<template>
  <b-container class="bv-example-row main">
    <b-row>
      <b-col cols="8">
        <div id="vue-core-video-player-box" class="example-player">
          <vue-core-video-player :cover="currentMovie.cover3" :src="currentMovie.source"></vue-core-video-player>
        </div>
        <div class="movie-detail">
          <h1 class="title">{{currentMovie.title}}</h1>
          <div class="date">{{currentMovie.author}} - {{currentMovie.date}}</div>
          <div class="desc">{{currentMovie.desc}} </div>
          <div class="btn-wrap">
            <b-button variant="outline-primary" @click="open">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="#ff6060"><path d="M5 15a.502.502 0 0 1-.354-.146l-4-4a.5.5 0 0 1 0-.707l4-4a.5.5 0 0 1 .707.707L1.707 10.5l3.646 3.646a.5.5 0 0 1-.354.853zM15 15a.5.5 0 0 1-.354-.853l3.646-3.646-3.646-3.646a.5.5 0 0 1 .707-.707l4 4a.5.5 0 0 1 0 .707l-4 4a.498.498 0 0 1-.354.146zM7.5 15a.5.5 0 0 1-.424-.765l5-8a.5.5 0 0 1 .848.53l-5 8A.5.5 0 0 1 7.5 15z"/></svg>
              View Code
            </b-button>
          </div>
        </div>
        <div class="recommend-list">
          <RecommendedItem v-for="movie in recommendList" :key="movie.cover" :item="movie"></RecommendedItem>
        </div>
        <div class="thanks">
          ❤ Video Source via Makoto Shinkai and Stephen Chow's Movies
        </div>
      </b-col>
      <b-col cols="4" class="play-list">
        <h2>Play List</h2>
        <MovieItem v-for="movie in movieList" :key="movie.cover" :item="movie"></MovieItem>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MovieItem from './MovieItem.vue'
import RecommendedItem from './Recommended.vue'
// import VueCoreVideoPlayer from 'vue-core-video-player'
// import DATA from '../assets/data'
const videoSource = [
  {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
    resolution: 360
  }, {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
    resolution: 720
  }, {
    src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
    resolution: 1080
  }
]

const DATA = [{
  id: 'gdbzhhifhh',
  title: '5 Centimeters per Second',
  author: 'Makoto Shinkai',
  date: '2007',
  desc: 'The story is set in Japan, beginning in the 1990s up until the present day (2008),[a] with each act centered on a boy named Takaki Tōno. The first act takes place during a time when cell phones are uncommon and email had not yet reached the general population',
  link: 'https://www.youtube.com/watch?v=tr8JzTLlq30',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-5cm.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-5cm-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-5cm-c.jpg',
  source: 'https://media.vued.vanthink.cn/5%20Centimeters%20Per%20Second%20Trailer%20HD.mp4',
  duration: '1:02:35'
}, {
  id: 'hfkhzwgnwx',
  title: 'The Garden of Words',
  author: 'Makoto Shinkai',
  date: '2013',
  desc: 'The Garden of Words is considered a romance[1] and drama film.[2] It opens at the start of the rainy season in Tokyo with Takao Akizuki (秋月 孝雄, Akizuki Takao), a 15-year-old student and aspiring shoemaker, opting to skip his first class and sketch shoe designs in the garden at Shinjuku Gyoen. There he encounters Yukari Yukino (雪野 百香里, Yukino Yukari), a 27-year-old woman who is skipping work and enjoying beer and chocolate.',
  link: 'https://www.bilibili.com/bangumi/play/ss2546/?from=search&seid=5227685957756304310',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-the-garden.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-the-garden-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-the-garden-c.jpg',
  source: 'https://media.vued.vanthink.cn/the_garden_of_words_trailer_english__1080p.mp4',
  duration: '00:46:04'
}, {
  id: 'jiytmghmyo',
  title: 'Your Name',
  author: 'Makoto Shinkai',
  date: '2016',
  desc: "Mitsuha Miyamizu is a high school girl living in the town of Itomori in Japan's mountainous Hida region. She is bored with country life and wishes to be a handsome boy in her next life. She begins to switch bodies intermittently with Taki Tachibana, a high school boy in Tokyo, when they wake up. They communicate by writing messages on paper, their phones, and sometimes on each other's skin. Mitsuha causes Taki to develop a relationship with his coworker Miki, while Taki causes Mitsuha to become popular in school.",
  link: 'https://www.bilibili.com/bangumi/play/ss12044/?from=search&seid=9670386519186098373',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-your-name.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png',
  source: videoSource,
  duration: '01:46:04'
}, {
  id: 'szmnyobnap',
  title: 'Weathering with You',
  author: 'Makoto Shinkai',
  date: '2019',
  desc: "High schooler Hodaka Morishima runs away from his island home, planning to move to Tokyo. When his ferry is hit by a freak rainstorm, he is saved by Keisuke Suga, who gives Hodaka his business card. In Tokyo, Hodaka struggles to find work; a teenage McDonald's employee, Hina, takes pity on him and gives him food. After a chance encounter with a mobster, Hodaka finds a gun in a trashcan. Suga hires him as his assistant at a small publishing company, where he meets Suga's niece Natsumi. They investigate urban legends relating to the unusually rainy weather in Tokyo; from a psychic, they hear the legend of a \"weather maiden\" who can control the weather.",
  link: 'https://www.youtube.com/watch?v=ps8qwWG8Uio',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-weathering.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-weathering-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-weathering-c.jpg',
  source: 'https://media.vued.vanthink.cn/y2mate.com%20-%20Weathering%20With%20You%20%5BOfficial%20Subtitled%20Trailer,%20GKIDS%5D_Q6iK6DjV_iE_1080p.mp4',
  duration: '01:51:00'
}, {
  id: 'usgfiayjqx',
  title: 'CJ7',
  author: 'Stephen Chow',
  date: '2008',
  desc: '',
  link: 'https://www.youtube.com/watch?v=bB7KvdTJCzE',
  cover: 'https://img1.wxzxzj.com/vpc-example-cover-CJ7.png',
  cover2: 'https://img1.wxzxzj.com/vpc-example-cover-CJ7-v.jpg',
  cover3: 'https://img1.wxzxzj.com/vpc-example-cover-CJ7-c.jpg',
  source: 'https://media.vued.vanthink.cn/CJ7%20-%20Trailer.mp4',
  duration: '00:46:04'
}]

let movie = DATA[2]

if (location.search) {
  var vid = location.search.split('=')[1]
  DATA.forEach(item => {
    if (item.id === vid) {
      movie = item
    }
  })
}
export default {
  name: 'Main',
  components: {
    MovieItem,
    RecommendedItem
  },
  data () {
    return {
      title: '',
      movieList: DATA,
      recommendList: [DATA[2], DATA[4], DATA[1], DATA[0]],
      currentMovie: movie
    }
  },
  methods: {
    open () {
      window.open('https://github.com/core-player/vue-core-video-player-examples')
    }
  }
}
</script>

<style>
  .example-player {
    position: relative;
    height: 410px;
    background-color: #000;
    font-weight: normal;
  }
  .movie-detail{
    padding-top: 20px;
    color: rgba(0,0,0, .65);
  }
  .movie-detail h1{
    font-size: 20px;
    color: #000;
  }
  .movie-detail .date {
    font-size: 14px;
  }
  .movie-detail .desc {
    font-size: 13px;
    padding: 10px 20px 10px 0;
  }
  .movie-detail .btn-wrap {
    padding-right: 20px;
    text-align: right;
  }
  .play-list h2 {
    font-size: 18px;
    color: rgba(0,0,0, .85);
    padding-bottom: 10px;
  }
  .recommend-list {
    margin-top: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-top: 1px solid #ddd;
  }
  .thanks {
    padding: 20px 0 40px;
    color: rgba(0, 0, 0, .25);
    font-size: 13px;
    text-align: center;
  }
  .recommend-list:after{
    content: '';
    display: block;
    clear: both;
  }
</style>
