<template>
    <div id="mingzhu">
        <my-banner message="名著"></my-banner>
        <myCard></myCard>
    </div>
</template>
<script>
import myBanner from './children/banner'
import myCard from './children/card'
export default {
    name: 'mingzhu',
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
