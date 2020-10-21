<template>
  <div class="app-container">
    <div class="title">
      <span>徐州联通廉洁风险防控工作检查、考核统计表</span>
    </div>
    <el-form
      ref="form"
      label-width="200px"
      label-position="top"
    >
      <!--无法显示索引 应为有隐藏的条目-->
      <div v-for="(item, index) in resList" :key="item.columnId" class="form-item">
        <el-form-item v-if="item.isShow===1" class="label-title" :label="labelCpu(index + 1, item.columnName)">
          <el-input
            v-if="index !== resList.length-1"
            v-model="item.content"
            type="textarea"
            :rows="3"
            size="large"
            :disabled="item.originalContent!=''"
          />
          <el-upload
            v-if="index === resList.length-1"
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
      <el-divider />
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-backtop />
  </div>
</template>

<script>
import { getStatisticsItems, fillrecord } from '../../../api/department'
import { mapGetters } from 'vuex'
const date = new Date()
export default {
  name: 'Index',
  data() {
    return {
      resList: [],
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
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
    getStatisticsItems({ riskName: this.$route.params.riskname }).then(res => {
      this.resList = res.data.map(item => {
        item.content = item.originalContent
        return item
      })
    })
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    labelCpu(index, label) {
      return index + '、 ' + label
    },
    onSubmit() {
      const temArr = this.resList.map(item => {
        return {
          columnId: item.columnId,
          columnName: item.columnName,
          content: item.content,
          isShow: item.isShow
        }
      })
      if (this.fileList[0]) {
        temArr[temArr.length - 1].content = this.fileList[0].url
      }
      const uploadData = {
        // loginName: this.resList[0].loginName,
        // gridCode: this.resList[0].gridCode,
        // workCode: this.resList[0].workCode,
        riskName: this.$route.params.riskname,
        fillMonth: this.fullDate,
        fillDetailList: temArr
      }
      const loading = this._openFullScreen2()
      // document.scrollingElement.scrollTop = 50%
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      fillrecord(uploadData).then(res => {
        loading.close()
        if (res.errno === 0) {
          this.$notify.success({
            title: '成功',
            message: '填报成功'
          })
          this.$router.go(-1)
        } else {
          this.$notify.error({
            title: '失败',
            message: '填报失败，请刷新重试。'
          })
        }
      })
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
        & >>> .el-textarea__inner
          font-size 17px
        .upload-demo
          width 400px
</style>
