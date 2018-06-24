<template>
<div>

  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="评价日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
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
            <el-tag size="medium" type="success">{{ scope.row.name }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="用户评分">
      <template slot-scope="scope">
        <el-rate
          v-model="scope.row.scores"
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


  <h3>编写评价</h3>
  <el-row>
    <el-col :span="2" :offset="1">
      <b>评分：</b>
    </el-col>
    <el-col :span="12" :offset="2">
      <el-rate
      v-model="grade"
      show-text>
      </el-rate>
    </el-col>
  </el-row>

  <b>评价（不得少于十字）:</b>
  <br>
  <br>
  <el-input
  type="textarea"
  :autosize="false"
  resize="none"
  :rows="5"
  placeholder="请输入内容"
  v-model="remark">
  </el-input>
  <br>
  <br>
  <el-row>
    <el-col :span="4" :offset="20">
      <el-button type="success" @click="submitRemark" >发表评论</el-button>
    </el-col>
  </el-row>
  <br>
  <br>
  <br>

</div>

</template>

<script>
  export default {
    name:'bookcomment',
    data() {
      return {
        grade:null,
        remark:'',
        tableData: [{
          date: '2018-05-02',
          name: 'geekLR',
          num: 10,
          scores:3.5,
          judge: 'good good good'
        }, {
          date: '2018-05-04',
          name: 'babyQ',
          num: 3,
          scores:4.5,
          judge: 'good good good'
        }, {
          date: '2018-05-01',
          name: '王小虎',
          num: 2,
          scores:1.5,
          judge: 'bad bad bad'
        }, {
          date: '2018-05-03',
          name: 'QingGang',
          num: 3,
          scores:4.5,
          judge: '还是挺好的'
        }]
      }
    },
    props:['id'],
    created:function(){

    },
    methods: {
      submit(){

      },
      submitRemark(){

        if(this.grade === null || this.grade === 0){
          this.$message.error('请打分')
        }else if(!this.remark){
          this.$message.error('请编写评价')
        }else if(this.remark.length < 10){
          this.remark.error('评价不得少于十字')
        }else{
          this.submit()
        }

      },
      getBookRecord(){

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

      }
    }
  }
</script>
