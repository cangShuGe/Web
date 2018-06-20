<template>
    <div id="adminebook">
      <el-container direction="horizontal">
          <el-main id="main">
            <h3>增加书籍分类</h3>
            <kind-add></kind-add>
            <h3>删除书籍分类</h3>
            <kind-delete></kind-delete>
            <h3>增加</h3>
            <my-add></my-add>
            <h3>更改书籍库存及价格</h3>
            <my-change></my-change>
            <h3>删除书籍</h3>
            <my-delete></my-delete>
          </el-main>
      </el-container>
    </div>
</template>
<script>
import myAdd from './ebook/ebookadd'
import myChange from './ebook/ebookchange'
import myDelete from './ebook/ebookdelete'
import kindAdd from './ebook/kindsadd'
import kindDelete from './ebook/kindsdelete'
export default {
    name: 'adminebook',
    components: { myAdd, myChange, myDelete,kindAdd, kindDelete},
    data() {
        return {

        }
    }
}
</script>
<style lang='stylus'>
#adminebook {

}
</style>
