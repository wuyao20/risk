<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" align="center" width="80">
        <template slot-scope="{$index}">
          <span>{{ $index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险点" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="{row}">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="列名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.columnName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="填写内容" align="center">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="填写时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fillTime.substring(0,10) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryMyRiskRecord } from '../../api/admin'
export default {
  name: 'Index',
  data() {
    return {
      listLoading: false,
      listQuery: {
        fillMonth: ''
      },
      list: []
    }
  },
  created() {
    console.log(this.$route.query)
    queryMyRiskRecord(this.$route.query).then(res => {
      this.list = res.data[0].record
    })
  },
  methods: {
    // handleFilter() {
    //   this.listLoading = true
    //   if (this.listQuery.fillMonth !== '') {
    //     queryMyRecord(this.listQuery).then(res => {
    //       this.list = res.data[0].record
    //       this.listLoading = false
    //     })
    //   } else {
    //     this.$notify.error({
    //       title: '错误',
    //       message: '请先选择月份'
    //     })
    //   }
    // }
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
    .table
      &.warning-row
        background: oldlace
      &.success-row
        background: #f0f9eb
</style>
