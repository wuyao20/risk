<template>
  <div class="dashboard-container">
    <div class="dashboard-title">
      <span>各责任部门廉控工作需求明细</span>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="resList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      class="table"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="序号" width="80px" align="center">
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作任务及要求" width="600px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.task }}</span>
        </template>
      </el-table-column>
      <el-table-column label="频次" align="center">
        <template slot-scope="{row}">
          <span>{{ row.frequency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送材料" align="center">
        <template slot-scope="{row}">
          <span>{{ row.material }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作完成时限要求" align="center">
        <template slot-scope="{row}">
          <span>{{ row.deadline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row, $index}">
          <div class="button-container">
            <div>
              <el-button type="primary" size="mini" @click="handleEdit(row, $index + 1)">
                编辑
              </el-button>
            </div>
            <!-- <div>
              <el-button size="mini" type="success" @click="handleModifyStatus(row)">
                上传
              </el-button>
            </div> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import { chooseWork, getWorkCode } from '../../api/department'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      resList: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'userId'
    ])
  },
  created() {
    chooseWork({ gridCode: this.roles[0] }).then(res => {
      this.resList = res.data
    })
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex <= 1) {
        return 'success-row'
      }
      return ''
    },
    handleEdit(row, index) {
      let workCodes = []
      getWorkCode().then(res => {
        workCodes = res.data
        console.log(workCodes, row.workId)
        if (workCodes.includes(row.workId)) {
          switch (index) {
            case 1:
              this.$router.push({
                path: `/department/summary/${row.workId}`
              })
              break
            case 2:
              this.$router.push({
                path: `/department/monthReport/${row.workId}`
              })
              break
            default: break
          }
        } else {
          this.$notify.error({
            title: '权限错误',
            message: '您无权访问此选项!'
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dashboard
    &-container
      margin 30px
      .dashboard-title
        text-align center
        font-size 30px
        line-height 46px
        margin-bottom 8px
        font-weight bold
      .table
        // .button-container
        //   margin 5px auto
        //   display grid
        //   grid-template-columns 100%
        //   grid-template-rows 1fr 1fr
        //   grid-row-gap 10px
</style>
