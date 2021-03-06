<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="登陆账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                <span>{{ row.fillTime?row.fillTime.substring(0, 10):'无填写记录' }}</span>
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
      <el-table-column label="风险点" align="center">
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
import { getRecordNoPage, getMyDepartmentPage, getRiskColumnName } from '../../api/admin'
import Pagination from '@/components/Pagination'
import { parseTime2 } from '../../utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      tableKey: 1,
      total: 0,
      departments: [],
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
  computed: {
    ...mapGetters([
      'vuexDepartment'
    ])
  },
  created() {
    getRiskColumnName().then(res => {
      if (res.errno === 0) {
        this.columns = res.data.map(item => {
          return item.itemName
        })
        this.columns.unshift('姓名')
        this.columns.unshift('部门')
        this.columns.unshift('账号')
      }
    })
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      getMyDepartmentPage(this.listQuery).then(res => {
        this.list = res.data.content
        this.total = this.list.length
        this.listLoading = false
      })
    },
    handleDownload() {
      console.log(this.listQuery)
      if (this.listQuery.fillMonth === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择月份'
        })
      } else {
        // this.downloadLoading = true
        this.listQuery.department = this.vuexDepartment
        getRecordNoPage(this.listQuery).then(res => {
          const result = res.data
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = this.columns
            const filterVal = [
              'loginName',
              'department',
              'name',
              'itemName1',
              'itemName2',
              'itemName3',
              'itemName4',
              'itemName5',
              'itemName6',
              'itemName7',
              'itemName8',
              'itemName9',
              'itemName10',
              'itemName11',
              'itemName12',
              'itemName13',
              'itemName14',
              'itemName15',
              'itemName16',
              'itemName17',
              'itemName18',
              'itemName19',
              'itemName20',
              'itemName21',
              'itemName22',
              'itemName23',
              'itemName24',
              'itemName25',
              'itemName26',
              'itemName27',
              'itemName28',
              'itemName29',
              'itemName30',
              'itemName31',
              'itemName32',
              'itemName33'
            ]
            const data = this.formatJson(filterVal, result)
            // console.log(result, data, tHeader)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: `${this.listQuery.fillMonth}-${this.listQuery.department}-${this.listQuery.loginName}-风险点填写记录`
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
    // handleFilter() {
    //   this.listLoading = true
    //   this.listQuery.department = this.vuexDepartment
    //   getRecord(this.listQuery).then(res => {
    //     this.list = res.data.content
    //     this.total = this.list.length
    //     this.listLoading = false
    //   })
    // }
    // handleDownload() {
    //   this.downloadLoading = true
    //   getMyDepartment(this.listQuery).then(res => {
    //     const tmp = res.data
    //     const result = []
    //     for (let j = 0; j < tmp.length; j++) {
    //       for (let i = 0; i < tmp[j].record.length; i++) {
    //         result.push({
    //           loginName: tmp[j].loginName,
    //           name: tmp[j].name,
    //           department: tmp[j].department,
    //           id: tmp[j].record[i].id,
    //           columnName: tmp[j].record[i].columnName,
    //           content: tmp[j].record[i].content,
    //           fillMonth: tmp[j].record[i].fillMonth,
    //           fillTime: tmp[j].record[i].fillTime
    //         })
    //       }
    //     }
    //     import('@/vendor/Export2Excel').then(excel => {
    //       const tHeader = ['id', '账号', '姓名', '部门', '列名称', '填写内容', '填写时间']
    //       const filterVal = ['id', 'loginName', 'name', 'department', 'columnName', 'content', 'fillTime']
    //       const data = this.formatJson(filterVal, result)
    //       console.log(data, result)
    //       excel.export_json_to_excel({
    //         header: tHeader,
    //         data,
    //         filename: `${this.listQuery.fillMonth ? this.listQuery.fillMonth : ''}-${this.listQuery.department ? this.listQuery.department : ''}-${this.listQuery.loginName ? this.listQuery.loginName : ''}-月报填写记录`
    //       })
    //       this.downloadLoading = false
    //     })
    //   })
    // },
    // formatJson(filterVal, data) {
    //   return data.map(v => filterVal.map(j => {
    //     if (j === 'fillTime') {
    //       return parseTime2(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // },

  }
}
</script>

<style scoped>

</style>
