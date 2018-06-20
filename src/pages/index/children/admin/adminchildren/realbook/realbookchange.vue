<template>
    <div id="realbookchange">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>通过用户ID更改用户邮箱:</b></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书籍名称">
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="queryNameSearch"
            placeholder="书籍名称："
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="作者：">
          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="queryAuthorSearch"
            placeholder="作者"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="书籍ID:">
          <el-autocomplete
            class="inline-input"
            v-model="form.bookNo"
            :fetch-suggestions="queryIDSearch"
            placeholder="书籍ID："
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="种类">
          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="种类："
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="更改"></el-input>
        </el-form-item>
      </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import { postRequest,putRequest,getRequest } from '@/utils/api'
import Connect from '@/services/service'
export default {
    name: 'realbookchange',
    data() {
        return {
          form:{
            num:0,
            bookName:'',
            bookNo:'',
            author:'',
            catalogno:'',
            publishTime:new Date(),
            press:'',
            price:0,
            resume:'',
            url:''
          },
          formName:{
            account:'asdfasd',
            email:'asdfasdf'
          },
          kinds:[],
          all:[],
        }
    },
    created:function(){
      let connect = new Connect()
      postRequest(connect.host + connect.ip.kinds,{

      }).then(resp=>{
        if(resp.data.status){
          this.kinds = resp.data.data

        }
      },resp => {

      })
      postRequest(connect.host + connect.ip.allBooks,{

      }).then(resp=>{
        if(resp.data.status){
          this.all = resp.data.data
        }
      },resp => {
      })
    },
    methods:{
      queryIDSearch(queryString, cb) {
        var all = this.all;
        var results = queryString ? all.filter(this.createIDFilter(queryString)) : all;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createIDFilter(queryString) {
        return (restaurant) => {
          return (restaurant.bookno.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      queryNameSearch(queryString, cb) {
        var all = this.all;
        var results = queryString ? all.filter(this.createNameFilter(queryString)) : all;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createNameFilter(queryString) {
        return (restaurant) => {
          return (restaurant.bookname.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      queryAuthorSearch(queryString, cb) {
        var all = this.all;
        var results = queryString ? all.filter(this.createAuthorFilter(queryString)) : all;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createAuthorFilter(queryString) {
        return (restaurant) => {
          return (restaurant.author.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }

    }
}
</script>
<style lang='stylus'>
#realbookchange {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
