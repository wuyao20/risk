<template>
  <div class="dashboard-container">
    <div class="dashboard-title">
      <span>各责任部门廉控工作需求明细</span>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
      class="table"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="序号" width="80px" align="center">
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作任务及要求" width="600px" align="center">
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
          <span>{{ row.data }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作完成时限要求" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dateline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            upload
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [
        {
          task: '各风险点的廉洁风险防控工作检查、考核工作。',
          frequency: '根据年度检查计划',
          data: '统计表、检查和考核的相关原始材料',
          dateline: '相关工作完成的当月'
        },
        {
          task: '定期向廉控办\\派驻纪检组报送廉洁风险防控月报，按计划推进防控工作。',
          frequency: '每月',
          data: '月报表',
          dateline: '每月26日前'
        },
        {
          task: '结合省分各责任部门下发的廉洁风险防控工作方案细化，制定并完善市分责任部门廉洁风险防控实施工作方案，经分管领导审批后，报送派驻纪检组。',
          frequency: '每年一次',
          data: '下发的文件、分管领导审批截图',
          dateline: '4月底；今年是8月15日前'
        },
        {
          task: '根据梳理的风险点及防控措施，及时做好内部宣贯及培训工作。',
          frequency: '每年至少一次',
          data: '学习的钉钉等方式的截图或会议纪要、会议签到、会场照片等',
          dateline: '根据廉控办\\派驻纪检组要求'
        },
        {
          task: '组织责任岗位人员签署廉洁风险防控承诺书。',
          frequency: '每年全覆盖一次；有岗位变动后，实时提供。',
          data: '承诺书签署的原件',
          dateline: '相关工作完成的当月'
        },
        {
          task: '按照本专业廉洁风险防控措施完成相关制度的制订和修订、流程优化、不相容岗位分离、关键敏感岗位轮岗等防控措施的建立和健全。',
          frequency: '实时',
          data: '1、制度文件（红头）及对应统计表；\n' +
              '2、word版本流程及统计表；\n' +
              '3、不相容岗位分离及关键敏感岗位轮岗情况的相关材料。',
          dateline: '相关工作完成的当月'
        },
        {
          task: '定期组织部门内部的自我检查和考核工作，及时查找问题并落实责任，组织整改和完善。',
          frequency: '每年两次',
          data: '检查报告、统计表及围绕每个风险点的原始材料',
          dateline: '根据廉控办\\派驻纪检组要求'
        },
        {
          task: '组织开展向下专业条线廉洁风险防控情况的专项检查以及考核评价工作，形成报告报廉控办\\派驻纪检组。',
          frequency: '每年两次（部分部门不涉及）',
          data: '检查报告、统计表及围绕每个风险点的原始材料',
          dateline: '根据廉控办\\派驻纪检组要求'
        },
        {
          task: '适时根据敏感岗位和工作中发现的风险点对廉洁风险防控点进行优化完善.',
          frequency: '实时',
          data: 'excel版本措施简表',
          dateline: '相关工作完成的当月'
        },
        {
          task: '定期向廉控办\\派驻纪检组报送廉洁风险半年总结报告和全年报告。',
          frequency: '每半年一次',
          data: 'word版本报告',
          dateline: '6月25日、11月25日'
        },
        {
          task: '定期向公司分管领导汇报本专业廉洁风险防控工作开展情况。',
          frequency: '每季度',
          data: '会议纪要、会议签到、会场照片、汇报报告',
          dateline: '每季度'
        },
        {
          task: '定期向公司党委汇报本专业廉洁风险防控工作推进成效。',
          frequency: '每半年',
          data: '由党群工作部牵头召开，提供会议纪要、会议签到、会场照片；汇报报告',
          dateline: '6月底、12月底'
        },
        {
          task: '其他工作',
          frequency: '实时',
          data: '',
          dateline: '根据廉控办\\派驻纪检组要求'
        }
      ]
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex <= 1) {
        return 'success-row'
      }
      return ''
    },
    handleUpdate() {
      this.$router.push({
        path: '/salteFish/fish'
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
    .table
      &.warning-row
        background: oldlace
      &.success-row
        background: #f0f9eb
</style>
