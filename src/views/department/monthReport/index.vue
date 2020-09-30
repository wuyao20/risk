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
      <div v-for="(item, index) in resList" v-if="item.isShow === 1" :key="index" class="form-item">
        <el-form-item class="label-title" :label="labelCpu(item.rowName, index+1)">
          <el-input
            v-model="item.content"
            type="textarea"
            autosize
            :placeholder="item.originalContent"
            size="large"
          />
        </el-form-item>
      </div>
    </el-form>
    <div class="button-container">
      <el-divider />
      <el-button type="primary" @click="onSubmit">立即提交</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
    <el-backtop />
  </div>
</template>

<script>
import { monthReport, monthReportUpload } from '../../../api/department'
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
    },
    fullDate() {
      let month = date.getMonth() + 1
      if (month.toString().length < 2) {
        month = '0' + month
      }
      let day = date.getDate()
      if (day.toString().length < 2) {
        day = '0' + day
      }
      return `${date.getFullYear()}${month}${day}`
    }
  },
  created() {
    monthReport({ workCode: this.workId }).then(res => {
      this.resList = res.data.map(item => {
        item.content = item.originalContent
        return item
      })
    })
  },
  methods: {
    labelCpu(label, index) {
      return index + '. ' + label
    },
    onSubmit() {
      console.log(this.resList)
      const temArr = this.resList.map(item => {
        return {
          columnId: item.rowId,
          columnName: item.rowName,
          content: item.content,
          isShow: item.isShow
        }
      })
      const uploadData = {
        loginName: this.resList[0].loginName,
        gridCode: this.resList[0].gridCode,
        workCode: this.resList[0].workCode,
        fillMonth: this.fullDate,
        fillDetailList: temArr
      }
      const loading = this._openFullScreen2()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      console.log(uploadData)
      monthReportUpload(uploadData).then(res => {
        if (res.errno === 0) {
          loading.close()
          this.$notify.success({
            title: '成功',
            message: '填写成功'
          })
          this.$router.go(-1)
        } else {
          this.$notify.error({
            title: '失败',
            message: '填写失败，请刷新重试。'
          })
        }
      })
    },
    onCancel() {
      this.$router.go(-1)
    },
    _openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return loading
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
            width 500px
            font-size 17px
    .button-container
      margin-top 10px
      padding 0 100px 0 100px
</style>
