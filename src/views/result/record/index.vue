<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="登陆账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.department" placeholder="部门名称" clearable style="width: 200px" class="filter-item">
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
      <el-button class="filter-item" :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">
        下载
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleAllDownload">
        下载附件
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
                <span>{{ row.itemName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="填写内容" align="center">
              <template slot-scope="{row}">
                <span>{{ row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column label="填写时间" align="center" width="120">
              <template slot-scope="{row}">
                <span>{{ row.fillTime | parseTime2() }}</span>
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
import { departmentList, getRecord, getRecordNoPage, getRiskColumnName } from '../../../api/admin'
import { parseTime2 } from '../../../utils'
import Pagination from '@/components/Pagination'
import axios from 'axios'
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
  created() {
    departmentList().then(res => {
      if (res.errno === 0) {
        this.departments = res.data.deplist
      }
    })
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
    handleDownload() {
      if (this.listQuery.fillMonth === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择月份'
        })
      } else {
        // this.downloadLoading = true
        getRecordNoPage(this.listQuery).then(res => {
          const result = res.data
          console.log(this.columns)
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
    },
    handleAllDownload() {
      if (this.listQuery.fillMonth === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择月份'
        })
      } else {
        axios.post('http://139.224.135.165:8080/risk/resshow/downlownd', this.listQuery, { responseType: 'blob' })
          .then((res) => {
            const { data, headers } = res
            // const fileName = headers['content-disposition'].replace(/\w+;.+filename=(.*)/, '$1')
            // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
            // const blob = new Blob([JSON.stringify(data)], ...)
            const blob = new Blob([data], { type: headers['content-type'] })
            const dom = document.createElement('a')
            const url = window.URL.createObjectURL(blob)
            dom.href = url
            dom.download = decodeURI(`${this.listQuery.fillMonth}-${this.listQuery.department}-${this.listQuery.loginName}-风险点附件汇总.zip`)
            dom.style.display = 'none'
            document.body.appendChild(dom)
            dom.click()
            dom.parentNode.removeChild(dom)
            window.URL.revokeObjectURL(url)
          })
      }
    },
    handleFilter() {
      this.listLoading = true
      getRecord(this.listQuery).then(res => {
        this.list = res.data.content
        this.total = this.list.length
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
