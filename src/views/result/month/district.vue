<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="登陆账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.department" placeholder="区县名称" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in departments" :key="item.depName" :label="item.depName" :value="item.depName" />
      </el-select>
      <el-date-picker
        v-model="listQuery.fillMonth"
        type="month"
        placeholder="选择月份"
        class="filter-item"
        format="yyyy 年 MM 月"
        value-format="yyyyMM"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        下载
      </el-button>
    </div>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="props.row.record"
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
            <el-table-column label="登录名" align="center" width="100">
              <template slot-scope="{row}">
                <span>{{ row.loginName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部门" align="center" width="100">
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
            <el-table-column label="填写时间" align="center" width="100">
              <template slot-scope="{row}">
                <span>{{ row.fillTime.substring(0, 10) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="ID" align="center" width="80">
        <template slot-scope="{$index}">
          <span>{{ $index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="填写人员" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="{row}">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

  </div>
</template>

<script>
import { queryDistrictWritePage, queryDistrictWrite, getDepartColumnName, downloadNewDistrictMonth } from '../../../api/admin'
import Pagination from '@/components/Pagination'
import { parseTime2 } from '../../../utils'
export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      tableKey: 1,
      total: 0,
      departments: [
        { depName: '邳州分公司' },
        { depName: '新沂分公司' },
        { depName: '丰县分公司' },
        { depName: '沛县分公司' },
        { depName: '贾汪分公司' },
        { depName: '铜山县分公司' },
        { depName: '睢宁县分公司' },
        { depName: '市区公众营销中心' },
        { depName: '市区政企营销中心' }
      ],
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        loginName: '',
        fillMonth: '',
        department: ''
      },
      listLoading: false,
      list: [],
      downloadLoading: false,
      columns: []
    }
  },
  created() {
    getDepartColumnName().then(res => {
      this.columns = res.data.map(item => {
        return item.brandName
      })
      this.columns.unshift('姓名')
      this.columns.unshift('部门')
      this.columns.unshift('账号')
    })
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      queryDistrictWritePage(this.listQuery).then(res => {
        res.data.content.forEach(content => {
          content.record.forEach(item => {
            item.department = content.department
          })
        })
        this.list = res.data.content
        this.total = this.list.length
        this.listLoading = false
      })
    },
    handleDownload() {
      if (this.listQuery.fillMonth === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择月份'
        })
      } else {
        this.downloadLoading = true
        // queryDepartWrite(this.listQuery).then(res => {
        //   const tmp = res.data
        //   const result = []
        //   for (let j = 0; j < tmp.length; j++) {
        //     for (let i = 0; i < tmp[j].record.length; i++) {
        //       result.push({
        //         loginName: tmp[j].loginName,
        //         name: tmp[j].name,
        //         department: tmp[j].department,
        //         id: tmp[j].record[i].id,
        //         columnName: tmp[j].record[i].columnName,
        //         content: tmp[j].record[i].content,
        //         fillMonth: tmp[j].record[i].fillMonth,
        //         fillTime: tmp[j].record[i].fillTime
        //       })
        //     }
        //   }
        downloadNewDistrictMonth(this.listQuery).then(res => {
          const result = res.data
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = this.columns
            const filterVal = [
              'loginName',
              'department',
              'name',
              'columnName1',
              'columnName2',
              'columnName3',
              'columnName4',
              'columnName5',
              'columnName6',
              'columnName7',
              'columnName8',
              'columnName9',
              'columnName10',
              'columnName11',
              'columnName12',
              'columnName13',
              'columnName14',
              'columnName15',
              'columnName16',
              'columnName17',
              'columnName18',
              'columnName19',
              'columnName20',
              'columnName21',
              'columnName22',
              'columnName23',
              'columnName24',
              'columnName25',
              'columnName26'
            ]
            const data = this.formatJson(filterVal, result)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: `${this.listQuery.fillMonth}-${this.listQuery.department}-${this.listQuery.loginName}-区县月报记录`
            })
            this.downloadLoading = false
          })
        })
      }
    },
    formatJson(filterVal, data) {
      return data.map(v => filterVal.map(j => {
        if (j === 'fillTime') {
          return parseTime2(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
