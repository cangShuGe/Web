<template>
  <div class="bookall">
    <div class ="bookbody" style="padding: 100px;">
        <el-row :gutter="15"><!--列和列之间的间距--> <!--一行但是有很多列-->
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <img :src="formBook.url" alt="书籍封面">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form :model="formBook" label-width="80px">
                        <el-form-item label="书籍名称">
                            <el-tag>{{formBook.bookname}}</el-tag>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-tag type="success">{{formBook.author}}</el-tag>
                        </el-form-item>
                        <el-form-item label="出版社">
                            <el-tag type="info">{{formBook.press}}</el-tag>
                        </el-form-item>
                        <el-form-item label="出版时间">
                            <el-tag type="info">{{formBook.publishTime | formatDate}}</el-tag>
                        </el-form-item>
                        <el-form-item label="抵押金币">
                            <el-switch v-model="form.discord"></el-switch>
                            <el-tag type="danger"> <i class="el-icon-star-off"></i>注：使用金币可抵押2%的费用</el-tag>
                        </el-form-item>
                        <el-form-item label="配送至">
                            <el-cascader
                                :options="options2"
                                @active-item-change="handleItemChange"
                                :props="props"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input type="textarea" v-model="form.address" style="width: 250px;height: 50px"></el-input>
                        </el-form-item>
                        <el-form-item label="购买数量">
                            <el-input-number v-model="form.num1" @change="handleChange" :min="1" :max="10" size="small"></el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即购买</el-button>
                            <el-button type="primary" @click="toCart">加入购物车</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    <!--</div>
      <el-row :gutter="12">-->
            <!-- table -->
            <!-- <el-col :span="12"><my-table></my-table></el-col>
      </el-row>
    <div> --><!--展示这本书籍的所有评论以及评分-->
    </div>
    <div class="comment" style="padding: 100px;">
      <my-comment :id="id"></my-comment>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import myHeader from '@/layout/header'
import { mapState } from 'vuex'
import Connect from '@/services/service'
import myComment from './bookcomment'
import {formatDate} from '@/utils/filters.js'
export default {
    name: 'bookbody',
    components:{myComment},
    data() {
      return {
        form: {
          discord: false,
          address: '山东省威海市环翠区哈尔滨工业大学（威海）4公寓',
          num1: 1
        },
        options2: [{
          label: '江苏',
          cities: []
        }, {
          label: '浙江',
          cities: []
        }],
        props: {
          value: 'label',
          children: 'cities'
        },
        formBook:{
          bookname:'asdffasdfsdfsdf',
          author:'',
          press:'',
          publishTime:new Date(),
          url:'sdfsad'
        },
        id:this.$route.params.bookid
      }
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'user',
            'userName'
        ])
    },
    created:function(){
      this.getBook()
    },
    filters:{
      formatDate(time){
        var data = new Date(time);
        return formatDate(data,'yyyy-MM-dd hh:mm:ss');
      }
    },
    methods: {

      getBook(){
        let connect = new Connect()
        axios.post(connect.host+connect.ip.getBookByNo + '?bookno='
        +this.id,{
        }).then(resp=>{
          console.log(resp)
          this.formBook = resp.data.data
          //this.formBook.publishTime = new Date(this.formBook.publishTime)
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })
      },
      onSubmit() {
        console.log('submit!');
        if(this.useronline){
        let connect = new Connect()
        axios.get(connect.host+connect.ip.buyBookNow + '?bookno='+this.id + '&num=' + this.form.num1 + '&buyTime=' + new Date().getTime() + '&account=' + this.user.userName ,{
        }).then(resp=>{
          this.$message.success(resp.data.message)
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })
          this.$router.push({path:'/index/book'})
        }else{
          this.$message.error('请您先登录账号')
        }
      },
      toCart(){
        console.log('我要去购物车了哎！hhhhhh')
        if(this.useronline){
          let connect = new Connect()
        axios.post(connect.host+connect.ip.addSaleCar ,{
          account:this.user.userName,
          bookno:this.id,
          addtime:new Date().getTime(),
          num:this.form.num1
        }).then(resp=>{
          this.$message.success(resp.data.message)
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })
          this.$router.push({path:'/index/book'})
          this.$router.push({path:'/index/book'})
        }else{
          this.$message.error('请您先登录账号')
        }
      },
      handleItemChange(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
      },
      handleChange(value) {
        console.log(value);
      },
    }
}
</script>
<style>
  .bookall {
    width:100%;
    height: 100%;
    background-color: rgb(253, 253, 253)
  }
  .comment {
    width:100%;
    height:100%;
    background-color: rgb(253, 253, 253)
  }
  .bookbody {
    width:100%;
    height: 100%;
    background-color: rgb(253, 253, 253)
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: rgb(253, 253, 253);
  }
  .grid-content {
    border-radius: 4px;
    margin-bottom: 20%;
    margin-right: 20px;
  }
  .grid-content img{
    width:100%;
    height: 100%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: rgb(253, 253, 253);
  }
</style>
