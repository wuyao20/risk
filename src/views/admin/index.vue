<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="登陆账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.department" placeholder="部门名称" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in departments" :key="item.depName" :label="item.depName" :value="item.depName" />
      </el-select>
      <div class="filter-item" style="margin-left: 5px;margin-right: 5px;">
        <el-radio v-model="listQuery.enableFlage2" :label="department" border>部门</el-radio>
        <el-radio v-model="listQuery.enableFlage2" :label="district" border>区县</el-radio>
      </div>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
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
          <span>{{ row.enableFlage2===1 ?'部门':'区县' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="action" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" modal width="50%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 60%; margin-left:50px;">
        <el-form-item label="登陆账号">
          <el-input v-model="temp.loginName" disabled="true" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="归属部门/区县" prop="enableFlage2">
          <el-radio v-model="temp.enableFlage2" :label="department" border>部门</el-radio>
          <el-radio v-model="temp.enableFlage2" :label="district" border>区县</el-radio>
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

    <el-dialog title="添加用户" :visible.sync="dialogAddFormVisible" modal width="50%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 60%; margin-left:50px;">
        <el-form-item label="账号" prop="loginName">
          <el-input v-model="temp.loginName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="归属部门/区县" prop="enableFlage2">
          <el-radio v-model="temp.enableFlage2" :label="department" border>部门</el-radio>
          <el-radio v-model="temp.enableFlage2" :label="district" border>区县</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { departmentList, userPage, updateUser, deleteUser, addUser } from '../../api/admin'
import Pagination from '@/components/Pagination'

export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      department: 1,
      district: 2,
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
      rules: {
        loginName: [{ required: true, message: 'loginName is required', trigger: 'change' }],
        name: [{ required: true, message: 'name is required', trigger: 'change' }],
        password: [{ required: true, message: 'password is required', trigger: 'change' }],
        company: [{ required: true, message: 'company is required', trigger: 'change' }],
        department: [{ required: true, message: 'department is required', trigger: 'change' }],
        enableFlage2: [{ required: true, message: 'enableFlage2 is required', trigger: 'change' }]
      }
    }
  },
  created() {
    departmentList().then(res => {
      if (res.errno === 0) {
        this.departments = res.data.deplist
      }
    })
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      userPage(this.listQuery).then(res => {
        this.list = res.data.users.list
        this.total = res.data.users.total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      updateUser(this.temp).then(res => {
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
