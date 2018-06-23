<template>
    <div id="example">
        <my-banner :message="id"></my-banner>
        <my-card :message="id"></my-card>
    </div>
</template>
<script>
import myBanner from './children/banner'
import myCard from './children/card'
import { mapState } from 'vuex'
export default {
    name: 'example',
    computed:{
        ...mapState([
            'user',
            'logs',
            'useronline',
            'kinds',
            'Ebook'
        ]),
        id:function(){
          return this.$route.params.id
        }
    },
    components:{myBanner,myCard},
    data() {
        return {
        }
    }
}
</script>
<style lang='stylus'>
#example {}
</style>
