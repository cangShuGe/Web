<template>
    <div id="changeuser">

      <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>通过用户ID更改用户邮箱:</b></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID：">
          <el-input v-model="form.ID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更改邮箱为：">
          <el-input type="email" v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="更改"></el-input>
        </el-form-item>
      </el-form>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>通过用户名更改用户邮箱:</b></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="formName" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：">
          <el-input v-model="formName.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更改邮箱为：">
          <el-input type="email" v-model="formName.email" auto-complete="off"></el-input>
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
export default {
    name: 'changeuser',
    data() {
        return {
          form:{
            ID:'sdfasd',
            email:'ssdfsd@qq.com'
          },
          formName:{
            account:'asdfasd',
            email:'asdfasdf'
          }
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
