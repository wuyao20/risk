<template>
  <div class="app-container">
    <div class="title">
      <span>徐州联通廉洁风险防控工作检查、考核统计表</span>
    </div>
    <el-form ref="form" label-width="200px" label-position="top">
      <!--无法显示索引 应为有隐藏的条目-->
      <div v-for="item in resList" :key="item.columnId" class="form-item">
        <el-form-item v-if="item.isShow===1" class="label-title" :label="item.columnName">
          <el-input
            v-model="item.content"
            type="textarea"
            :rows="3"
            size="large"
            :disabled="item.originalContent!=''"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getStatisticsItems } from '../../../api/department'

const date = new Date()

export default {
  name: 'Index',
  data() {
    return {
      result: '',
      year: date.getFullYear(),
      month: date.getMonth(),
      resList: []
    }
  },
  created() {
    getStatisticsItems({ workCode: this.$route.params.workId }).then(res => {
      this.resList = res.data.map(item => {
        item.content = item.originalContent
        return item
      })
    })
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .app-container
    .title
      display flex
      flex-direction row
      justify-content center
      align-content baseline
      font-size 30px
      line-height 46px
      margin-bottom 8px
      font-weight bold
    .form-item
      .label-title
        & >>> .el-form-item__label
          font-size 18px
          font-weight bold
</style>
