<template>
    <div class="menuItem">
        <el-menu default-active="3-1" class="el-menu-vertical-demo">
            <el-submenu index="1">
                <template slot="title">
                  <span slot="title">实体书分类</span>
                </template>
                <!-- <el-menu-item-group > -->
                    <div>
                        <!-- <router-link  :to="{name:path}" > -->
                            <el-menu-item v-for="(item,index) in Kinds" :key="index" :index="'1'+'-' + index" @click="choseRealBook(item.catalogno,item.catalogname)">
                            {{item.catalogname}}
                            </el-menu-item>
                        <!-- </router-link> -->
                    </div>
                <!-- </el-menu-item-group> -->
            </el-submenu>
            <el-menu-item index="2">
              <span slot="title">二手书</span>
            </el-menu-item>
            <el-submenu index="3">
              <span slot="title">电子书</span>
                <div v-for="(item,index) in Ekinds" :key="index">
                <el-menu-item :index="'120'+'-' + index" @click="choseBook(item.catalogno,item.catalogname)">
                    {{item.catalogname}}
                </el-menu-item>
                </div>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import axios from "axios"
import { postRequest,putRequest,getRequest } from '@/utils/api'
import Connect from '@/services/service'
import { mapState } from 'vuex'
export default {
    name: 'menuItem',
    data(){
        return {
          Kinds:[
            {catalogname:'玄幻',catalogno:'12'},
            {catalogname:'修真',catalogno:'13'},
            {catalogname:'历史',catalogno:'14'},
          ],
          Ekinds:[
            {catalogname:'玄幻',catalogno:'22'},
            {catalogname:'修真',catalogno:'23'},
            {catalogname:'历史',catalogno:'24'},
          ],
          ekindsTotal:1
        };
    },
    props: {
        json: Array
    },
    created:function(){
        // for(var i = 1; i <= (this.kindsTotal)/10 + 1;i++){
          this.getKinds()
        // }
        for(var i = 1; i <= this.ekindsTotal;i++){
          this.getEKinds(i)
        }
    },
    computed: {
        ...mapState([
        ])
    },
    methods: {
      getEKinds(index){
        let connect = new Connect()
        axios.post(connect.host + connect.ip.Ekinds,{
          pageNum:index
        }).then(resp=>{
          if(resp.data.status){
            this.ekindsTotal = resp.data.total
            this.Ekinds.push(resp.data.data)
          }
        },resp => {
        })
      },
      getKinds(index){
        let connect = new Connect()
        axios.post(connect.host + connect.ip.kinds,{
        }).then(resp=>{
          if(resp.data.status){
            this.kindsTotal = resp.data.total
            this.Kinds.push(resp.data.data)
          }
        },resp => {
        })
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
            console.log(id + name)
            this.$router.push({path:'/index/ebook/'+id})
        },
        choseRealBook(id,name){
            let real = new Array(id,name)
            console.log(id + name)
            this.$router.push({path:'/index/realbook/'+id})
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
