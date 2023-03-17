<template>
  <div class="check-form form-wrap form-wrap-layout" :class="{ 'only-read-panel active': $route.query.onlyRead }">
    <div class="title-content">
      <div>Form模板</div>
    </div>
    <div class="form-content">
      <div class="form-header">
        <van-cell-group>
          <div class="cf-field active ciie-clickable cf-field-input-select">
            <van-field
              class="ciie-star"
              v-model="form.shippingDock"
              label="提离码头："
              placeholder="请输入提离码头"
              type="textarea"
              clearable
              rows="1"
              autosize
            />
            <div class="arrow" @click="shippingDockPicker = !shippingDockPicker">
              <i class="iconfont icon-xialajiantou"></i>
            </div>
          </div>
          <van-field
            class="ciie-star"
            v-model="form.vehicleNo"
            label="车牌号："
            placeholder="请输入车牌号"
            type="textarea"
            clearable
            :maxlength="7"
            rows="1"
            autosize
          />
          <van-field class="ciie-star" v-model="form.driver" label="司机：" placeholder="请输入司机" type="textarea" clearable rows="1" autosize />
          <div class="cf-field ciie-star">
            <span class="cf-label">中转库：</span>
            <div class="cf-field-input cf-field-step" @click="searchPanelPicker = !searchPanelPicker">
              <div>{{ form.planColdStorage }}</div>
            </div>
            <div class="arrow" @click="searchPanelPicker = !searchPanelPicker">
              <i class="iconfont icon-xialajiantou"></i>
            </div>
          </div>
          <div class="cf-field ciie-star">
            <span class="cf-label">提货时间：</span>
            <div class="cf-field-input cf-field-step" @click="dateTimePicker = !dateTimePicker">{{ form.ladingTime }}</div>
          </div>
        </van-cell-group>
      </div>
      <!-- 收货查验时 不显示货物去向 & 发往省份，因为提交前已写死-->
      <div class="form-header mt10">
        <van-cell-group>
          <div class="cf-field active ciie-star ciie-clickable">
            <span class="cf-label">货物去向：</span>
            <div class="cf-field-input cf-field-step" @click="goodsNextStagePicker = !goodsNextStagePicker">
              <div>{{ form.goodsNextStage }}</div>
            </div>
            <div class="arrow" @click="goodsNextStagePicker = !goodsNextStagePicker">
              <i class="iconfont icon-xialajiantou"></i>
            </div>
          </div>
        </van-cell-group>
      </div>
    </div>
    <div class="btn-fixed" v-if="!$route.query.onlyRead">
      <div class="bf-cont">
        <van-button
          type="primary"
          round
          size="normal"
          :disabled="isDisabled"
          :loading="isDisabled"
          loading-text="提交中..."
          class="lr-btn btn-right w100"
          @click="submitForm"
          >确认
        </van-button>
      </div>
    </div>

    <!--提离码头-->
    <!-- <van-popup v-model="shippingDockPicker" position="bottom">
      <van-picker show-toolbar :columns="shippingDockColumns" @cancel="shippingDockPicker = false" @confirm="onConfirmShippingDock" />
    </van-popup> -->
    <!--货物去向-->
    <!-- <van-popup v-model="goodsNextStagePicker" position="bottom">
      <van-picker show-toolbar :columns="goodsNextStageColumns" @cancel="goodsNextStagePicker = false" @confirm="onConfirmGoodsNextStage" />
    </van-popup> -->

    <!--时间1-->
    <!-- <van-popup v-model="dateTimePicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" title="选择时间" @cancel="dateTimePicker = false" @confirm="dateTimePickerConfirm" />
    </van-popup> -->

    <!--搜索检索-->
    <!-- <van-popup v-model="searchPanelPicker" position="right" :lock-scroll="false">
      <SearchPanel @onCancel="searchPanelPicker = false" @selectItem="selectItem"></SearchPanel>
    </van-popup> -->
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
// import { getShcc } from '@/api/login'
// const formStatus = ref(0) // 0 新增， 1 编辑【更新】
const isDisabled = ref(false)
// ----------------------公共参数start-------------------------------
// 提离码头
const shippingDockPicker = ref(false)
// const shippingDockColumns = ref([])

// 货物去向
const goodsNextStagePicker = ref(false)
// const goodsNextStageColumns = ref([])
// const goodsNextStageColumnsCheck = ref([])
// const goodsNextStageColumnsTips = ref([])
// 时间1
const dateTimePicker = ref(false)
// const currentDate = ref(new Date())

// 搜索面板
const searchPanelPicker = ref(false)
// ----------------------公共参数end-------------------------------
const form = reactive({
  // =========== 新增编辑 ===================================
  id: 0,
  shippingDock: '', // 提离码头
  vehicleNo: '', // 车牌号
  driver: '', // 司机
  planColdStorage: '', // 中转库
  ladingTime: '', // 提货时间
  goodsNextStage: '' // 货物去向
})
// const formTips = reactive({
//   shippingDock: '提离码头',
//   vehicleNo: '车牌号',
//   driver: '司机',
//   planColdStorage: '中转库',
//   ladingTime: '提货时间',
//   goodsNextStage: '货物去向'
// })

// 日期选择范围
// const minDate = ref('')
// const maxDate = ref('')

//  新增还是编辑
console.log(router)

const submitForm = () => {
  console.log('submitForm')
}
// if (router.query.status) {
//   this.formStatus = this.$route.query.status - 0
// } else {
//   this.formStatus = 0
// }

// if (this.formStatus === 0) {
//   this.form.ladingTime = this.util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
// }
// // 初始化下拉数据
// this.initSelectData()
// this.initForm() // 新增

// export default {
//   name: 'demoForm',
//   mounted() {
//     //  新增还是编辑
//     if (this.$route.query.status) {
//       this.formStatus = this.$route.query.status - 0
//     } else {
//       this.formStatus = 0
//     }

//     if (this.formStatus === 0) {
//       this.form.ladingTime = this.util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
//     }
//     // 初始化下拉数据
//     this.initSelectData()
//     this.initForm() // 新增
//   },
//   methods: {
//     initForm() {
//       // 如果是编辑
//       if (this.formStatus === 1) {
//         this.formDetails()
//       }
//     },
//     initSelectData() {
//       const selectArr = ['shippingDockColumns', 'goodsNextStageColumns', 'goodsNextStageColumnsCheck', 'goodsNextStageColumnsTips']
//       selectArr.map(item => {
//         // this[item] = selectData[item]
//       })
//     },
//     // 提离码头
//     onConfirmShippingDock(e) {
//       this.shippingDockPicker = false
//       this.form.shippingDock = e
//     },
//     // 货物去向
//     onConfirmGoodsNextStage(e) {
//       const _that = this
//       const _rgTips = this.goodsNextStageColumnsTips
//       const flagArr = this.goodsNextStageColumnsCheck
//       if (flagArr.includes(e)) {
//         let _tip = ''
//         let _tit = ''
//         flagArr.map((item, index) => {
//           if (e === item) {
//             _tip = _rgTips[index]
//             _tit = item
//           }
//         })
//         this.$dialog
//           .confirm({
//             title: _tit,
//             message: _tip
//           })
//           .then(() => {
//             // on close
//             _that.goodsNextStagePicker = false
//             _that.form.goodsNextStage = e
//           })
//           .catch(() => {
//             _that.goodsNextStagePicker = false
//           })
//       } else {
//         this.goodsNextStagePicker = false
//         this.form.goodsNextStage = e
//       }
//     },
//     // 中转库
//     selectItem(e) {
//       this.searchPanelPicker = false
//       this.form.planColdStorage = e
//     },
//     // 提货时间
//     dateTimePickerConfirm(e) {
//       this.dateTimePicker = false
//       this.form.ladingTime = this.util.formatDate(e, 'yyyy-MM-dd hh:mm:ss')
//     },
//     // --------------------------------提交start------------------------------------
//     submitForm() {
//       const _that = this
//       if (this.isDisabled) return
//       // -------------------new handle---------------------------
//       // ----------------遍历form为空的字段--------------------
//       if (!this.util.checkIsEmpty(this.form, this.formTips)) return
//       this.isDisabled = true

//       let _request = 'editReq'
//       if (this.formStatus === 0) {
//         _request = 'addReq'
//         delete _that.form.id
//       }
//       _that.api[_request](_that.form)
//         .then(res => {
//           if (res.success) {
//             _that.$toast({
//               type: 'success',
//               duration: 500,
//               message: '提交成功',
//               onClose() {
//                 // 存储编辑后的表单，用于更新列表
//                 if (_that.formStatus === 1) {
//                   // 更新列表【通过id查询选中item详情】
//                   localStorage.setItem('updateIndex', 4)
//                 }
//                 window.history.length > 1 ? _that.$router.go(-1) : _that.$router.push('/')
//               }
//             })
//           } else {
//             _that.isDisabled = false
//           }
//         })
//         .catch(() => {
//           _that.isDisabled = false
//         })
//     },
//     // --------------------------------提交end------------------------------------
//     // ---------------------------------------------编辑------------------------------------------------
//     formDetails() {
//       getShcc({ id: this.$route.query.id + '' }).then(res => {
//         const { success, content } = res
//         if (success) {
//           this.form = content
//         }
//       })
//     }
//   }
// }
</script>
<style lang="less">
@import '@/lib/commons/layout.less';
</style>
<style lang="less" scoped>
@import '@/lib/commons/form.less';
</style>
