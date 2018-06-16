<template>
    <div id="person">
        <el-header>

        </el-header>
        <el-main>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
              </el-table-column>
            </el-table>
        </el-main>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'person',
    data() {
        return {

        }
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'user'
        ])
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
