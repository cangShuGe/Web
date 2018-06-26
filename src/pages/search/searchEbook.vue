<template>
    <div id="card">
        <div v-for="(item,index) in items" :key="index" v-if="flag"><!--:key后面是与前方相同的属性-->
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
                    <el-button type="success" round @click="download(item.bookno,item.price)">添加到我的书架</el-button>
                  </div>
                  <div v-else>
                    <b>书籍类型：实体书</b>
                    <br/>
                    <br/>
                    <b>书籍作者:{{item.author}}</b>
                    <br/>
                    <br/>
                    <el-button type="success" round @click="gobuy(item.bookno)">查看详情</el-button>
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
      this.getEbooks(1)
    },
    data() {
        return {
            items:[
                {bookno:0,bookname:'',resume:'',url:'',press:'',ebook:true}
            ],
            ite:{bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
            currentPage:1,//当前页数
            pageSize:10,
            totalItems:0,
            connect:new Connect(),
            flag: true
        }
    },
    computed: {
      target:function(){//计算而来的值
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
        'useronline',
        'userName',
        'user'
      ])
    },
    watch:{ //监听路由或变量值变化
      $route() {
            this.getEbooks(1)
        }
    },
    methods:{

      gobuy(bookno){
        this.$router.push({path:'/index/bookBody/' + bookno })
      },
      download(bookno,price){
          let connect = new Connect
        if(this.useronline){
            // console.log(this.useronline)
            // console.log("**********************")
            // console.log(this.user.userName) --账户名称实际上是这个
            this.$confirm('是否要下载？如果您不是会员，将要花费' + price + '积分').then(_=>{
            axios.post(connect.host+connect.ip.downloadBooks+'?account='+this.user.userName+'&bookno='+bookno,{    
            }).then(resp=>{
                if(resp.data.status){
                    this.$message.success(resp.data.message+"请到我的书架中查看已添加的电子书")
                }else{
                    this.$message.error(resp.data.message)
                }
            },resp=>{
                console.log(this.user.userName)
                console.log("********")
                this.$message.error("网络连接失败，请检查你的网络")
            })
        }).catch(_=>{
    })
        }else{
          this.$message.warning('请先登录您的账号')
        }
      },
      getEbooks(index){
        let connect = this.connect
        axios.post(connect.host + connect.ip.searchEBooks + '?name='+this.target+'&pageNum='+index+'&pageSize='+this.pageSize,{
        }).then(resp=>{
          if(resp.data.status){
            this.flag = true
            console.log(resp.data)
            this.items= resp.data.data
            this.totalItems = resp.data.total //总的记录数
            let item = 0
            for(;item<this.items.length;item++){
                this.items[item]['ebook'] = true
            }
          }else{
            this.flag = false
            this.$message.error(resp.data.message)
          }
        },resp=>{
          if(typeof(resp.data.status) == undefined || resp.data.data){
              this.$message.error('网络连接失败！')
          }else{
            // this.$message.error(resp.data.message)
          }
        })

      },
      handleSizeChange(val){//val表示的是当前页面大小
          this.pageSize = val
          this.getEbooks(this.currentPage)
      },
      handleCurrentChange(val){ //val表示的是当前页数
          this.currentPage=val
          this.getEbooks(val)
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
