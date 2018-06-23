<template>
    <div id="index">
        <el-container id="verContainer" direction="vertical">
            <!-- header -->
            <my-header></my-header>
            <!-- <el-main id="main"> -->
              <!-- <transition name="el-fade-in-linear" mode="out-in"> -->
              <router-view></router-view>
              <!-- </transition> -->
          <!-- </el-main> -->
        </el-container>
    </div>
</template>
<script>
import myHeader from '@/layout/header'
import mySide from '@/layout/side'
import Connect from '@/services/service'
export default {
    name: 'index',
    components: { myHeader, mySide },
    created:function(){
    }

}
</script>
<style lang='stylus'>
#index {
    position: relative;
    width: 100%;
    height: 100%;
    #verContainer {
        height: 100%;
        #horContainer {
            height: 100%;
            #main {
                position: relative;
                width: 100%;
                height: fit-content;
                min-height: 100%;
                background: #fff;
                overflow: inherit;
            }
        }
    }
}
</style>
