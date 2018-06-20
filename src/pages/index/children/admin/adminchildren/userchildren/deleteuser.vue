<template>
    <div id="deleteuser">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1"><div class="grid-content"><b>通过用户ID删除用户账号:</b></div></el-col>
      </el-row>
      <br>
      <br>

      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户ID：">
          <el-input v-model="form.ID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="submit" value="删除"></el-input>
        </el-form-item>
      </el-form>
          </div>
        </el-col>
      </el-row>



      <el-row :gutter="20">
        <el-col :span="23" :offset="1"><div class="grid-content"><b>通过用户名删除用户账号:</b></div></el-col>
      </el-row>
      <br>
      <br>

      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="formAccount" :inline="true" label-width="100px" class="demo-ruleForm">
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
      <el-form :model="formEmail" :inline="true" label-width="100px" class="demo-ruleForm">
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
export default {
    name: 'changeuser',
    data() {
        return {
          form:{
            ID:'adfasd'
          },
          formAccount:{
            account:'sdfasd'
          },
          formEmail:{
            email:'sdfas@ada.com'
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
