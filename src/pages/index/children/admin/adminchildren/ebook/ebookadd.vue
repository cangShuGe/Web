<template>
    <div id="realbookadd">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>根据提示增加书籍:</b></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm" @submit.native.prevent="AddBook">
        <el-form-item label="书籍名称:">
          <el-input placeholder="书籍名称" v-model="form.bookName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍编号">
          <el-input placeholder="书籍编号" v-model="form.bookNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍分类:">
          <el-autocomplete
            class="inline-input"
            v-model="form.catalogname"
            :fetch-suggestions="queryKinddsSearch"
            placeholder="书籍分类"
            @select="handleSelect"
          >
          <template slot-scope="{ item }">
          <!-- <div class="name">{{ item.bookname }}</div> -->
          <div class="name" style="color:green">{{ item.value=item.catalogname }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="所需积分：">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍简介">
          <el-input v-model="form.resume" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择图片">
          <el-button type="primary" @click="dialogVisible = true">点击选择图片</el-button>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="增加"></el-input>
        </el-form-item>
      </el-form>
          </div>
        </el-col>
      </el-row>

    <el-dialog
      title="选择图片"
      :visible.sync="dialogVisible"
      width="30%">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    </div>
</template>
<script>
import { postRequest,putRequest,getRequest } from '@/utils/api'
import Connect from '@/services/service'
export default {
    name: 'realbookadd',
    data() {
        return {
          dialogVisible:false,
          form:{
            catalogname:'',
            bookName:'',
            bookNo:'',
            author:'',
            catalogno:'',
            publishTime:new Date().getTime,
            press:'',
            price:0,
            resume:'',
            url:''
          },
          kinds:[
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
          ]
        }
    },
    created:function(){
      let connect = new Connect()
      postRequest(connect.host + connect.ip.Ekinds,{

      }).then(resp=>{
        if(resp.data.status){
          this.kinds = resp.data.data
        }
      },resp => {

      })
    },
    methods:{
      queryKinddsSearch(queryString, cb) {
        let kinds = this.kinds;
        let results = queryString ? kinds.filter(this.createKindsFilter(queryString)) : kinds;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createKindsFilter(queryString) {
        return (restaurant) => {
          return (restaurant.catalogname.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.form.catalogno = item.catalogno
        console.log(item);
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      AddBook(){
        let connect = new Connect()

        let para = {
            bookname:this.form.bookName,
            bookno:''+(new Date().getTime()),
            author:this.form.author,
            catalogno:this.form.catalogno,
            publishTime:''+this.form.publishTime.getTime,
            press:this.form.press,
            price:this.form.price,
        }
        if(!this.form.bookName){
          this.$message.error('请填写书籍名称')
          return ;
        }
        if(!this.form.catalogno){
          this.$message.error('请选择书籍种类')
          return ;
        }
        if(!this.form.price){
          this.$message.error('请填写价格信息')
          return ;
        }
        if(this.form.resume){
          para['resume'] = this.form.resume
        }
        if(this.form.url){
          para['url'] = this.form.url
        }

        postRequest(connect.host + connect.ip.addEBook,
        para).then(resp=>{

          if(resp.data.status){
            this.$message.alert('添加成功!')
          }

        },resp=>{

          if(typeof(resp.data) !== undefined || resp.data == null){
              this.$message.error('网络连接失败！')
            }else{
              this.$message.error('添加失败！')
            }

        })
      }
    }

}
</script>
<style lang='stylus'>
#realbookadd {
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
