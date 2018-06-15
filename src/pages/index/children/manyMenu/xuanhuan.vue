<template>
    <div id="xunhuan">
        <my-banner message="玄幻"></my-banner>
        <myCard></myCard>
    </div>
</template>
<script>
import myBanner from './children/banner'
import myCard from './children/card'
export default {
    name: 'xuanhuan',
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
