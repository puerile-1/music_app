<template>
    <div class="playController">
        <div class="left" @click="show=!show">
            <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
            <div class="content">
                <div class="title">{{playlist[playCurrentIndex].name}}</div>
                <div class="tips">横滑可以切换上下首哦</div>
            </div>
        </div>
        <div class="right">
            <svg v-if="paused==true" class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-24gl-playCircle"></use>
            </svg>
            <svg v-if="paused==false" class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
        <play-music :play='play' :paused="paused" @back='show=!show' v-show="show" :playDetail="playlist[playCurrentIndex]"></play-music>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import playMusic from '@/components/playMusic.vue'
export default {
    components:{
        playMusic
    },
    data(){
        return{
            paused:true,
            show:false
        }
    },
    computed:{
        ...mapState(['playlist','playCurrentIndex'])
    },
    mounted(){
        console.log(this.$refs.audio)
        this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    },
    updated(){
        console.log(this.playlist[this.playCurrentIndex])
        this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    },
    methods:{
        play(){
            
            if(this.$refs.audio.paused){
                this.$refs.audio.play()
                this.paused = false
                this.UpdateTime()
            }else{
                this.$refs.audio.pause()
                this.paused = true
                clearInterval(this.$store.state.id)
            }
            console.log([this.$refs.audio])
            
        },
        UpdateTime(content){
            this.$store.state.id = setInterval(()=>{
                this.$store.commit('setCurrentTime',this.$refs.audio.currentTime)        
            },1000)
    }
    }
}
</script>
<style lang="less" scoped>
.playController{
    width: 7.5rem;
    height: 1.2rem;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    .left{
        display: flex;
        padding: 0 0.2rem;
        img{
            width: 0.8rem;
            border-radius: 0.4rem;
            height: 0.8rem;
        }
        .content{
            padding: 0 0.2rem;
            width: 4rem;
            .title{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            .tips{
                font-size: 0.2rem;
                color: #999;
            }
        }
        
    }
    .right{
        .icon{
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 0.2rem;
        }
    }
}
</style>