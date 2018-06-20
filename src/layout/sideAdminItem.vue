<template>
    <div class="menuItem">
        <el-menu default-active="3-1" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="changeAdminUser">
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changeAdminReal">
              <span slot="title">实体书籍管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="changeAdminEbook">
              <span slot="title">电子书籍管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'menuItem',
    data(){
        return {
          realBookAdmin:{
            bookAdd:'增加',
            bookDelete:'删除',
            bookChange:'更改'
          },
          ebookAdmin:{
            bookAdd:'增加',
            bookDelete:'删除',
            bookChange:'更改'
          },
          userAdmin:{

          }


        };
    },
    props: {
        json: Array
    },
    created:function(){

    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'kinds'
        ])
    },
    methods: {
        changeAdminEbook(){

        },
        adminRealBook(){
          // this.$router.push({name:''})
        },
        changeAdminReal(){
          this.$router.push({name:'adminRealBook'})
        },
        changeAdminUser(){
          this.$router.push({name:'adminUser'})
        },
        routeName(route) {
            if (route.meta && route.meta.title) {
                return route.meta.title
            } else {
                return route.name
            }
        },
        kindName(){

        },
        choseBook(id,name){
            let ebook = new Array(id,name)
            // this.$store.commit('set_Ebook',ebook)
            // this.$router.push({path:'/index/ebook/'+name})
        },
        choseRealBook(name,id){
            let real = new Array(id,name)
            // this.$store.commit('set_RealBook',real)
            // this.$router.push({path:'/index/realbook/'+name})
        }
    }
}
</script>
<style lang='stylus'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    a {
        display: block;
    }
  }
.menuItem {
    a {
        display: block;
    }
}
</style>
