<template>
    <div id="xiuzhen">
        <my-banner message="修真"></my-banner>
       <my-card></my-card>
    </div>
</template>
<script>
import myBanner from './children/banner'
import myCard from './children/card'
export default {
    name: 'xiuzhen',
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
