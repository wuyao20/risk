<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
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
      <el-table-column label="列名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.columnName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否展示" align="center">
        <template slot-scope="{row}">
          <span>{{ row.isShow===1?'展示': '隐藏' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否展示" align="center">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.show"
            @change="switchChange(row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryColumn, updateColumn } from '../../../api/admin'

export default {
  name: 'Index',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: []
    }
  },
  created() {
    queryColumn({ gridCode: 1 }).then(res => {
      const { data } = res
      this.list = data.map(item => {
        item.show = item.isShow === 1
        return item
      })
    })
  },
  methods: {
    switchChange(row) {
      const params = {
        columnId: row.columnId,
        columnName: row.columnName,
        isShow: row.show ? 1 : 0
      }
      updateColumn(params).then(res => {
        const { errno, data } = res
        if (errno === 0) {
          this.$notify.success({
            title: '成功',
            message: data
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '修改失败，请重试'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
