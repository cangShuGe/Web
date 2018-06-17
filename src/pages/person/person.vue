<template>
    <div id="person">
        <my-header></my-header>
        <el-main>
          <el-form :inline="true" :model="formInline" @submit.native.prevent="verify" label-width="80px">
              <el-form-item label="用户名">
                  <el-input v-model="formInline.username" placeholder="用户名不能为空" auto-complete='off'/>
              </el-form-item>
              <el-form-item>
                  <el-input class="login_btn login_inputColor" type="submit" value="修改" />
              </el-form-item>
          </el-form>
            <el-table
            border
            :data="saleMessage"
            style="width: 100%">
                <el-table-column
                    prop="date"
                    fixed
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    width="180"
                    prop="num"
                    label="购买数量">
                </el-table-column>
                <el-table-column
                    width="380"
                    prop="remark"
                    label="评分">
                    <template slot-scope="scope">
                      <div v-if="scope.row.remark === null || scope.row.remark === ''">
                        <span type="text">请评价</span>
                        <el-select v-model="value" placeholder="请选择分数">
                          <el-option
                            v-for="item in 5"
                            :key="item"
                            :label="item+'分'"
                            :value="item">
                          </el-option>
                        </el-select>
                        <!-- <br /><br /> -->
                        <el-button type="success" round  size="small" @click="remark(scope.row)">提交评价</el-button>
                      </div>
                      <span v-else>{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
              :data="saleCar"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="书籍名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="书籍作者">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="书籍简介">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="书籍分类">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="出版时间">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="出版社">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="书籍价格">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="书籍名称"
                prop="id">
              </el-table-column>
              <el-table-column
                label="书籍作者"
                prop="name">
              </el-table-column>
              <el-table-column
                label="书籍数量"
                prop="desc">
              </el-table-column>
              <el-table-column
                label="总计"
                prop="desc">
              </el-table-column>
            </el-table>
        </el-main>
    </div>
</template>
<script>
import myHeader from '@/layout/header'
import { mapState } from 'vuex'
export default {
    name: 'person',
    components: { myHeader },
    data() {
        return {
          formInline:{
             username:'this.user.userName'
          },
          saleMessage:[
            {date:'2018-1-1',name:'asdfsd',num:'12',remark:''},
            {date:'2018-1-1',name:'asdfsd',num:'12',remark:'sdf'},
            {date:'2018-1-1',name:'asdfsd',num:'12',remark:'sdfa'},
            {date:'2018-1-1',name:'asdfsd',num:'12',remark:'asdfa'},
          ],
          saleCar:[
            {

              id: '12987122',
              name: '好滋好味鸡蛋仔',
              category: '江浙小吃、小吃零食',
              desc: '荷兰优质淡奶，奶香浓而不腻',
              address: '上海市普陀区真北路',
              shop: '王小虎夫妻店',
              shopId: '10333'
            }, {
              id: '12987123',
              name: '好滋好味鸡蛋仔',
              category: '江浙小吃、小吃零食',
              desc: '荷兰优质淡奶，奶香浓而不腻',
              address: '上海市普陀区真北路',
              shop: '王小虎夫妻店',
              shopId: '10333'
            }, {
              id: '12987125',
              name: '好滋好味鸡蛋仔',
              category: '江浙小吃、小吃零食',
              desc: '荷兰优质淡奶，奶香浓而不腻',
              address: '上海市普陀区真北路',
              shop: '王小虎夫妻店',
              shopId: '10333'
            }, {
              id: '12987126',
              name: '好滋好味鸡蛋仔',
              category: '江浙小吃、小吃零食',
              desc: '荷兰优质淡奶，奶香浓而不腻',
              address: '上海市普陀区真北路',
              shop: '王小虎夫妻店',
              shopId: '10333'
            }
          ],
          bookkinds:[{
            id:'',
            kinds
          }],
          value:2
        }
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'user'
        ])
    },
    created:function(){
       console.log(this.user.userName)
       this.formInline.username = this.user.userName
    },
    methods:{
      filterTag(row,column){
        if(row.remark === null || row.remark === ''){
          return false
        }
        return true
      },
      remark(row){
        row.remark = this.value
        console.log(this.value)
      }
    }
}
</script>
<style lang='stylus'>
#person {
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      .el-button{
          fill: currentColor;
      }
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
