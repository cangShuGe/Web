<template>
    <div id="banner">
        <el-carousel type="card" height="300px" trigger="click" :interval="4000">
            <el-carousel-item>
                <div class="item-content" @click="ChangeView(book[0].bookno,book[0].price)">
                    <img :src="book[0].url">
                    <div class="title" target="_blank">{{book[0].bookname}}</div>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div class="item-content" @click="ChangeView(book[1].bookno,book[1].price)">
                    <img :src="book[1].url">
                    <div class="title" target="_blank">{{book[1].bookname}}</div>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div class="item-content" @click="ChangeView(book[2].bookno,book[2].price)">
                    <img :src="book[2].url">
                    <div class="title" target="_blank">{{book[2].bookname}}</div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import axios from "axios"
import router from '@/router'
import { postRequest,putRequest,getRequest } from '@/utils/api'
import Connect from '@/services/service'
import { mapState } from 'vuex'
export default {
    name: 'banner',
    props:['message','ebook'],
    data(){
        return{
            book:[
              {bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
              {bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
              {bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
            ]
        }
    },
    computed: {
      ...mapState([
        'useronline',
        'userName',
        'user'
      ])
    },
    created:function(){
      console.log('banner')
      let connect = new Connect()
        if(this.ebook === true){
          axios.post(connect.host + connect.ip.adviceEbook,{
            catalogno:this.message
          }).then(resp=>{
              if(resp.data.status){
                  this.book = resp.data.data
              }
          },resp=>{
              if(typeof(resp.data) === undefined || !resp.data){
                  this.$message.error('网络连接错误')
              }else{
                  this.$message.error('获取数据失败')
              }
          })
        }else{
          axios.post(connect.host + connect.ip.adviceBooks,{
            catalogno:this.message
          }).then(resp=>{
            console.log(resp)
              if(resp.data.status){
                  this.book = resp.data.data
              }
          },resp=>{
              if(typeof(resp.data) === undefined || !resp.data){
                  this.$message.error('网络连接错误')
              }else{
                  this.$message.error('获取数据失败')
              }
          })
        }
    },
    methods:{
      ChangeView(bookno,price){
          if(this.ebook === false){
              this.$router.push({path : '/index/bookBody/' + bookno})
          }else{
            let connect = new Connect
            if(this.useronline){
                //console.log(this.useronline)
                //console.log("**********************")
                //console.log(this.user.userName) //--账户名称实际上是这个
                this.$confirm('是否要下载？如果您不是会员，将要花费' + price + '积分').then(_=>{
                axios.post(connect.host+connect.ip.downloadBooks+'?account='+this.user.userName+'&bookno='+bookno,{    
                }).then(resp=>{
                    if(resp.data.status){
                        this.$message.success(resp.data.message+"请到我的书架中查看已添加的电子书")
                    }else{
                        this.$message.error(resp.data.message)
                    }
                },resp=>{
                //console.log(this.user.userName)
                //console.log("********")
                this.$message.error("网络连接失败，请检查你的网络")
                })
                }).catch(_=>{
                })
            }else{
            this.$message.warning('请先登录您的账号')
            }
          }
        }
    }
}
</script>
<style lang='stylus'>
#banner {
    .el-carousel {
        margin-bottom: 25px;
        .el-carousel__item {
            .item-content {
                width: 100%;
                height: 100%;
                img {
                    height : 100%;
                }
                .title {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.3);
                    &:hover {
                        color: appColor;
                    }
                }
            }
        }
    }
}
</style>
