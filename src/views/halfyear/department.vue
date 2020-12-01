<template>
  <div class="app-container">
    <div class="title">
      <span> 徐州联通廉洁风险防控工作检查情况统计表（各责任部门）</span>
    </div>
    <el-form
      ref="form"
      label-width="200px"
      label-position="top"
      class="form"
    >
      <div v-for="(item, index) in list" :key="index" class="form-item">
        <el-form-item class="label-title" :label="labelCpu(item.spotName, index+1)">
          <el-input
            v-if="index !== list.length-1"
            v-model="item.content"
            type="textarea"
            :rows="2"
            autosize
            :placeholder="item.originalContent"
            size="large"
          />
          <el-upload
            v-if="index === list.length-1"
            class="upload-demo"
            action="http://139.224.135.165:8080/risk/examine/updocument"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :on-error="handleError"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只允许上传一个文件，若有多个文件，请打包成压缩包进行上传。</div>
          </el-upload>
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
import { mapGetters } from 'vuex'
import { halfyear, departmentUploadHalfyear } from '../../api/admin'
const date = new Date()
export default {
  name: 'Department',
  data() {
    return {
      list: [],
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'name'
    ]),
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
    halfyear({ gridCode: this.roles[0] }).then(res => {
      this.list = res.data.map(item => {
        item.content = ''
        return item
      })
    })
    console.log(this.list)
  },
  methods: {
    labelCpu(label, index) {
      return index + '. ' + label
    },
    onSubmit() {
      console.log(this.list)
      const temArr = this.list.map(item => {
        return {
          spotId: item.id,
          spotName: item.spotName,
          content: item.content
        }
      })
      if (this.fileList[0]) {
        temArr[temArr.length - 1].content = this.fileList[0].url
      }
      const uploadData = {
        loginName: this.name,
        gridCode: this.roles[0],
        fillMonth: this.fullDate,
        checkDetailList: temArr
      }
      const loading = this._openFullScreen2()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      console.log(uploadData)
      departmentUploadHalfyear(uploadData).then(res => {
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
    },
    handleError() {
      this.$notify.error({
        title: '失败',
        message: '上传文件失败，请重试。'
      })
    },
    handleSuccess(res, file) {
      this.fileList.push(res.data)
    },
    handleExceed(files, fileList) {
      this.$message.error(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemove(file, fileList) {
      console.log(fileList)
      const index = this.fileList.findIndex(item => {
        return item.uid === file.uid
      })
      this.fileList.splice(index, 1)
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
      .form-item
        .label-title
          & >>> .el-form-item__label
            font-size 18px
            font-weight bold
          & >>> .el-textarea__inner
            font-size 17px
          .upload-demo
            width 400px
      .button-container
        margin-top 10px
        padding 0 100px 0 100px
</style>
