<template>
    <div class="searchTop" >
        <div class="searchTopNav">
            <div class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>
            <div class="right">
                <input type="text" v-model="searchKeyword" :placeholder="placeholder" @keydown.enter="saveKeyWord">
            </div>
        </div>
        <div class="history" v-show="searchSongs.length==0">
           <div class="historyLeft">
               历史
           </div>
           <div class="historyRight">
               <div @click="historySearch(item)" class="keywordItem" v-for="(item,index) in keywordList" :key="index">
                {{item}}
               </div>
           </div>
        </div>
    </div>
    <div class="searchSongs" v-show="searchSongs.length!=0">
        <div class="searchSongs-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <div class="text">
                    <div class="title">播放全部</div>
                    <div class="num">(共{{searchSongs.length}}首)</div>
                </div>
            </div>
            <div class="btn">
                + 收藏 
            </div>
        </div>
        <div class="list">
            <div class="playItem" v-for="(item,index) in searchSongs" :key="index">
                <div class="left">
                    <div class="index">{{index+1}}</div>
                    <div class="content">
                        <div class="title">{{item.name}}</div>
                        <div class="author">
                            <span v-for="(item2,index2) in item.artists" :key="index2">{{item2.name}}-</span>
                            <span>{{item.album.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true" @click="setPlay(item,index)">
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
import {searchMusic} from '@/api/index'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            placeholder:'陈奕迅',
            keywordList:[],
            searchKeyword:'',
            searchSongs:[]
        }
    },
    
    beforeMount(){

        this.keywordList = localStorage.keywordList? JSON.parse(localStorage.keywordList):[]
    },
    methods:{
        async saveKeyWord(){
            this.keywordList.push(this.searchKeyword)
            this.keywordList = Array.from(new Set(this.keywordList))
            if(this.keywordList.length > 10){
                this.keywordList = this.keywordList.splice(this.keywordList.length-10,this.keywordList.length)
            }

            localStorage.keywordList = JSON.stringify(this.keywordList)
            let result = await searchMusic(this.searchKeyword)
            this.searchSongs =result.data.result.songs
            console.log(result);

        },
        historySearch(keyword){
            this.searchKeyword = keyword
            this.saveKeyWord()
        },
        setPlay(item,i){
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            this.$store.commit('pushPlaylist',item)
            this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)
        }
    }
}
</script>

<style lang="less" scoped>
.searchTop{
    width: 7.5rem;
    
    padding:0 0.4rem;
    .searchTopNav{
        display: flex;
        width: 100%;
        height: 1.2rem;
        align-items: center;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
        }
        .right{
            padding: 0 0 0 0.4rem;
            flex: 1;
            input{
                
                border: none;
                outline: none;
                border-bottom: 1px solid #666;
                width: 100%;
                height: 0.5rem;

            }
        }
    }
    .history{
        display: flex;
        .historyLeft{
            width: 1rem;
            height: 0.6rem;
            font-weight: 600;
            margin: 0.2rem 0;
            line-height: 0.6rem;
        }
        .historyRight{
            color: #666;
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            .keywordItem{
                background-color: #eee;
                height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.3rem;
                line-height: 0.6rem;
                margin: 0.2rem 0.1rem;
            }
        }
    }
    
}
.searchSongs{
    width: 7.5rem;
    padding: 0 0.2rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    
    .searchSongs-top{
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
        height: calc(100vh-2.4rem);
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