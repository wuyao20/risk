<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="登陆账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <div class="filter-item" style="margin-left: 5px;margin-right: 5px;">
        <el-radio-group v-model="listQuery.enableFlage2" size="medium">
          <el-radio-button :label="department" border>部门三级管理员</el-radio-button>
          <el-radio-button :label="district" border>区县三级管理员</el-radio-button>
          <el-radio-button :label="secondaryAdmin" border>二级管理员</el-radio-button>
        </el-radio-group>
      </div> -->
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
      <el-table-column label="风险点" align="center">
        <template slot-scope="{row}">
          <span>{{ row.riskNames.toString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="success" size="mini" @click="handleSign(row)">
            登陆
          </el-button>
          <el-button type="warning" size="mini" @click="handleRisk(row)">
            权限
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog title="添加用户" :visible.sync="dialogAddFormVisible" modal width="60%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 70%; margin-left:50px;">
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
          <el-input v-model="temp.department" :disabled="disableInput" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" modal width="60%">
      <el-form ref="dataEditForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 70%; margin-left:50px;">
        <el-form-item label="登陆账号">
          <el-input v-model="temp.loginName" :disabled="disableInput" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" :disabled="disableInput" />
        </el-form-item>
        <!-- <el-form-item label="公司" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="归属部门/区县" prop="enableFlage2">
          <el-radio-group v-model="temp.enableFlage2" size="medium">
            <el-radio-button :label="department" border>部门三级管理员</el-radio-button>
            <el-radio-button :label="district" border>区县三级管理员</el-radio-button>
            <el-radio-button :label="secondaryAdmin" border>二级管理员</el-radio-button>
          </el-radio-group>
        </el-form-item> -->
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

    <el-dialog title="风险点赋权" :visible.sync="dialogRiskVisible" modal width="90%">
      <el-table
        ref="riskMultipleTable"
        :data="risks"
        tooltip-effect="dark"
        style="width: 100%"
        fit
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="责任（牵头）部门"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.line1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="责任人"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.line2 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="业务事项描述"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.line3 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="廉洁风险点"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.line4 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="徐州分公司细化的防控措施"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.line5 }}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRiskVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateRisk">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { secUpdateRisks, secAdminGetUserPage, updateUser, deleteUser, addUser, getUserPassword, getAllRisks } from '../../api/admin'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      temArr: [],
      risksTmp: {},
      dialogRiskVisible: false,
      risks: [],
      dialogFormVisible: false,
      disableInput: true,
      temp: {
        loginName: '',
        name: '',
        department: '',
        password: ''
      },
      dialogAddFormVisible: false,
      department: 6,
      district: 2,
      admin: 3,
      secondaryAdmin: 4,
      tableKey: 1,
      departments: [],
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        loginName: '',
        name: '',
        department: '',
        enableFlage2: 6
      },
      total: 0,
      list: [],
      listLoading: false,
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
  computed: {
    ...mapGetters([
      'vuexDepartment'
    ])
  },
  created() {
    getAllRisks({ department: this.vuexDepartment }).then(res => {
      this.risks = res.data
    })
  },
  methods: {
    handleRisk(row) {
      this.temArr = []
      const roles = row.riskNames
      this.temArr = this.risks.map(risk => {
        if (roles.indexOf(risk.riskName) !== -1) {
          return risk
        }
      }).filter(item => item !== undefined)
      this.risksTmp = row
      this.risksTmp.selected = this.temArr
      this.dialogRiskVisible = true
      const that = this
      setTimeout(() => {
        if (that.temArr) {
          that.temArr.forEach(row => {
            that.$refs['riskMultipleTable'].toggleRowSelection(row)
          })
        } else {
          that.$refs['riskMultipleTable'].clearSelection()
        }
      }, 300)
    },
    handleSelectionChange(val) {
      this.risksTmp.selected = val
    },
    updateRisk() {
      this.risksTmp.riskNames = this.risksTmp.selected.map(item => {
        return item.riskName
      })
      secUpdateRisks(this.risksTmp).then(res => {
        const { errno, data } = res
        if (errno === 0) {
          this.$notify.success({
            title: '成功',
            message: data
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: '赋权失败，请刷新重试'
          })
        }
        this.dialogRiskVisible = false
      })
    },
    async handleSign(row) {
      await this.$store.dispatch('user/logout')
      getUserPassword({ loginName: row.loginName }).then(res => {
        const password = res.data.password
        this.$router.push({ path: `/login?username=${row.loginName}&password=${password}` })
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
      this.listQuery.department = this.vuexDepartment
      secAdminGetUserPage(this.listQuery).then(res => {
        this.list = res.data.content
        this.total = res.data.recordTotal
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = { department: this.vuexDepartment }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogAddFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataEditForm'].clearValidate()
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
      this.temp.riskNames = []
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
    handleDelete(row) {
      deleteUser({ loginName: row.loginName }).then(res => {
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

<style lang="scss" scoped>

</style>
