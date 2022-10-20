<template>
    <div class="musicList">
        <div class="musicList-top">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="mList">
            <swiper
            :slidesPerView="3"
            :spaceBetween="10"
            :modules="modules"
            class="mySwiper">
                <swiper-slide v-for="(item,index) in musicList" :key="index" @click="signIn(item.id)">
                    <img class="img" :src="item.picUrl" :alt="item.name">
                    <div class="name">{{item.name}}}</div>
                    <div class="count">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-24gl-play"></use>
                        </svg>
                        <span>{{changeValue(item.playCount)}}</span>
                    </div>
                </swiper-slide>    
            </swiper>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import {getMusicList} from '@/api/index';

export default {
    components: {
    Swiper,
    SwiperSlide,
  },
  data(){
      return {
          musicList:[]
      }
  },
  async mounted(){
      let res = await getMusicList()
      this.musicList = res.data.result
      
  },
  filter:{
    
  },
  methods:{
      changeValue(num){
        let res = 0
        if(num >= 100000000){
            res = num/100000000
            res = res.toFixed(2) + '亿'

        }
        else if(num > 10000) {
            res = num/10000
            res = res.toFixed(2) + '万'
        }
        return res
      },
      signIn(id){  
        this.$router.push({name:'listView',query: {id:id}})
      }
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
}
</script>
<style lang="less" scoped>
.musicList{
    width: 7.5rem;
    padding: 0.4rem;
    position: absolute;
    z-index: -1;
    .musicList-top{
        display: flex;
        justify-content: space-between;
        height: 1rem;
        align-items: center;
        .title{
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            width: 1.2rem;
            height: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            border-radius: 0.2rem;
            font-size: 0.24rem;
        }
    }
    .mList{
        
        .swiper {
            width: 100%;
            height: 3rem;
            
        }
        .swiper-slide {
            text-align: center;
            display: flex;
            flex-direction: column;
            position: relative;
            //justify-content: center;
            //align-items: center;
            .img {
                width: 100%;
                height: auto;
                border-radius: 0.2rem;
            }
            .name{
                height: 1rem;
                width: 100%;
                font-size: 0.24rem;
                line-height: 0.5rem;
            }
            .count{
                position: absolute;
                right: 0.1rem;
                top: 0.1rem;
                font-size: 0.24rem;
                color: #ccc;
                display: flex;
                align-items: center;
                .icon{
                    fill: #ccc;
                }
            }
            
        }

        
    }
    
}
</style>