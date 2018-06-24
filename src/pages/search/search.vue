<template>
    <div id="card">
        <div v-for="(item,index) in items" :key="index"><!--:key后面是与前方相同的属性-->
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="div1">
                        <img :src="item.url" alt="暂无图片"><!--不用加大括号的方式-->
                    </div>
                </el-col>
                <el-col :span="18">
                  <b>书籍名称：{{item.bookname}}</b>
                  <br/>
                  <br/>
                  <b>书籍简介：{{item.resume}}</b>
                  <br/>
                  <br/>
                  <div v-if="item.ebook">
                    <b>书籍类型：电子书</b>
                    <br/>
                    <br/>
                    <el-tag @click="download(item.press)">下载本书</el-tag>
                  </div>
                  <div v-else>
                    <b>书籍类型：实体书</b>
                    <br/>
                    <br/>
                    <b>书籍作者:{{item.author}}</b>
                    <br/>
                    <br/>
                    <el-button type="success" round @click="gobuy(item.bookno)">前去购买</el-button>
                  </div>
                  <!-- <el-button type="success" round>查看详情</el-button> -->
                </el-col>
            </el-row>
            <br/>
            <br/>
        </div>

        <div v-if="result">
          暂无搜索结果
        </div>

        <div class="block">
                <!-- :page-size="pageSize" -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1,2,3,4,5,6,7,8,9,10]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
           </el-pagination>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import { postRequest,putRequest,getRequest } from '@/utils/api'
import Connect from '@/services/service'
import { mapState } from 'vuex'
export default {
    name: 'card',
    created:function(){
      this.getRealBooks(1)
    },
    data() {
        return {
            items:[
                {bookname:'',resume:'',url:'',ebook:false}
            ],
            ite:{bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
            currentPage:new Number(),
            pageSize:10,
            totalItems:0,
            connect:new Connect(),
            total:1,
            Etotal:1
        }
    },
    computed: {
      target:function(){
        return this.$route.params.target
      },
      result:function(){
        if(this.totalItems === 0){
          return true
        }else{
          return false
        }
      },
      ...mapState([
        'useronline'
      ])
    },
    watch:{

    },
    methods:{

      gobuy(bookno){
        this.$router.push({path:'/index/bookBody/' + bookno })
      },
      download(url){
        if(this.useronline){

        }else{
          this.$message.warning('请登录您账号')
        }
      },
      getRealBooks(index){
        let connect = this.connect
        axios.post(connect.host + connect.ip.searchBooks + '?name='+this.target+'&pageNum='+index+'&pageSize=5',{

        }).then(resp=>{
          console.log(resp.data)
          if(index === 1){
            this.total = 1
          }
          let items= resp.data.data
          let total = resp.data.total
          if(total === index && index === 1){
            this.total = 1
          }else{
            this.total = total
          }
          this.totalItems = items.length//this.total * 10

          if(items){
            let item = 0
            for(;item<items.length;item++){
              items[item]['ebook'] = false
            }
            this.items = items
          }else{
            this.items = []
          }
          console.log(this.Etotal)
          if(index <= this.Etotal){
            this.getEBooks(index)
          }
        },resp=>{
          if(typeof(resp.data.status) == undefined || resp.data.data){
              this.$message.error('网络连接失败！')
          }else{
            // this.$message.error(resp.data.message)
          }
          this.total = 0
          this.items = []
          if(index <= this.Etotal){
            this.getEBooks(index)
          }
        })

      },
      getEBooks(index){

        let connect = this.connect
        axios.post(connect.host + connect.ip.searchEBooks + '?name='+this.target+'&pageNum='+index+'&pageSize=5',{

        }).then(resp=>{
          console.log(resp)
          let items = resp.data.data

          if(index === 1){
            this.Etotal = 1
          }
          let total = resp.data.total
          if(total === index && index === 1){
            this.Etotal = 1

          }else{
            this.Etotal = total
          }
          if(this.total < this.Etotal){
            this.totalItems = this.Etotal*10
          }
          if(items){
            let item = 0
            for(;item < items.length;item++){
              items[item]['ebook'] = true
            }
            this.items.push(items)
          }
        },resp=>{
          if(typeof(resp.data.status) == undefined || resp.data.data){
              this.$message.error('网络连接失败！')
          }else{
            // this.$message.error(resp.data.message)
          }
        })
      },
      handleSizeChange(val){
          console.log(val)
      },
      handleCurrentChange(val){
        // console.log(typeof(val)
        this.getRealBooks(val)
      }
    }
}
</script>
<style>
  .div1 img{
    width:61.8%;
    height: 100%;
  }
  .span2{
      width: 100px;
      height: 100px;
  }
</style>
<style lang='stylus'>
color1 = #55c8ca
color2 = #f7b87f
color3 = #36a3f7
color4 = #34bfa3
#card {
    .count{
        padding: 20px;
        .count-item{
            user-select: none;
            margin-bottom: 32px;
            .item-container{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                background-color: #f3f4f5;
                border-radius: 6px;
                cursor: pointer;
                &:hover{
                    opacity: 0.8;
                }
                &.item-container-1{
                    background: color1;
                }
                &.item-container-2{
                    background: color2;
                }
                &.item-container-3{
                    background: color3;
                }
                &.item-container-4{
                    background: color4;
                }
                .icon{
                    padding: 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease-out;
                    i{
                        font-size: 48px;
                        color: #fff;
                    }
                }
                .text{
                    text-align: right;
                    color: #fff;
                    .title{
                        font-size: 16px;
                        margin-bottom: 12px;
                    }
                    .number{
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>
