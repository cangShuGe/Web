<template>
    <div id="adminuser">
      <el-container direction="horizontal">
          <el-main id="main">
            <h3>增加</h3>
            <!-- <my-add></my-add> -->
            <!-- <my-change></my-change> -->
            <my-delete></my-delete>
          </el-main>
      </el-container>
    </div>
</template>
<script>
import myAdd from './realbook/realbookadd'
import myChange from './realbook/realbookchange'
import myDelete from './realbook/realbookchange'
export default {
    name: 'adminuser',
    components: { myAdd, myChange, myDelete },
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
