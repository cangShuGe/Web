<template>
    <div id="adminuser">
      <el-container direction="horizontal">
          <el-main id="main">
            <my-change></my-change>
            <my-delete></my-delete>
          </el-main>
      </el-container>
    </div>
</template>
<script>
import myChange from './userchildren/changeuser'
import myDelete from './userchildren/deleteuser'
export default {
    name: 'adminuser',
    components: { myChange, myDelete },
    data() {
        return {

        }
    }
}
</script>
<style lang='stylus'>
#adminuser {

}
</style>
