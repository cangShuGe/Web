<template>
    <div id="realbookadd">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>根据提示增加书籍:</b></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书籍名称:">
          <el-input v-model="form.bookName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍编号">
          <el-input v-model="form.bookNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版时间：">
          <el-date-picker v-model="form.publishTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="价格：">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社:">
          <el-input v-model="form.press" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍简介">
          <el-input v-model="form.resume" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择图片">
          <el-button type="primary" @click="dialogVisible = true">点击选择图片</el-button>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="更改"></el-input>
        </el-form-item>
      </el-form>
          </div>
        </el-col>
      </el-row>

    <el-dialog
      title="选择图片"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'realbookadd',
    data() {
        return {
          dialogVisible:false,
          form:{
            bookName:'sdfasd',
            bookNo:'ssdfsd@qq.com',
            author:'asdfasd',
            catalogno:'sdfa',
            publishTime:new Date(1997-9-9),
            press:'sldkfjsd',
            price:12123,
            resume:'sdfasdfasd',
            url:'http://sfsadfsa.sdfasd'
          },
          formName:{
            account:'asdfasd',
            email:'asdfasdf'
          }
        }
    },
    
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
