import { createStore } from 'vuex'
import axios from 'axios'
import api from '@/api/index'

export default createStore({
  state: {
    playlist:[{
      name: '心跳的证明',
      id: 1452682700,
      al:{
        id: 90233020,
        name: "心跳的证明",
        pic: 109951167026923230,
        picUrl: "http://p4.music.126.net/F8TixmQbqfscjArwukmvKA==/109951167026923224.jpg",
        pic_str: "109951167026923224"
      }
    }],
    playCurrentIndex:0,
    lyric:'',
    currentTime:0,
    intervalId:0,
    user:{
      isLogin:false,
      userDetail:{},
      account:{}
    }

  },
  getters: {
    lyricList(state){
      let arr = state.lyric.split(/\n/igs).map((item,i,arr)=>{
          let min = parseInt(item.slice(1,3));
          let sec = parseInt(item.slice(4,6));
          let mill = parseInt(item.slice(7,11));
          let pre = 0
          if(i-1<0){
            pre = 0
          }else{
            pre = arr[i-1]
          }
          
          return{
            min,sec,mill,
            lyric:item.slice(10,item.length).replace(']',''),
            content:item,
            time:mill+sec*1000+min*60*1000
          }
          
      })
      arr.forEach((item,i)=>{
        if(i==0){
          item.pre = 0;
        }else{
          item.pre =arr[i-1].time
        }
        if(i==arr.length-1)
        {
          item.last=1000000
        }else{
          item.last=arr[i+1].time
        }
      })
      return arr
  }
  },
  mutations: {
    setPlaylist(state,value){
      state.playlist = value
    },
    pushPlaylist(state,value){
      state.playlist.push(value)
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
    },
    setLyric(state,value){
      state.lyric = value
    },
    setCurrentTime(state,value){
      state.currentTime = value
    },
    setUser(state,value){
      state.user = value
    }
  },
  actions: {
    async reqLyric(content,payload){
      console.log(payload)
      let result = await api.getLyric(payload.id)
      content.commit('setLyric',result.data.lrc.lyric)
      console.log(result.data.lrc.lyric);
    },
    async phoneLogin(content,payload){
      //console.log(payload);
      let result = await api.phoneLogin(payload.phone,payload.password)
      if(result.data.code == 200){
        content.state.user.isLogin = true
        content.state.user.account = result.data.account

        let userDetail = await api.userDetail(result.data.account.id)
        content.state.user.userDetail = userDetail.data
        localStorage.userData = JSON.stringify(content.state.user)
        console.log(userDetail)
        content.commit('setUser',content.state.user)
      }
      console.log(result)
      return result
    }
  },
  modules: {
  }
})
