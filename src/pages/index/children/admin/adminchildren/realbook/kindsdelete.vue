<template>
    <div id="realbookadd">

      <el-row :gutter="20">
        <el-col :span="23" :offset="1">
          <div class="grid-content">
      <el-form :model="form" :inline="true" label-width="100px" class="demo-ruleForm" @submit.native.prevent="DeleteKinds">
        <el-form-item label="分类名称:">
          <el-autocomplete
            class="inline-input"
            v-model="form.catalogname"
            :fetch-suggestions="queryKinddsSearch"
            placeholder="分类名称"
            @select="handleSelect"
          >
          <template slot-scope="{ item }">
          <!-- <div class="name">{{ item.bookname }}</div> -->
          <div class="name" style="color:green">{{ item.value=''+item.catalogname }}</div>
          </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="分类编号：">
          <el-autocomplete
            class="inline-input"
            v-model="form.catalogno"
            :fetch-suggestions="queryNoSearch"
            placeholder="分类编号"
            @select="handleSelect"
          >
          <template slot-scope="{ item }">
          <!-- <div class="name">{{ item.bookname }}</div> -->
          <div class="name" style="color:green">{{ item.value=''+item.catalogno }}</div>
          </template>
          </el-autocomplete>
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
          kinds:[
            /*{catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},
            {catalogno:'123123',catalogname:'asdfasdfasdf'},*/
          ],
          kindsTotal:0,
        }
    },
    created:function(){//初始化
      // for(var i = 1; i <= (kindsTotal)/10 + 1;i++){
        this.getKinds()
        console.log(this.kinds)
        console.log("------------------")
      // }
    },
    methods:{
      getKinds(){
        let connect = new Connect()
        axios.post(connect.host + connect.ip.kinds,{
          // page:index
        }).then(resp=>{
          if(resp.data.status){
            this.kindsTotal = resp.data.total
            this.kinds=resp.data.data
          }
          console.log(this.kinds)
          console.log("--------****----------")
        },resp => {
        })
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
      queryNoSearch(queryString, cb) {
        let kinds = this.kinds;
        let results = queryString ? kinds.filter(this.createNoFilter(queryString)) : kinds;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createNoFilter(queryString) {
        return (restaurant) => {
          return (restaurant.catalogno.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.form.catalogno = ''+item.catalogno
        this.form.catalogname = item.catalogname
        console.log(item);
      },
      DeleteKinds(){

        this.$confirm('确认要删除吗，删除后无法恢复').then(_=>{
          let connect = new Connect()
          let para = {
            catalogname:this.form.catalogname,
            catalogno:this.form.catalogno
          }

          if(!this.form.catalogname || this.form.catalogname.length === 0){
            this.$message.error('请填写分类名称');
            return;
          }
          if(!this.form.catalogno || this.form.catalogno.length === 0){
            this.$message.error('请填写分类编号');
            return;
          }

          axios.post(connect.host + connect.ip.deleteKinds + '?catalogno=' +this.form.catalogno,{}).then(resp=>{

            if(resp.data.status){
              this.$message.success('删除成功')
              this.$router.go(0)
            }else{
              this.$message.error(resp.data.message)
            }

          },resp=>{

            if(typeof(resp.data) !== undefined || resp.data == null){
              this.$message.error('网络连接失败！')
            }else{
              this.$message.error(resp.data.data.message)
            }
        }).catch(_=>{})


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
