<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="登陆账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.department" placeholder="部门名称" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in departments" :key="item.depName" :label="item.depName" :value="item.depName" />
      </el-select>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="calcWordcode(props.row.userAccesses)"
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
            <el-table-column label="工作任务及要求" align="center">
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
          </el-table>
        </template>
      </el-table-column>
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
      <el-table-column label="部门/区县权限" align="center">
        <template slot-scope="{row}">
          <span>{{ calcGridcode(row.enableFlage2) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
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
            ref="multipleTable"
            :data="temp.workcodes"
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
              property="task"
              label="工作任务及要求"
            />
            <el-table-column
              property="frequency"
              label="频次"
            />
            <el-table-column
              property="material"
              label="报送材料"
            />
            <el-table-column
              property="deadline"
              label="工作完成时限要求"
            />
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
import { chooseWork } from '../../../api/department'
import { departmentList, adminAuthority, getAllWorkCode, adminUpdateUserAccess, adminDeleteUserAccess } from '../../../api/admin'
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  components: {
    Pagination
  },
  data() {
    return {
      dialogDisable: true,
      dialogFormVisible: false,
      temp: {},
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        loginName: '',
        name: '',
        department: ''
      },
      departments: [],
      list: [],
      tableKey: 0,
      total: 0,
      listLoading: false,
      workcodes: [],
      currentRow: null,
      multipleSelection: null
    }
  },
  created() {
    departmentList().then(res => {
      if (res.errno === 0) {
        this.departments = res.data.deplist
      }
    })
    getAllWorkCode().then(res => {
      this.workcodes = res.data
    })
  },
  methods: {
    handleDelete(row) {
      console.log(row)
      adminDeleteUserAccess({ accessId: row.acessId }).then(res => {
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
    updateData() {
      adminUpdateUserAccess(this.temp).then(res => {
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
    handleSelectionChange(val) {
      this.temp.userAccesses = val.map(item => {
        return item.workId
      })
    },
    // 选择多行
    toggleSelection(rows) {
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleUpdate(row) {
      console.log(row)
      chooseWork({ gridCode: row.enableFlage2 }).then(res => {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.workcodes = res.data
        const result = []
        for (let i = 0; i < row.userAccesses.length; i++) {
          const index = this.temp.workcodes.findIndex(item => {
            return item.workId === row.userAccesses[i]
          })
          result.push(index)
        }
        console.log(result)
        this.$nextTick(() => {
          const rows = result.map(item => {
            return this.temp.workcodes[item]
          })
          this.toggleSelection(rows)
          this.$refs['dataForm'].clearValidate()
        })
        this.dialogFormVisible = true
      })
    },
    handleFilter() {
      this.listLoading = true
      adminAuthority(this.listQuery).then(res => {
        this.list = res.data.admins.list
        this.total = res.data.admins.total
        this.listLoading = false
      })
    },
    calcGridcode(code) {
      switch (code) {
        case 1:
          return '部门权限'
        case 2:
          return '区县权限'
        default:
          return '权限暂未定义'
      }
    },
    calcWordcode(code) {
      const result = []
      for (let i = 0; i < code.length; i++) {
        const index = this.workcodes.findIndex(item => {
          return item.workId === code[i]
        })
        result.push(index)
      }
      console.log(result)
      const rows = result.map(item => {
        return this.workcodes[item]
      })
      return rows
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
