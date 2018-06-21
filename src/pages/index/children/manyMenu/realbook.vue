<template>
    <div id="realbook">
        <my-banner :message="id" :ebook="ebook"></my-banner>
       <my-card :message="id" :ebook="ebook"></my-card>
    </div>
</template>
<script>
import myBanner from './children/banner'
import myCard from './children/card'
import { mapState } from 'vuex'
export default {
    name: 'realbook',
    computed:{
        ...mapState([
            'user',
            'logs',
            'useronline',
        ])
    },
    created:function(){
      console.log(this.$route.params.id)
      this.id = this.$route.params.id
    },
    components:{myBanner,myCard},
    data() {
        return {
          id:'',
          ebook:false,
        }
    }
}
</script>
<style lang='stylus'>
#example {}
</style>
