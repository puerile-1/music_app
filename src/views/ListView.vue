<template>
    <div class="listView">
        <list-view-top :playlist="state.playlist"></list-view-top>
        <play-list :playlist="state.playlist"></play-list>
    </div>
    
</template>
<script>
import {getPlaylistDetail} from '@/api/index'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import listViewTop from '@/components/listTop.vue'
import playList from '@/components/playList.vue'
import store from '@/store/index'
export default {
    components:{
        listViewTop,
        playList
    },
    setup(){
        const route = useRoute()
        let state = reactive({
            list:[],
            playlist:{
                creator:{},
                tracks:[]
            }
        })
        onMounted(async ()=>{
            let id = route.query.id
            console.log(route);
            let res = await getPlaylistDetail(id)
            state.playlist = res.data.playlist
            store.commit('setPlaylist',state.playlist.tracks)
            console.log(res);
        })
        return{
            state
        }
    }
}
</script>
