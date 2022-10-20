<template>
<div class="swiperCom">
  <swiper :pagination="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(item,index) in imgs" :key="index"><img :src="item.pic"></swiper-slide>
    
  </swiper>
</div>

  
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import axios from 'axios';
import {getBanner} from '@/api/index'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data(){
    return{
        imgs:[
            {pic: require('../assets/img/轮播1.jpg')},
            {pic: require('../assets/img/轮播1.jpg')},
            {pic: require('../assets/img/轮播1.jpg')},
            {pic: require('../assets/img/轮播1.jpg')},
            {pic: require('../assets/img/轮播1.jpg')},
            {pic: require('../assets/img/轮播1.jpg')},
            {pic: require('../assets/img/轮播1.jpg')},
        ]
    }
  },
  async mounted(){
      let res = await getBanner(1)
      this.imgs = res.data.banners
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>
<style lang="less" scoped>
  
  .swiperCom{
    width: 100%;
    position: absolute;
    z-index: 0;
    .swiper{
        width: 95%;
        height: 3rem;
        border-radius: 0.1rem;
        
        
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      position: relative;
      
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .swiper-pagination-bullet-active{
        background-color: orangered;
    }


  
  }


</style>