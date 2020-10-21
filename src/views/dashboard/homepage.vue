<template>
  <div class="dashboard-container">
    <div class="dashboard-title">
      <span>徐州纪检风险点系统</span>
    </div>
    <div class="content">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div class="text item">
          姓名：{{ name }}
        </div>
        <div class="text item">
          userId：{{ userId }}
        </div>
        <div class="text item">
          权限： {{ authority }}
        </div>
        <div class="text item">
          部门：{{ vuexDepartment }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Homepage',
  computed: {
    ...mapGetters([
      'roles',
      'name',
      'userId',
      'vuexDepartment'
    ]),
    authority() {
      let result = ''
      switch (this.roles[0]) {
        case 1:
          result = '部门三级管理员'
          break
        case 2:
          result = '区县三级管理员'
          break
        case 3:
          result = '主管理员'
          break
        case 4:
          result = '部门二级管理员'
          break
        case 5:
          result = '区县二级管理员'
          break
        case 6:
          result = '部门三级管理员'
          break
        default:
          result = ''
      }
      return result
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
      .content
        margin 20px 20% auto 20%
        .box-card
          font-size 20px
          line-height 26px
          font-weight normal
          .item
            font-size 18px
            margin-bottom 5px
</style>
