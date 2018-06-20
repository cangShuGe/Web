<template>
    <div id="card">
        <el-row  :gutter="20">
            <el-col :span="6" v-for="(item,index) in list" :key="index" >
                <div @click="ChangeView" class="grid-content bg-purple">
                    <img :src="url">
                    <div style="padding: 14px; text-align: center">
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'card',
    created:function(){
      this.list[0].icon = this.url1
      this.list[1].icon = this.url2
      this.list[2].icon = this.url3
      this.list[3].icon = this.url4
    },
    data() {
        return {
            url:'http://img02.tooopen.com/images/20160428/tooopen_sy_157230986799.jpg',
            list: [
                {
                    icon: this.url1,
                    title: '红楼梦'
                },
                {
                    icon: this.url2,
                    title: '漂',
                },
                {
                    icon: this.url3,
                    title: '水浒传',
                },
                {
                    icon: this.url4,
                    title: '活着',
                }
            ]
        }
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'user',
            'userName',
            'url1',
            'url2',
            'url3',
            'url4'
        ])
    },
    methods:{
      ChangeView(){
        this.$router.push({name : 'bookBody'})
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
