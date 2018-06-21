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
          <!-- <el-button type="primary" @click="dialogVisible = true">点击选择图片</el-button> -->
          <el-upload
            class="avatar-uploader"
            :action= domain
            :http-request = upqiniu
            :show-file-list="false"
            :before-upload="beforeUpload">
            <img v-if="form.url" :src="form.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="增加"></el-input>
        </el-form-item>
      </el-form>
          </div>
        </el-col>
      </el-row>

    </div>
</template>
<script>
import axios from "axios"
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
          ],
          kindsTotal:0,
          token: {},
          // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
          domain: 'https://up.qiniup.com',
          // 这是七牛云空间的外链默认域名
          qiniuaddr: 'pak69l11h.bkt.clouddn.com',
        }
    },
    created:function(){

      // for(var i = 1; i <= kindsTotal;i++){
        this.getKinds()
      // }
    },
    methods:{
      getKinds(){
        let connect = new Connect()
        axios.post(connect.host + connect.ip.Ekinds,{
          // page:index
        }).then(resp=>{
          if(resp.data.status){
            this.kindsTotal = resp.data.total
            this.kinds.push(resp.data.data)
          }
        },resp => {
        })
      },
      upqiniu (req) {
      console.log(req)
      console.log('req')
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'wu' + new Date().getTime() + '.' + filetype
      // 从后端获取上传凭证token
      this.axios.get('/up/token').then(res => {
        // console.log(res)
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', res.data)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.axios.post(this.domain, formdata, config).then(res => {
          this.form.url = 'http://' + this.qiniuaddr + '/' + res.data.key
          console.log(this.form.url)
        })
      })
    },
    // 验证文件合法性
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
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

        axios.post(connect.host + connect.ip.addEBook,
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
