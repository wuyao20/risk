<template>
  <div class="app-container">
    <div class="title">
      <span>{{year}}-{{month+1}}月徐州联通廉洁风险防控工作进展月报（各部门）</span>
    </div>
  </div>
</template>

<script>
const date = new Date()
export default {
  name: 'Index',
  data() {
    return {
      year: date.getFullYear(),
      month: date.getMonth()
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
</style>
