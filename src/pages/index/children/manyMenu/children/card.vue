<template>
    <div id="card">
        <el-row  :gutter="20">
            <el-col v-for="index in 4" :key="index" :span="6">
                <div v-if="index <= all.length" @click="ChangeView(all[index - 1])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[index - 1].url) == undefined)" :src="all[index - 1].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[index - 1].bookname}}</span>
                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="6" :v-if="hard">
                <div @click="ChangeView(all[1])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[1].url) == undefined)" :src="all[1].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[1].bookname}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :v-if="hard">
                <div @click="ChangeView(all[2])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[2].url) == undefined)" :src="all[2].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[2].bookname}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :v-if="hard" >
                <div @click="ChangeView(all[3])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[3].url) == undefined)" :src="all[3].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[3].bookname}}</span>
                    </div>
                </div>
            </el-col> -->
        </el-row>

        <el-row :gutter="20">
          <el-col v-for="index in 8" :key="index" :span="6">
                <div v-if="index <= all.length  && index > 4" @click="ChangeView(all[index - 1])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[index - 1].url) == undefined)" :src="all[index - 1].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[index - 1].bookname}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- <el-row  :gutter="20">
            <el-col :span="6"  :v-if="hard">
                <div @click="ChangeView(all[4])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[4].url) == undefined)" :src="all[4].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[4].bookname}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :v-if="hard" >
                <div @click="ChangeView(all[5])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[5].url) == undefined)" :src="all[5].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[5].bookname}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" :v-if="hard">
                <div @click="ChangeView(all[6])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[6].url) == undefined)" :src="all[6].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[6].bookname}}</span>
                    </div>
                </div>
            </el-col>
            <el-col id='h' :v-if="hard" :span="6" >
                <div @click="ChangeView(all[7])" class="grid-content bg-purple">
                    <img :v-if="!(typeof(all[7].url) == undefined)" :src="all[7].url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{all[7].bookname}}</span>
                    </div>
                </div>
            </el-col>
        </el-row> -->

        <el-row>
          <el-col :span="6" :offset="6">
            <el-button @click="lastPage">上一页</el-button>

          </el-col>
          <el-col :span="6" :offset="3">
            <el-button @click="nextPage">下一页</el-button>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from "axios"
import { postRequest,putRequest,getRequest } from '@/utils/api'
import Connect from '@/services/service'
import { mapState } from 'vuex'
export default {
    name: 'card',
    created:function(){
      // for(var i = 1; i <= this.allTotal;i++){
        console.log(this.ebook)
        this.getBook()
      // }
    },
    props:['message','ebook'],
    data() {
        return {
            // currentPage:0,
            allTotal:1,
            all:[
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
              {bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},

            ],
            ite:{bookno:'0',  bookname:'0',catalogno: '1', author:'0', publishTime:' ', press:' ', total:0, price:0,resume: ' ',url: ''},
            currentPage:1,
            connect:new Connect(),
            handle:false
        }
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'user',
            'userName',
        ]),
        kindsId:function(){
          return this.message
        },
    },
    watch:{
      kindsId:function(){
        this.getBook()
      }
    },
    methods:{
      lastPage(){
        this.handle = false
        if(this.currentPage === 1){
          this.$message.error('当前已经是首页')
        }else{
          this.currentPage = this.currentPage - 1
          this.getBook()
        }
      },
      nextPage(){
        this.handle = true
        if(this.currentPage === this.allTotal){
          this.$message.error('当前已经是尾页')
        }else{
          this.currentPage = this.currentPage + 1
          this.getBook()
        }
      },
      getBook(){
        if(this.ebook === true){
          axios.post(this.connect.host + this.connect.ip.allKindsEBooks + '?pageNum='+this.currentPage+'&pageSize=8' +'&catalogno='+this.kindsId,{
            pageNum:this.currentPage,
            pageSize:8
          }).then(resp=>{
            if(resp.data.status){
              this.allTotal = resp.data.total
              this.all=resp.data.data
            }
          },resp => {
          })
        }else{
          axios.post(this.connect.host + this.connect.ip.allKindsBooks+'?pageNum='+this.currentPage+'&pageSize=8'+'&catalogno='+this.kindsId,{
            pageNum:this.currentPage,
            pageSize:8
          }).then(resp=>{
            if(resp.data.status){
            this.allTotal = resp.data.total
            this.all=resp.data.data
            }
          },resp => {
          })

        }
      },
      ChangeView(book){
        if(this.ebook === true){

          this.$confirm('是否要下载？将要花费' + book.price + '积分').then(_=>{
              window.open(book.press)
          }).catch(_=>{

          })

        }else{
          this.$router.push({path : '/index/bookBody/' + book.bookno })
        }
      }
    }
}
</script>
<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .grid-content img{
    width:100%;
    height: 100%;
  }
</style>
<style lang='stylus'>
color1 = #55c8ca
color2 = #f7b87f
color3 = #36a3f7
color4 = #34bfa3
#card {
    .count{
        padding: 20px;
        .count-item{
            user-select: none;
            margin-bottom: 32px;
            .item-container{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                background-color: #f3f4f5;
                border-radius: 6px;
                cursor: pointer;
                &:hover{
                    opacity: 0.8;
                }
                &.item-container-1{
                    background: color1;
                }
                &.item-container-2{
                    background: color2;
                }
                &.item-container-3{
                    background: color3;
                }
                &.item-container-4{
                    background: color4;
                }
                .icon{
                    padding: 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease-out;
                    i{
                        font-size: 48px;
                        color: #fff;
                    }
                }
                .text{
                    text-align: right;
                    color: #fff;
                    .title{
                        font-size: 16px;
                        margin-bottom: 12px;
                    }
                    .number{
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>
