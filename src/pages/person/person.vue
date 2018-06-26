<template>
  <div id="person" class="hahaha">
    <el-main>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name="first">
        <el-row>
            <el-col :span="4">
                <div class="grid-content">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content">
                  <br>
                  <h2>用户信息：</h2>
                </div>
            </el-col>
          </el-row>


          <el-row >
            <el-col :span="4">
                <div class="grid-content">
                </div>
            </el-col>

            <el-col :span="16">
              <div class="grid-content">
                  <el-form :inline="true" :model="formInline" @submit.native.prevent="verifyChangeMessage" label-width="80px">
              <el-form-item label="用户名:">
                  <el-input :disabled="true" v-model="formInline.username" placeholder="用户名不能为空" auto-complete='off'/>
              </el-form-item>
              <el-form-item label="邮箱:">
                  <el-input :disabled="true" v-model="formInline.email" placeholder="邮箱不能为空" auto-complete='off'/>
              </el-form-item>
              <el-form-item label="性别:">
                  <el-select v-model="formInline.sex" placeholder="请选择性别">
                    <el-option
                      label="男"
                      value="男">
                    </el-option>
                    <el-option
                      label="女"
                      value="女">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="生日：">
                <div class="block">

                  <el-date-picker
                    v-model="formInline.birthday"
                    :value="formInline.birthday"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="积分：">
                {{formInline.credit}}
              </el-form-item>

              <el-form-item>
                  <el-input class="login_btn login_inputColor" type="submit" value="修改" />
              </el-form-item>
          </el-form>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content"></div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">
              <div class="grid-content"></div>
            </el-col>
              <el-col :span="10">
              <div class="grid-content">
                  <el-form :inline="true" @submit.native.prevent="buyVip">
                    <el-form-item label="会员等级:">
                      {{level}}
                    </el-form-item>
                    <el-form-item>
                        <el-input
                          v-if="formInline.member === '您还不是会员'"
                          class="login_btn login_inputColor" type="submit" value="升级会员" />
                    </el-form-item>
                  </el-form>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content">
                <b>隐私信息修改：</b>
                <el-button type="warning" @click="changePwdDialog = true" >修改密码</el-button>
              </div>
            </el-col>
            </el-row>
      </el-tab-pane>
      <el-tab-pane label="购买记录" name="second">
        <el-row>
              <el-col :span="4">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                <h2>购买记录</h2>
              </div>
            </el-col>
            </el-row>
          <el-row >
            <el-col :span="3">
                <div class="grid-content"></div>
            </el-col>

            <el-col :span="18">
              <div class="grid-content">
                <el-table placement="center"
                border
                :data="saleMessage"
                style="width: 100%">
                    <el-table-column
                        prop="buyTime1"
                        label="日期"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="bookname"
                        label="书籍名称"
                        width="300">
                    </el-table-column>
                    <el-table-column
                      label="书籍作者"
                      width="180"
                      prop="author">
                    </el-table-column>
                    <el-table-column
                      label="单价"
                      width="180"
                      prop="price">
                    </el-table-column>
                    <el-table-column
                        width="80"
                        prop="num"
                        label="购买数量">
                    </el-table-column>
                    <el-table-column
                      type="expand"
                      label="评价">
                        <template slot-scope="props">
                          <div v-if="props.row.score === null || props.row.score === 0">
                            <!-- <span type="text">请评价</span> -->
                            <h3>编写评价</h3>
                            <el-row>
                              <el-col :span="2" :offset="1">
                                <b>评分：</b>
                              </el-col>
                              <el-col :span="12" :offset="2">
                                <el-rate
                                v-model="value[props.$index]"
                                show-text>
                                </el-rate>
                              </el-col>
                            </el-row>

                            <b>评价:</b>
                            <br>
                            <br>
                            <el-input
                            type="textarea"
                            :autosize="false"
                            resize="none"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="remark[props.$index]">
                            </el-input>
                            <br>
                            <br>
                            <el-row>
                              <el-col :span="4" :offset="20">
                                <el-button type="success" @click="submitRemark(props.row,props.$index)" >发表评论</el-button>
                              </el-col>
                            </el-row>
                          </div>
                          <div v-else>
                            <h3>评分</h3>
                            <el-rate
                              v-model="props.row.score"
                              disabled
                              show-score
                              text-color="#ff9900"
                              score-template="{value}">
                            </el-rate>
                            <h3>评价</h3>
                            <p>{{props.row.judge}}</p>
                          </div>
                        </template>
                    </el-table-column>

                    <!--<el-table-column
                        width="50"
                        prop="judge"
                        label="评价"
                        type="expand"
                    >
                    <template slot-scope="scope">
                          <div v-if="scope.row.judge === null || scope.row.judge === ''">
                            <span type="text">请评价</span>
                            <el-input placeholder="请输入您的评价内容" v-model="inputJudge" clearable></el-input>
                            <el-button type="success" round  size="small" @click="submitJudge(scope.$index,scope.row)">提交评价</el-button>
                          </div>
                          <span v-else>{{scope.row.judge}}</span>
                        </template>

                    </el-table-column>-->

                </el-table>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content"></div>
            </el-col>
          </el-row>
      </el-tab-pane>
      <el-tab-pane label="我的书架" name="third">
        <el-row>
              <el-col :span="4"><div class="grid-content"></div></el-col>
              <el-col :span="12"><div class="grid-content"><h2>您拥有的电子书</h2></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div class="grid-content"></div></el-col>
              <el-col :span="16">
                <div class="grid-content">
                  <el-table placement="center"
                border
                :data="EbookMessage"
                style="width: 100%">
                    <el-table-column
                        fixed
                        prop="bookname"
                        label="书籍名称"
                        width="300">
                    </el-table-column>
                    <el-table-column
                      label="作者"
                      width="180"
                      prop="author">
                    </el-table-column>
                    <el-table-column
                        width="80"
                        prop="price"
                        label="花费积分">
                    </el-table-column>
                    <el-table-column
                        width="210"
                        prop="resume"
                        label="简介">
                    </el-table-column>
                    <el-table-column
                    width="100"
                        label="">
                        <template slot-scope="scope">
                          <el-button circle icon="el-icon-download" @click="downloadEbook(scope.$index,scope.row)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
              </el-col>
            </el-row>
            <br>
      </el-tab-pane>
      <el-tab-pane label="我的购物车" name="fourth">
        <el-row>
              <el-col :span="4">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">
                <h2>购物车</h2>
              </div>
            </el-col>
            </el-row>
            <el-row >
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>

            <el-col :span="16">
              <div class="grid-content">
                <el-table
              border
              @selection-change="handleSelectionChange"
              :data="saleCar"
              style="width: 100%">
              <el-table-column
                width="250"
                fixed
                label="书籍名称"
                prop="bookname">
              </el-table-column>
              <el-table-column
                label="书籍作者"
                width="180"
                prop="author">
              </el-table-column>
              <el-table-column
                label="书籍数量"
                width="90">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.num" :min="1" :max="1000000" class="demo-input-suffix" :value="scope.row.num" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="单价"
                width="90"
                prop="price">
              </el-table-column>
              <el-table-column
                label="书籍简介"
                width="222"
                prop="resume">
              </el-table-column>
              <el-table-column
                type="selection">
              </el-table-column>
            </el-table>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content"></div>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="6">
                <div class="grid-content"></div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content">
                  <b>当前选购的书籍总数：{{booksum}}</b>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content"></div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content">
                  <b>当前选购的书籍价格：{{moneySum}}</b>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content"></div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content">
                  <el-button size="large" @click="buyAll" type="success">购买</el-button>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content"></div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content">
                  <el-button @click="deleteRow" size="large" type="danger">删除</el-button>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content"></div>
              </el-col>
            </el-row>
      </el-tab-pane>
    </el-tabs>
    </el-main>
    <br>
    <br>
    <br>
    <br>

    <el-dialog title="更改密码" :visible.sync="changePwdDialog">
            <el-form :model="formChangePwd" @submit.native.prevent="verifyPwd">
              <el-form-item>
                <el-input placeholder="旧密码" type="password" v-model="formChangePwd.oldPwd" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="新密码" type="password" v-model="formChangePwd.newPwd" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="确认新密码" type="password" v-model="formChangePwd.ensure" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input class="login_btn login_inputColor" type="submit" value="确认修改密码" />
              </el-form-item>
            </el-form>
          </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
import myHeader from '@/layout/header'
import { mapState } from 'vuex'
import Connect from '@/services/service'
import md5 from 'js-md5'
import cookie from '@/cookie/cookie'
export default {
    name: 'person',
    components: { myHeader },
    data() {
        return {
          EbookMessage:[
            {EbookId:'123456789',bookname:'asdfasdf',author:'sdsdfsdf',price:23,resume:'asdsdfsdsfsdfgsdfgsdfgsdfgsdfgsdfgfasdfas'},
          ],
          booksum:0,
          moneySum:0,
          formChangePwd:{
            oldPwd:'',
            newPwd:'',
            ensure:''
          },
          changePwdDialog:false,
          formInline:{
            userId:'',
            username:'this.user.userName',
            email:'2916144319@qq.com',
            sex:'',
            birthday:new Date('Mon Jun 04 2018'),
            member:0,
            password:'',
            credit:223
          },
          level:0,
          memeber:0,
          saleMessage:[
            {buyTime:'2018-1-1',buyTime1:'2018-1-1',author:'上海市普陀区真北路',bookname:'asdfsd',num:'12',score:0,bookno:'123123124',price:10,judge:''},
            {buyTime:'2018-1-1',buyTime1:'2018-1-1',author:'上海市普陀区真北路',bookname:'asdfsd',num:'12',score:0,bookno:'123123',price:10,judge:''},
          ],
          saleCar:[
            {bookno:'12987122',bookname:'好滋好味鸡蛋仔',catalogno:'江浙小吃、小吃零食',kind:'荷兰优质淡奶，奶香浓而不腻',author:'上海市普陀区真北路',publishTime:'王小虎夫妻店',press:'10333',resume:'sdfasdf',url:'sdfsadfas',num:3,price:4},
            {bookno:'12987122',bookname:'好滋好味鸡蛋仔',catalogno:'江浙小吃、小吃零食',kind:'荷兰优质淡奶，奶香浓而不腻',author:'上海市普陀区真北路',publishTime:'王小虎夫妻店',press:'10333',resume:'sdfasdf',url:'sdfsadfas',num:3,price:4},
            {bookno:'12987122',bookname:'好滋好味鸡蛋仔',catalogno:'江浙小吃、小吃零食',kind:'荷兰优质淡奶，奶香浓而不腻',author:'上海市普陀区真北路',publishTime:'王小虎夫妻店',press:'10333',resume:'sdfasdf',url:'sdfsadfas',num:3,price:4},
            {bookno:'12987122',bookname:'好滋好味鸡蛋仔',catalogno:'江浙小吃、小吃零食',kind:'荷兰优质淡奶，奶香浓而不腻',author:'上海市普陀区真北路',publishTime:'王小虎夫妻店',press:'10333',resume:'sdfasdf',url:'sdfsadfas',num:3,price:4},
            {bookno:'12987122',bookname:'好滋好味鸡蛋仔',catalogno:'江浙小吃、小吃零食',kind:'荷兰优质淡奶，奶香浓而不腻',author:'上海市普陀区真北路',publishTime:'王小虎夫妻店',press:'10333',resume:'sdfasdf',url:'sdfsadfas',num:3,price:4}
          ],
          bookkinds:[{
            id:'',
            // kinds
          }],
          activeName: 'first',
          value:new Array(),
          remark:new Array(""),
          choiceChose:new Array()
        }
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'user',
            'userName',
        ])
    },
    created:function(){
      let connect = new Connect()
      // console.log("--------------")
      // console.log(this.user.userName)
      // console.log("*******************")
      connect.findPersonMessage(this.user.userName) //初始化获取个人信息

      this.formInline.username = this.user.userName
      this.formInline.userId = this.user.userId
      this.formInline.birthday = new Date(this.user.birthday)
      this.formInline.sex = this.user.sex
      this.formInline.email = this.user.email
      this.formInline.member = this.user.member
      this.formInline.credit = this.user.credit
      this.formInline.password = this.user.password
      console.log(this.formInline.birthday)
      this.member = this.formInline.member
      if(this.formInline.member === 0){
        this.formInline.member = '您还不是会员'
      }else{
        this.formInline.member = this.formInline.member + '级会员'
      }
      this.showRecord()
      this.showMyEbook()

      this.showMySaleCar(1)

      if(this.formInline.credit>=0 && this.formInline.credit <= 100){
        this.level = 1
      }else if(this.formInline.credit>100 && this.formInline.credit<500){
        this.level = 2;
      }else{
        this.level = 3;
      }
    },
    methods:{
      showMySaleCar(index){

        let connect = new Connect()
        axios.post(connect.host+connect.ip.showSaleCar + '?account='
        +this.user.userName+'&pageNum=' + index +'&pageSize=' + 10,{

        }).then(resp=>{
          console.log(resp)
          if(index < resp.data.total){
            this.showMySaleCar(index+1)
          }
          if(index === 1){
            this.saleCar = resp.data.data
          }
          else{

            this.saleCar.push(resp.data.data)
          }
          console.log(this.saleCar)
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })

      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      showMyEbook(){
        let connect = new Connect()
        axios.post(connect.host+connect.ip.showMyEbook + '?account='+this.user.userName,{

        }).then(resp=>{
          console.log('ebook')
          console.log(resp.data.data)
          this.EbookMessage = resp.data.data
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })
      },
      showSaleCar(index){
        let connect = new Connect()
        axios.post(connect.host+connect.ip.showSaleCar + '?account='+this.user.userName,{

        }).then(resp=>{
          console.log(resp.data.data)
          this.saleMessage = resp.data.data
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })
      },
      showRecord(){
        let connect = new Connect()

        axios.post(connect.host+connect.ip.showMyBuy + '?account='+this.user.userName,{

        }).then(resp=>{
          console.log('record')
          console.log(resp.data.data)
          this.saleMessage = resp.data.data
          for(var i=0;i<this.saleMessage.length;i++){
            console.log(this.saleMessage[i].buyTime)
            this.saleMessage[i]['buyTime1'] = new Date(this.saleMessage[i].buyTime).toDateString()
            console.log(this.saleMessage[i].buyTime)
          }
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })
      },
      downloadEbook(index,row){
        window.open(row.press)
      },
      sumMoney(){
        if(this.choiceChose.length == 0){
          this.booksum = 0
          this.moneySum = 0
        }else{
          this.moneySum = 0
          this.booksum = 0
          this.choiceChose.forEach((row)=>{
            this.booksum += row.num
            this.moneySum += row.num * row.price
          })
        }
      },
      buyAll(){
        this.$confirm('确定要购买所选商品吗？').then(_=>{
          //购买商品

          let connect = new Connect()
          let num = this.choiceChose.length
          for(var i = 0;i<this.choiceChose.length;i++ ){
            axios.post(connect.host+connect.ip.buySaleCar + '?account='+this.user.userName+'&buyTime='+new Date() .getTime()+'&num='+this.choiceChose[i].num+'&bookno='+this.choiceChose[i].bookno + '&addtime=' + this.choiceChose[i].addtime,{

        }).then(resp=>{
          if(num === i){
            this.$message.error('购买成功! 请等待快递')
            this.$router.go(0)
          }
        },resp=>{
            if(!resp.data){
              this.$message.error('网络连接失败')
            }else{
              this.$message.error(resp.data.message)
            }
        })
          }
        }).catch(_=>{
          //取消购买商品不进行任何操作
        })
      },
      handleSelectionChange(val){
         this.choiceChose = val;
         console.log(this.choiceChose)
         console.log(val)
         this.sumMoney()
      },
      deleteRow() {
        this.$confirm('确定要删除所选商品吗？').then(_=>{
          //删除所选商品
          console.log('删除' + this.choiceChose.length)
          console.log(this.choiceChose)
          let num = this.choiceChose.length
          for(var i = 0;i<this.choiceChose.length;i++ ){
            console.log('jinru' + i)
            let connect = new Connect()
            axios.post(connect.host+connect.ip.deleteSaleCar + '?account='+this.user.userName+'&bookno='+this.choiceChose[i].bookno + '&addtime=' + this.choiceChose[i].addtime,{

            }).then(resp=>{
            if(num === i){
              //this.activeName = 'fourth'
             // store.commit('set_activeName', 'fourth');
              this.$message.error('删除成功!')
              this.$router.go(0)
            }
            },resp=>{
              if(!resp.data){
                this.$message.error('网络连接失败')
              }else{
              this.$message.error(resp.data.message)
            }
          })
          }
        }).catch(_=>{
          //取消操作，不进行任何操作
        })

      },
      buyVip(){
        this.$confirm('您一年将支付***元，过期如不续费将取消您的会员资格，确认购买？').then(_=>{
          let connect = new Connect()
          //购买会员
          axios.post(connect.host + connect.ip.buyVip +'?account=' + this.formInline.username,{

          }).then(resp=>{
          this.$message.success(resp.data.message)
          },resp=>{
          if(typeof(resp.data) === undefined || resp.data === null ){
                this.$message.error('网络连接失败')
          }else{
             this.$message.error(resp.data.message)
          }
          })

        }).catch(_=>{
          //不购买会员，不进任何操作
        })

      },
      changePwd(){
        let connect = new Connect()
        axios.post(connect.host + connect.ip.changePwd + '?account='+this.formInline.username+'&pwd=' + md5(this.formChangePwd.oldPwd) + '&newPwd='+ md5(this.formChangePwd.newPwd),{
          }).then(resp=>{
            if(resp.data.status){
              this.$message.success(resp.data.message)
              this.$store.commit('set_user_online',false)
              this.$store.commit('set_user','')
              cookie.removeall()
              this.$router.push('/index/realbook/1')
              this.$message.warning("请重新登录")
            }else{
              this.$message.error(resp.data.message)
            }
        },resp=>{
          if(typeof(resp.data) === undefined || resp.data === null ){
                this.$message.error('网络连接失败')
              }else{
                this.$message.error(resp.data.message)
              }
        })
      },
      verifyPwd(){
        if(!this.formChangePwd.oldPwd || !this.formChangePwd.newPwd || !this.formChangePwd.ensure){
          this.$message.error('请确认所需信息均已输入')
        }else if(this.formChangePwd.newPwd.length < 6 || this.formChangePwd.newPwd.length > 20){
          this.$message.error('请保证密码在6-20位之间')
        }else if(this.formChangePwd.newPwd != this.formChangePwd.ensure){
          this.$message.error('请确保确认密码和密码输入相同')
        }else{
          this.changePwd()
        }
      },
      changeMessage(){
        let connect = new Connect()
        //更改个人信息

        axios.post(connect.host + connect.ip.updateUser,{
          account:this.formInline.username,
              pwd:'12345678',
              mailbox:this.formInline.email,
              member:this.member,
              address:' ',
              credit:this.formInline.credit,
              name:' ',
              sex:this.formInline.sex,
              birthday:this.formInline.birthday.getTime(),
        }).then(resp=>{
          if(resp.data.status){
            this.$message.success(resp.data.message)
            //this.activeName="second"
            this.$router.go(0)
            //location.reload()
          }else{
            this.$message.error(resp.data.message)
          }
        },resp=>{
          if(typeof(resp.data) === undefined || resp.data === null ){
                this.$message.error('网络连接失败')
              }else{
                this.$message.error(resp.data.message)
              }
        })

      },
      verifyChangeMessage(){
        if(!this.formInline.username){
          this.$message.error('用户名不能为空')
        }else if(this.formInline.username.length < 3 || this.formInline.username.length > 20){
          this.$message.error('用户名不能为空')
        }else{
          this.changeMessage()
        }
        console.log(this.formInline.birthday)
        console.log(this.value)
      },
      filterTag(row,column){
        if(row.score === null || row.score === 0){
          return false
        }
        return true
      },
      submit(row,index){
        let connect = new Connect()
        axios.post(connect.host + connect.ip.submitRemark
        + '?account=' + this.user.userName + '&bookno='
        +row.bookno + '&buyTime=' + row.buyTime + '&judge='
        +this.remark[index] +'&score='+this.value[index],{

        }).then(resp=>{
          console.log("-------")
          row.score = this.value[index],
          row.judge = this.remark[index]
          console.log(this.remark[index])
          console.log("-------")
          this.$message.success('提交评论成功')
        },resp=>{
          if(!resp.data){
            this.$message.error('网络连接失败')
          }else{
            this.$message.error(resp.data.message)
          }
        })
      },
      submitRemark(row,index){
        if(this.value[index] === null || this.value[index] === 0){
          this.$message.error('请打分')
        }else if(!this.remark[index]){
          this.$message.error('请编写评价')
        }else if(this.remark[index] < 10){
          this.$message.error('评价不得少于十字')
        }else{
          this.submit(row,index)
        }
      },
    }
}
</script>
<style>
.hahaha{
  width: 100%;
  height: 1200px;
  /*background-color: 	rgb(179, 255, 0);
  background-position: center center;
  background-repeat:  repeat;
  background-image: 'static/uncleLian.jpg';*/
  background: url('/static/back2.jpg') center center no-repeat ;
  /*background-size: 1000px auto;*/
}
</style>

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
