<template>
<div>

  <el-table
    :data="tableData"
    style="width: 100%">

    <el-table-column
      label="用户名称"
      width="180">
      <template slot-scope="scope">
        <!--<el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>--><!--指针滑动变成有显示-->
        <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="success">{{ scope.row.account }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="评价日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.buyTime|formatDate }}</span>
      </template>
    </el-table-column>

    <el-table-column label="用户评分">
      <template slot-scope="scope">
        <el-rate
          v-model="scope.row.score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
    </template>
    </el-table-column>

    <el-table-column label="用户评价">
      <template slot-scope="scope">
        <el-tag
          :rows="2"
          autosize
          >{{scope.row.judge}}
      </el-tag>
    </template>
    </el-table-column>
  </el-table>


</div>

</template>

<script>
import axios from "axios"
import Connect from '@/services/service'
import {formatDate} from '@/utils/filters.js'
  export default {
    name:'bookcomment',
    data() {
      return {
        grade:null,
        remark:'',
        tableData: [{
          account: 'geekLR',
          bookno:0,
          buyTime: new Date(),//说明类型
          judge: 'good good good',
          num:0,
          score:3.5
        }]
      }
    },
    props:['id'],//父组件中函数的名称
    filters:{
      formatDate(time){
        var data = new Date(time);
        return formatDate(data,'yyyy-MM-dd');
      }
    },
    created:function(){
      this.getBookRecord();
    },
    methods: {
     
      addBookToCart(){
        let connect = new Connect()
        axios.post(connect.host+connect.ip.addSaleCar ,{
          account:this.user.userName,
          bookno:this.id,
          addtime:new Date().getTime(),
          num:this.form.num1
        }).then(resp=>{
          this.$message.success(resp.data.message)
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })

      },
      getBookRecord(){
        //console.log(this.id)
        //console.log('-------------------------------')
        let connect = new Connect()
        axios.post(connect.host+connect.ip.getAllJudge+"?bookno="+this.id,{
        }).then(resp=>{
         //this.$message.success(resp.data.message)
          this.tableData=resp.data.data //由于是数组 在用到的地方使用
          console.log("-------------------------")
          console.log(this.tableData)
        },resp=>{
          this.$message.error("网络连接失败")
        })
      },
    }
  }
</script>
