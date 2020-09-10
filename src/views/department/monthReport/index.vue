<template>
  <div class="app-container">
    <div class="title">
      <span>{{ year }}-{{ month+1 }}月徐州联通廉洁风险防控工作进展月报（各部门）</span>
    </div>
    <div class="sub-title">
      <!--<span>执行推进阶段（5月至11月)</span>-->
      <p class="sub-content">
        （推进落实切实可行的防控举措，如增补、修订相关管理制度；提升和细化管理流程；管理制度执行的过程管控；不相容岗位的分离；关键敏感岗位的轮岗等；6月30日前完成廉控年中总结的上报，11月30日前完成廉控年度总结的上报）
      </p>
    </div>
    <el-form
      ref="form"
      label-width="200px"
      label-position="top"
      class="form"
    >
      <div v-for="(item, index) in resList" :key="index" v-if="item.isShow === 1" class="form-item">
        <el-form-item class="label-title" :label="labelCpu(item.rowName, index+1)">
          <el-input
            type="textarea"
            autosize
            :placeholder="item.originalContent"
            v-model="item.content"
            size="large"
          />
        </el-form-item>
      </div>
    </el-form>
    <el-backtop />
  </div>
</template>

<script>
import { monthReport } from '../../../api/department'
const date = new Date()
export default {
  name: 'Index',
  data() {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      resList: []
    }
  },
  computed: {
    workId() {
      return this.$route.params.workId
    }
  },
  created() {
    monthReport({ workCode: this.workId }).then(res => {
      this.resList = res.data.map(item => {
        item.content = undefined
        return item
      })
    })
  },
  methods: {
    labelCpu(label, index) {
      return index + '. ' + label
    }
  }
}
</script>

<style lang="stylus" scoped>
  .app-container
    .title
      text-align center
      font-size 30px
      line-height 46px
      margin-bottom 8px
      font-weight bold
      letter-spacing 1px
    .sub-title
      text-align center
      font-size 17px
      margin-bottom 3px
      line-height 30px
      .sub-content
        text-indent 2em
        text-align left
    .form
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content space-between
      padding 0 100px 0 100px
      .form-item
        width 500px
        .label-title
          & >>> .el-form-item__label
            font-size 18px
            font-weight bold
          & >>> .el-textarea__inner
            width 450px
            font-size 17px
</style>
