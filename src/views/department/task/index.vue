<template>
  <div class="app-container">
    <div class="title">
      <span>徐州联通廉洁风险防控工作检查、考核统计表</span>
    </div>
    <el-form ref="form" label-width="200px" label-position="top">
      <!--无法显示索引 应为有隐藏的条目-->
      <div v-for="item in list" :key="item.columnId" class="form-item">
        <el-form-item v-if="item.isShow===1" class="label-title" :label="item.columnName">
          <el-input
            v-model="item.content"
            type="textarea"
            :rows="3"
            size="large"
            :disabled="item.originalContent!=''"
            @change="handlerChange"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
const date = new Date()

export default {
  name: 'Index',
  data() {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      list: [
        {
          'id': 1,
          'loginName': 'WLB001',
          'columnId': 1,
          'columnName': '责任（牵头）部门',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '网络部（原运行维护部）'
        },
        {
          'id': 2,
          'loginName': 'WLB001',
          'columnId': 2,
          'columnName': '部门责任领导',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '李启龙'
        },
        {
          'id': 3,
          'loginName': 'WLB001',
          'columnId': 3,
          'columnName': '责任人',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '李启龙、邵明钰'
        },
        {
          'id': 4,
          'loginName': 'WLB001',
          'columnId': 4,
          'columnName': '岗位名称',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '维保主管'
        },
        {
          'id': 5,
          'loginName': 'WLB001',
          'columnId': 5,
          'columnName': '业务事项描述',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '代维、维保费用结算'
        },
        {
          'id': 6,
          'loginName': 'WLB001',
          'columnId': 6,
          'columnName': '环节',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '考核规则执行'
        },
        {
          'id': 7,
          'loginName': 'WLB001',
          'columnId': 7,
          'columnName': '廉洁风险点',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '维保管理：维护管理人员与维保单位勾结或者检查监督不到位，不按照考核规则进行考核，导致多支付维保费'
        },
        {
          'id': 8,
          'loginName': 'WLB001',
          'columnId': 8,
          'columnName': '总部防控指引',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '完善代维管理考核制度和相关审批要求。考核过程及结果进行公开和公示，接受群众监督。'
        },
        {
          'id': 9,
          'loginName': 'WLB001',
          'columnId': 9,
          'columnName': '省公司细化的防控措施（防控措施应包含完善制度体系、规范权力运行、推进民主公开、加强监督管理、实行责任追究等举措，对权力运行进行制度约束、过程监控和事后问责）',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '① 从设备故障、服务响应、网络质量等方面综合考核设备服务能力和产品性能，合理客观评价设备厂商维保水平。②地市维保管理人员将考核结果提交审批时，须同时提交障碍处理、用户投诉等记录作为考核支撑依据，省分各专业负责人审批，并依据审批结果进行打分。相关考核依据材料做为备查。'
        },
        {
          'id': 10,
          'loginName': 'WLB001',
          'columnId': 10,
          'columnName': '徐州分公司细化的防控措施（防控措施应包含完善制度体系、规范权力运行、推进民主公开、加强监督管理、实行责任追究等举措，对权力运行进行制度约束、过程监控和事后问责）',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '① 从设备故障、服务响应、网络质量等方面综合考核设备服务能力和产品性能，合理客观评价设备厂商维保水平。②地市维保管理人员将考核结果提交审批时，须同时提交障碍处理、用户投诉等记录作为考核支撑依据，省分各专业负责人审批，并依据审批结果进行打分。相关考核依据材料做为备查。'
        },
        {
          'id': 11,
          'loginName': 'WLB001',
          'columnId': 11,
          'columnName': '风险级别（各单位对每个岗位所涉及的风险，根据风险发生的概率、对公司权益可能造成的损害程度、风险当前的管控措施等综合评价选择风险等级。风险等级分为高、中、低三个级别。）',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '中'
        },
        {
          'id': 12,
          'loginName': 'WLB001',
          'columnId': 12,
          'columnName': '适用范围（主要明确防控措施适用的范围，包括市（县）分公司）',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '市分公司'
        },
        {
          'id': 13,
          'loginName': 'WLB001',
          'columnId': 13,
          'columnName': '宣贯工作安排',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '一季度完成宣贯工作'
        },
        {
          'id': 14,
          'loginName': 'WLB001',
          'columnId': 14,
          'columnName': '执行工作安排（推进落实切实可行的防控举措，如增补、修订相关管理制度；提升和细化管理流程；管理制度执行的过程管控；不相容岗位的分离；关键敏感岗位的轮岗等）',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '每月进行设备后评价工作，维保服务合同执行完成后，对全年进行服务质量考核，'
        },
        {
          'id': 15,
          'loginName': 'WLB001',
          'columnId': 15,
          'columnName': '检查工作安排',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '1、省分运维部牵头全省网运线风险防控工作的开展和检查监督。在省分网运线各生产中心落实责任领导和责任人的基础上，各市分公司也要将廉洁风险防控工作落实到人。2、建立廉洁风险防控工作常态化管理机制。省分网运线各生产中心和各市分公司要将廉洁风险防控工作列入运维日常工作中，检查工单调度与调度稽核岗位分离、数据配置与数据稽核岗位分离制度是否落实。检查代维和维保、网络资源出租、机房（基站）租赁、网络改造和零星维修、网络迁改工程赔补、网络资产流失等廉洁风险防控工作是否落实到位，每月将自查情况按附件4格式向省分运维部汇报。3、省分运维部牵头开展每月的廉洁风险防控工作检查。检查结果列入全省网运线月度考核体系中，检查考核办法见《江苏联通网运线廉洁风险防控检查考核细则》（附件3）。省分运维部每季度将廉洁风险防控工作进展情况向分管领导报告，对于检查中发现的违规、违纪、违法行为及时进行纠正，并移送纪检部门处理。4、四季度，省分运维部组织廉洁风险防控工作专项检查，对各市分公司执行情况进行评估和考核。对一年来廉洁风险防控工作进行总结，总结经验，找出不足，改进廉洁风险防控工作方案，不断提高廉洁风险防控工作的质量。'
        },
        {
          'id': 16,
          'loginName': 'WLB001',
          'columnId': 16,
          'columnName': '考核工作安排',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '1、省分运维部牵头全省网运线风险防控工作的开展和检查监督。在省分网运线各生产中心落实责任领导和责任人的基础上，各市分公司也要将廉洁风险防控工作落实到人。2、建立廉洁风险防控工作常态化管理机制。省分网运线各生产中心和各市分公司要将廉洁风险防控工作列入运维日常工作中，检查工单调度与调度稽核岗位分离、数据配置与数据稽核岗位分离制度是否落实。检查代维和维保、网络资源出租、机房（基站）租赁、网络改造和零星维修、网络迁改工程赔补、网络资产流失等廉洁风险防控工作是否落实到位，每月将自查情况按附件4格式向省分运维部汇报。3、省分运维部牵头开展每月的廉洁风险防控工作检查。检查结果列入全省网运线月度考核体系中，检查考核办法见《江苏联通网运线廉洁风险防控检查考核细则》（附件3）。省分运维部每季度将廉洁风险防控工作进展情况向分管领导报告，对于检查中发现的违规、违纪、违法行为及时进行纠正，并移送纪检部门处理。4、四季度，省分运维部组织廉洁风险防控工作专项检查，对各市分公司执行情况进行评估和考核。对一年来廉洁风险防控工作进行总结，总结经验，找出不足，改进廉洁风险防控工作方案，不断提高廉洁风险防控工作的质量。'
        },
        {
          'id': 17,
          'loginName': 'WLB001',
          'columnId': 17,
          'columnName': '涉及县分公司的宣贯、检查、考核等工作说明',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '不涉及县分，由市分统一管理'
        },
        {
          'id': 18,
          'loginName': 'WLB001',
          'columnId': 18,
          'columnName': '是否是省分风险点规定动作',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '是'
        },
        {
          'id': 19,
          'loginName': 'WLB001',
          'columnId': 19,
          'columnName': '总序号',
          'isShow': 0,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '1'
        },
        {
          'id': 20,
          'loginName': 'WLB001',
          'columnId': 20,
          'columnName': '管控制度文号',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '运行维护〔2018〕26号'
        },
        {
          'id': 21,
          'loginName': 'WLB001',
          'columnId': 21,
          'columnName': '管控制度名称',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '中国联通江苏省分公司代维管理办法'
        },
        {
          'id': 22,
          'loginName': 'WLB001',
          'columnId': 22,
          'columnName': '管控流程名称',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': '维保单位考核流程'
        },
        {
          'id': 23,
          'loginName': 'WLB001',
          'columnId': 23,
          'columnName': '年度检查计划',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        },
        {
          'id': 24,
          'loginName': 'WLB001',
          'columnId': 24,
          'columnName': '本月检查对象及检查内容',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        },
        {
          'id': 25,
          'loginName': 'WLB001',
          'columnId': 25,
          'columnName': '检查中发现的问题（个）',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        },
        {
          'id': 26,
          'loginName': 'WLB001',
          'columnId': 26,
          'columnName': '检查中发现的问题描述',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        },
        {
          'id': 27,
          'loginName': 'WLB001',
          'columnId': 27,
          'columnName': '整改措施',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        },
        {
          'id': 28,
          'loginName': 'WLB001',
          'columnId': 28,
          'columnName': '考核次数（个）',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        },
        {
          'id': 29,
          'loginName': 'WLB001',
          'columnId': 29,
          'columnName': '考核说明',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        },
        {
          'id': 30,
          'loginName': 'WLB001',
          'columnId': 30,
          'columnName': '本月检查和考核工作对应的相关材料',
          'isShow': 1,
          'workCode': 1,
          'gridCode': 1,
          'originalContent': ''
        }
      ]
    }
  },
  created() {
    this._initData()
    console.log(this.list)
  },
  methods: {
    _initData() {
      this.list.forEach(item => {
        item.content = item.originalContent
      })
    },
    handlerChange(e) {
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
</style>
