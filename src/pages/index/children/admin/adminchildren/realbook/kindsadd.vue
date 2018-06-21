<template>
    <div id="realbookadd">

      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm" @submit.native.prevent="AddKinds">
        <el-form-item label="分类名称:">
          <el-input placeholder="分类名称" v-model="form.catalogname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类编号：">
          <el-input placeholder="分类编号" v-model="form.catalogno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="添加"></el-input>
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
            catalogno:'',
            catalogname:'',
          },
        }
    },
    created:function(){

    },
    methods:{

      AddKinds(){
        console.log('asdfasdfs')

        let connect = new Connect()
        let para = {
          catalogname:this.form.catalogname,
          catalogno:this.form.catalogno
        }

        if(!this.catalogname || this.catalogname.length === 0){
          this.$message.error('请填写分类名称');
          return;
        }
        if(!this.catalogno || this.catalogno.length === 0){
          this.$message.error('请填写分类编号');
          return;
        }

        axios.post(connect.host + this.addKinds,
        para).then(resp=>{

          if(resp.data.status){
            this.$message.alert('添加成功')
          }

        },resp=>{

          if(typeof(resp.data) !== undefined || resp.data == null){
            this.$message.error('网络连接失败！')
          }else{
            this.$message.error(resp.data.data.message)
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
