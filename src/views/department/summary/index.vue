<template>
  <div class="dashboard-container">
    <div class="dashboard-title">
      <span>个人账号风险点汇总</span>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      class="table"
    >
      <el-table-column label="ID" width="80px" align="center">
        <template slot-scope="{$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险点名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.riskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="责任（牵头）部门" align="center">
        <template slot-scope="{row}">
          <span>{{ row.line1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="责任人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.line2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务事项描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.line3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="廉洁风险点" align="center">
        <template slot-scope="{row}">
          <span>{{ row.line4 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="徐州分公司细化的防控措施" align="center">
        <template slot-scope="{row}">
          <span>{{ row.line5 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" @click="handleClick(row)">填写</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRiskSummary } from '../../../api/admin'
import { mapGetters } from 'vuex'
export default {
  name: 'Summary',
  data() {
    return {
      list: [],
      listLoading: false
    }
  },
  computed: {
    workId() {
      return this.$route.params.workId
    },
    ...mapGetters([
      'name'
    ])
  },
  created() {
    getRiskSummary({ loginName: this.name }).then(res => {
      this.list = res.data
      console.log(this.list)
    })
  },
  methods: {
    handleClick(row) {
      console.log(row)
      this.$router.push({
        path: `/department/statistics/${row.riskName}`
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
</style>
