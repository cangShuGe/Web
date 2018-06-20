<template>
    <div id="realbookchange">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>不可更改信息:</b></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm" @submit.native.prevent="ChangeBook">
        <el-form-item label="书籍名称:">
          <el-autocomplete
            class="inline-input"
            v-model="form.bookName"
            :fetch-suggestions="queryNameSearch"
            placeholder="书籍名称"
            @select="handleSelect"
          >
          <template slot-scope="{ item }">
          <!-- <div class="name">{{ item.bookname }}</div> -->
          <div class="name" style="color:green">{{ item.value=item.bookname }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="作者：">
          <el-autocomplete
            class="inline-input"
            v-model="form.author"
            :fetch-suggestions="queryAuthorSearch"
            placeholder="作者"
            @select="handleSelect"
          >
          <template slot-scope="{ item }">
          <!-- <div class="name">{{ item.bookname }}</div> -->
          <div class="name" style="color:green">{{ item.value=item.author }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="书籍ID:">
          <el-autocomplete
            class="inline-input"
            v-model="form.bookNo"
            :fetch-suggestions="queryIDSearch"
            placeholder="书籍ID"
            @select="handleSelect"
          >
          <template slot-scope="{ item }">
          <!-- <div class="name">{{ item.bookname }}</div> -->
          <div class="name" style="color:green">{{ item.value=item.bookno }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>

        <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>可更改信息:</b></div></el-col>
        </el-row>

        <el-form-item label="库存:">
          <el-input v-model="form.total" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input type="number" step="0.01" v-model="form.price" auto-complete="off"></el-input>
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
            bookName:'',
            bookNo:'',
            author:'',
            catalogno:'',
            publishTime:new Date(),
            press:'',
            total:0,
            price:0,
            resume:'',
            url:''
          },
          formName:{
            account:'asdfasd',
            email:'asdfasdf'
          },
          kinds:[],
          all:[
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},
{bookno:'1',  bookname:'高级程序语言设计',catalogno: '1', author:'张小东', publishTime:'20100510', press:'哈尔滨工业大学出版社', total:26, price:100,resume: '本书是计算机学生的入门必读书籍，是学习计算机的开始教程！',url: ''},

          ],
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
        let all = this.all;
        let results = queryString ? all.filter(this.createIDFilter(queryString)) : all;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createIDFilter(queryString) {
        return (restaurant) => {
          return (restaurant.bookno.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      queryNameSearch(queryString, cb) {
        let all = this.all;
        let results = queryString ? all.filter(this.createNameFilter(queryString)) : all;

        cb(results);
      },
      createNameFilter(queryString) {
        // for(item in )
        return (restaurant) => {
          return (restaurant.bookname.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      queryAuthorSearch(queryString, cb) {
        let all = this.all;
        let results = queryString ? all.filter(this.createAuthorFilter(queryString)) : all;
        // 调用 callback 返回建议列表的数据
        cb(results);

      },
      createAuthorFilter(queryString) {
        return (restaurant) => {
          return (restaurant.author.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      queryKindsSearch(queryString, cb) {
        let all = this.all;
        let results = queryString ? all.filter(this.createKindsFilter(queryString)) : all;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createKindsFilter(queryString) {
        return (restaurant) => {
          return (restaurant.author.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.form.bookName = item.bookname
        this.form.bookNo = item.bookno
        this.form.author = item.author
        this.form.total = item.total
        this.form.price = item.price
        console.log(item);
      },
      ChangeBook(){
        this.$confirm('确定要更改书籍信息吗？').then(_=>{

          let para = {
            bookno:this.form.bookNo,
          }
          if(this.form.price === null){
            this.$message.error('价格和库存为必填字段，请重新填写')
            return;
          }else{
            para['price'] = this.form.price
          }
          if(this.form.total == null){
            this.$message.error('价格和库存为必填字段，请重新填写')
            return;
          }else{
            para['total'] == this.form.total
          }
          let connect = new Connect()
          postRequest(connect.host + connect.ip.updateBook,
          para).then(resp=>{

            if(resp.data.status){
              this.$message.alert('更改成功！')
            }

          },resp=>{

            if(typeof(resp.data) !== undefined || resp.data == null){
              this.$message.error('网络连接失败！')
            }else{
              this.$message.error('更改失败！')
            }

          })

        }).catch(_=>{

        })
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
