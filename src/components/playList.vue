<template>
    <div class="playlist">
        <div class="playlist-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <div class="text">
                    <div class="title">播放全部</div>
                    <div class="num">(共{{playlist.tracks.length}}首)</div>
                </div>
            </div>
            <div class="btn">
                + 收藏 ({{changeValue(playlist.subscribedCount)}})
            </div>
        </div>
        <div class="list">
            <div class="playItem" v-for="(item,index) in playlist.tracks" :key="index">
                <div class="left">
                    <div class="index">{{index+1}}</div>
                    <div class="content">
                        <div class="title">{{item.name}}</div>
                        <div class="author">
                            <span v-for="(item1,index1) in playlist.tags" :key="index1" class="tag">{{item1}}</span>
                            <span v-for="(item2,index2) in item.ar" :key="index2">{{item2.name}}-</span>
                            <span>{{item.al.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true" @click="setPlayIndex(index)">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shezhi"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    props:['playlist'],
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
      ...mapMutations(['setPlayIndex'])
    }
}
</script>
<style lang="less" scoped>
.playlist{
    width: 7.5rem;
    padding: 0 0.2rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.4rem;
    
    .playlist-top{
        display: flex;
        justify-content: space-between;
        height: 1rem;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            .icon{
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.24rem;
            }
            .title{
                font-size: 0.34rem;
                font-weight: 600;
            }
            .num{
                font-size: 0.28rem;
                color: #666;
            }
            .text{
                display: flex;
                align-items: center;
            }
        }
        .btn{
            font-size: 0.28rem;
            color: #fff;
            background-color: orangered;
            height: 0.8rem;
            line-height: 0.6rem;
            border-radius: 0.4rem;
            padding: 0.1rem;
        }
    }
    .list{
        .playItem{
            display: flex;
            align-items: center;
            height: 1.2rem;
            margin: 0 0.1rem;
            justify-content: space-between;
            .left{
                display: flex;
                align-items: center;
                color: #666;
                width: 5rem;
                .index{
                    width: 0.1rem;
                }
                .content{
                    margin-left: 0.6rem;
                    .title{
                    font-weight: 550;
                    font-size: 0.3rem;
                    color: #000;
                    margin-bottom: 0.1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
                
                .tag{
                    font-size: 0.2rem;
                    color:orangered;
                    border: 1px solid orangered;
                    border-radius: 0.1rem;
                    margin-right: 0.1rem;
                    
                }
                .author{
                    color: #666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
                }
                
            }
            .right{
                .icon{
                    margin: 0 0.1rem;
                }
            }
        }
    }
}

</style>