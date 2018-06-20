<template>
    <div id="deleteuser">

      <el-row :gutter="20">
        <el-col :span="23" :offset="1"><div class="grid-content"><b>通过用户名删除用户账号:</b></div></el-col>
      </el-row>
      <br>
      <br>

      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="formAccount" :inline="true" label-width="100px" class="demo-ruleForm" @submit.native.prevent="AccountDelete">
        <el-form-item label="用户名：">
          <el-input v-model="formAccount.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="删除"></el-input>
        </el-form-item>
      </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="23" :offset="1"><div class="grid-content"><b>通过用户邮箱删除用户账号:</b></div></el-col>
      </el-row>
      <br>
      <br>

      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form @submit.native.prevent="MailDelete" :model="formEmail" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户邮箱：">
          <el-input type="email" v-model="formEmail.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="删除"></el-input>
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
    name: 'changeuser',
    data() {
        return {
          formAccount:{
            account:''
          },
          formEmail:{
            email:''
          }

        }
    },
    methods:{
      AccountDelete(){
        this.$confirm('确定要删除吗，删除后不可恢复').then(_=>{
          if(!this.formAccount.account){
            this.$message.error('请确认用户名信息已填写')
            return;
          }

          let connect = new Connect()

          postRequest(connect.host + connect.accountDelete,
          this.formAccount).then(resp=>{

            if(resp.data.status){
              this.$message.alert('删除成功')
            }

          },resp=>{
             if(typeof(resp.data) !== undefined || resp.data == null){
              this.$message.error('网络连接失败！')
            }else{
              this.$message.error('删除失败！')
            }
          })

        }).catch(_=>{})
      },
      MailDelete(){
        this.$confirm('确定要删除吗，删除后不可恢复').then(_=>{
          if(!this.formEmail.email){
            this.$message.error('请确认邮箱信息已填写')
            return;
          }

          let connect = new Connect()

          postRequest(connect.host + connect.emaiDelete,
          this.formEmail).then(resp=>{

            if(resp.data.status){
              this.$message.alert('删除成功')
            }

          },resp=>{
             if(typeof(resp.data) !== undefined || resp.data == null){
              this.$message.error('网络连接失败！')
            }else{
              this.$message.error('删除失败！')
            }
          })

        }).catch(_=>{})
      }
    }
}
</script>
<style lang='stylus'>
#changeuser {
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
