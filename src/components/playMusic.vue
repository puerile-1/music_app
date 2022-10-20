<template>
    <div class="playMusic">
        <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
        <div class="playTop">
            <div class="back" @click="$emit('back')">
                <svg  class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>
            <div class="center">
                <div class="title">
                    <marquee behavior='scroll' direction='left'>{{playDetail.al.name}}</marquee>
                </div>
                
            </div>
            <div class="share">
                <svg  class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>

        <div class="playContent" v-if="isLyric">
            <img class="needle" :class="{active:paused}" src="@/assets/img/needle-ab.png" alt="">
            <img class="disc" src="@/assets/img/222.png" alt="">
            <img class="playImg" :src="playDetail.al.picUrl" alt="" @click="isLyric=!isLyric">
        </div>
    
        <div class="playLyric" v-if="!isLyric" ref="playLyric">
            <p :class="{active:(currentTime*1000 >=item.time&&currentTime*1000 <=item.last)}" v-for="(item,i) in $store.getters.lyricList" :key="i"  @click="isLyric=!isLyric">{{item.lyric}}</p>
            
        </div>

        <div class="progress"></div>
        <div class="playFooter">
            <svg  class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-repeat2"></use>
            </svg>
            <svg  class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg v-if="paused==true" class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            <svg v-if="paused==false" class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg  class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg  class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { watch } from '@vue/runtime-core'
import {mapState} from 'vuex'
export default {
    props:['playDetail','paused','play'],
    data(){
        return{
            isLyric:true
        }
    },
    computed:{
        ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),
        
    },
    watch:{
        currentTime(newValue){
            console.log(newValue)
            console.log([this.$refs.playLyric])
            let p = document.querySelector('p.active')
            let offsetTop = p.offsetTop
            this.$refs.playLyric.scrollTop = p.offsetTop
            // let h = this.$refs.playLyric.offsetHeight
            // if(offsetTop > h){
            //     this.$refs.playLyric.scrollTop = this.$refs.playLyric.scrollTop+(offsetTop-h/2)
            // }
            console.log([p])
        }
    },
    methods:{
        goPlay(num){
            console.log(num)
            console.log(this.playlist);
            console.log(this.playCurrentIndex);
            let index = this.playCurrentIndex+num
            if(index < 0){
                index = this.playlist.length - 1
            }else if(index == this.playlist.length){
                index = 0
            }
            this.$store.commit('setPlayIndex',index)
        }
    }
}
</script>
<style lang="less" scoped>
.playMusic{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size: auto 100%;
        filter: blur(60px);
        background-position: center;
    }
    .playTop{
        display: flex;
        width: 7.5rem;
        height: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.4rem;
            height: 0.4rem;
        }
        marquee{
            width: 5rem;
            flex: 1;
        }
    }
    .playContent{
        position: absolute;
        width: 7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;
        .needle{
            width: 2.5rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(15deg);
            transition: all 1s;
            z-index: 10;
        }
        .needle.active{
            width: 2.5rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(-10deg);
            transition: all 1s;
            z-index: 10;
        }
        .disc{
            width: 5.5rem;
            height: auto;
            position: absolute;
            left: 1rem;
            top: 2.5rem;
        }
        .playImg{
            width: 3.6rem;
            height: 3.6rem;
            border-radius: 1.8rem;
            position: absolute;
            left: 2rem;
            top: 3.5rem;
        }
    }
    .playFooter{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.5rem;
            height: 0.5rem;
        }
        .play.icon{
            width: 0.8rem;
            height: 0.8rem;
        }
    }
    .playLyric{
        position: absolute;
        width: 7.5rem;
        height: 8rem;
        left: 0;
        top: calc(50% - 4rem);
        overflow: scroll;
        text-align: center;
        color: #fff;
        padding: 0.2rem 0;
        .active{
            color: orangered;
        }
    }
}
</style>