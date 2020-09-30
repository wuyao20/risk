<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="登陆账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.department" placeholder="部门名称" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in departments" :key="item.depName" :label="item.depName" :value="item.depName" />
      </el-select>
      <div class="filter-item" style="margin-left: 5px;margin-right: 5px;">
        <el-radio-group v-model="listQuery.enableFlage2" size="medium">
          <el-radio-button :label="department" border>部门三级管理员</el-radio-button>
          <el-radio-button :label="secondaryAdmin" border>二级管理员</el-radio-button>
        </el-radio-group>
      </div>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
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
      <el-table-column label="登陆账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="{row}">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="{row}">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司" align="center">
        <template slot-scope="{row}">
          <span>{{ row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属部门/区县" align="center">
        <template slot-scope="{row}">
          <span>{{ calcRoles(row.enableFlage2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" modal width="80%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 80%; margin-left:50px;">
        <el-form-item label="登陆账号">
          <el-input v-model="temp.loginName" :disabled="dialogDisable" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" :disabled="dialogDisable" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" :disabled="dialogDisable" />
        </el-form-item>
        <el-form-item label="权限">
          <el-table
            ref="singleTable"
            :data="temp.columns"
            highlight-current-row
            fit
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="50"
            />
            <el-table-column
              property="columnName"
              label="列名称"
            />
            <el-table-column label="初始内容">
              <template slot-scope="{row}">
                <el-input v-model="row.originalContent" placeholder="请输入初始值" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { departmentList, userPage, updateDepAuthority, deleteUser, addUser, queryColumn } from '../../../api/admin'
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      dialogDisable: true,
      department: 1,
      district: 2,
      admin: 3,
      secondaryAdmin: 4,
      tableKey: 0,
      listLoading: false,
      list: [],
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        loginName: '',
        name: '',
        department: '',
        enableFlage2: 1
      },
      total: 0,
      departments: [],
      dialogFormVisible: false,
      dialogAddFormVisible: false,
      temp: {},
      columns: [],
      resList: []
    }
  },
  computed: {
  },
  created() {
    departmentList().then(res => {
      if (res.errno === 0) {
        this.departments = res.data.deplist
      }
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.temp.content = val
    },
    calcRoles(role) {
      switch (role) {
        case 1:
          return '部门三级管理员'
        case 2:
          return '区县三级管理员'
        case 3:
          return '系统管理员'
        case 4:
          return '二级管理员'
        default:
          return '权限错误'
      }
    },
    handleFilter() {
      this.listLoading = true
      userPage(this.listQuery).then(res => {
        this.list = res.data.users.list
        this.total = res.data.users.total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      queryColumn({ gridCode: 1 }).then(res => {
        this.temp = Object.assign({}, row) // copy obj
        const { data } = res
        this.temp.columns = data.map(item => {
          item.show = item.isShow === 1
          return item
        })
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      console.log(this.temp)
      updateDepAuthority(this.temp).then(res => {
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
        this.dialogFormVisible = false
        this.handleFilter()
      })
    },
    createData() {
      addUser(this.temp).then(res => {
        const { errno, data } = res
        if (errno === 0) {
          this.$notify.success({
            title: '成功',
            message: data
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '添加失败，请重试'
          })
        }
        this.dialogAddFormVisible = false
        this.handleFilter()
      })
    },
    resetTemp() {
      this.temp = {}
    },
    handleCreate() {
      this.resetTemp()
      this.dialogAddFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      deleteUser({ userId: row.userId }).then(res => {
        const { errno, data } = res
        if (errno === 0) {
          this.$notify.success({
            title: '成功',
            message: data
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '失败，请重试'
          })
        }
        this.handleFilter()
      })
    }
  }
}
</script>

<style scoped>

</style>
