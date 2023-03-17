<template>
  <div class="list-wrap list-wrap-layout">
    <!--筛选-->
    <div class="search-block">
      <van-dropdown-menu :close-on-click-outside="false" active-color="#4f87f7">
        <van-dropdown-item title="筛选" ref="screen">
          <div class="search-box">
            <van-cell-group>
              <div class="cf-field active">
                <span class="cf-label">区域：</span>
                <div class="cf-field-input cf-field-step ml15" @click="destinationAreaPicker = !destinationAreaPicker">
                  <div>{{ listForm.destinationArea || '全市' }}</div>
                </div>
                <div class="arrow" @click="destinationAreaPicker = !destinationAreaPicker">
                  <i class="iconfont icon-xialajiantou"></i>
                </div>
              </div>
              <div class="cf-field">
                <span class="cf-label">车牌号：</span>
                <van-field label="" v-model="listForm.vehicleNo" placeholder="请输入车牌号" :maxlength="7" clearable @clear="onRefresh" />
              </div>
              <div class="cf-field">
                <span class="cf-label">原产地：</span>
                <van-field label="" v-model="listForm.originPlace" placeholder="请输入原产地" clearable @clear="onRefresh" />
              </div>

              <div class="cf-field-wrap">
                <div class="cf-field">
                  <span class="cf-label">提货时间（起）：</span>
                  <div class="cf-field-input cf-field-step ml15" @click.stop=";(dPickerProp = 'startLadingTime'), (dateTimePicker = true)">
                    {{ listForm.startLadingTime }}
                  </div>
                </div>
                <div class="cf-field">
                  <span class="cf-label">提货时间（止）：</span>
                  <div class="cf-field-input cf-field-step ml15" @click.stop=";(dPickerProp = 'endLadingTime'), (dateTimePicker = true)">
                    {{ listForm.endLadingTime }}
                  </div>
                </div>
              </div>
            </van-cell-group>
            <div class="bf-cont2">
              <van-button color="#cecece" round class="lr-btn btn-left" @click="initList">重置</van-button>
              <van-button
                type="primary"
                round
                size="normal"
                :disabled="loading"
                :loading="loading"
                loading-text="查询中..."
                class="lr-btn btn-right"
                @click="onRefresh"
                >查询</van-button
              >
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
      <div class="total-block mr10">共计{{ total }}条</div>
      <van-button type="default" size="small" class="add-btn" style="background: #3199ff" @click="handleAdd">
        <van-icon name="plus" color="#fff" class="mr10" />
        新增
      </van-button>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list class="ma-list" v-if="!refreshing" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="item in list" :key="item.id">
          <div
            class="panel-block panel-block2"
            @click="
              router.push({
                path: '/demoForm',
                query: {
                  status: 1,
                  id: item.id
                  // onlyRead: true
                }
              })
            "
          >
            <div class="panel-cont-wrap">
              <div class="item-block">
                <span class="line-name">货类：</span>
                <span class="line-content">牛肉</span>
              </div>
              <div class="item-block">
                <span class="line-name">原产地：</span>
                <span class="line-content">巴西</span>
              </div>
              <div class="item-block">
                <span class="line-name">提单号：</span>
                <span class="line-content">911303460</span>
              </div>
              <div class="item-block">
                <span class="line-name">箱号：</span>
                <span class="line-content">MNBU3785441</span>
              </div>
              <div class="item-block">
                <span class="line-name">收货时间：</span>
                <span class="line-content">2020-12-19 19:46:08</span>
              </div>
              <!--标签-->
              <div class="item-tags">
                <van-tag type="primary">完成检查</van-tag>
              </div>
            </div>

            <!-- 操作按钮-->
            <div class="item-action-list">
              <div class="action-wrap pr">
                <van-button type="primary" size="small" block @click.stop="relation(item)">关联</van-button>
              </div>
            </div>
          </div>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>

    <!--区域-->
    <van-popup v-model:show="destinationAreaPicker" position="bottom">
      <van-picker show-toolbar :columns="destinationAreaColumns" @cancel="destinationAreaPicker = false" @confirm="onConfirmDestinationArea" />
    </van-popup>

    <!-- 时间 -->
    <van-popup v-model:show="dateTimePicker" position="bottom">
      <van-date-picker v-model="currentDate" title="选择日期" :max-date="dateMax" @cancel="dateTimePicker = false" @confirm="dateTimePickerConfirm" />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import { getShccList } from '@/api/login'

/**
 * 筛选
 */
const screen: any = ref(null)
// 区域【去向区域】
const destinationAreaPicker = ref(false)
const destinationAreaColumns = ref([
  { text: '全市', value: '' },
  { text: '无', value: '' },
  { text: '浦东新区', value: '浦东新区' }
])
// --------------------日期时间------------------
const _currentDate = ref(['2021', '01', '01'])
const currentDate = ref(_currentDate)
const dateTimePicker = ref(false)
const dPickerProp = ref('')
const dateMax = ref(new Date())

// 表单
let listForm = reactive({
  actualColdStorage: '',
  workOrderStatus: '完成检查',
  destinationArea: '全市', // 区域
  vehicleNo: '',
  originPlace: '',
  vehicleStatus: '', // 车辆状态
  startLadingTime: '', // 提货时间
  endLadingTime: '',
  page: 0, // 当前页码
  size: 10 // 一页显示数量
})
// 重置使用
let initListForm = reactive({})

// 列表
const total = ref(0)
const list = ref(
  <
    {
      id: string
    }[]
  >[]
)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

/**
 * 刷新列表
 */
const onRefresh = () => {
  // 清空列表数据
  list.value = []
  finished.value = false
  // 加载状态
  loading.value = true
  // 重新加载数据
  listForm.page = 0
  onLoad()
}
/**
 * 请求列表
 */
const onLoad = () => {
  const _listForm = JSON.parse(JSON.stringify(listForm))
  // 区域
  _listForm.destinationArea === '全市' ? delete _listForm.destinationArea : true
  _listForm.destinationArea === '无' ? (_listForm.destinationArea = '') : true
  getShccList(_listForm)
    .then((res: any) => {
      const { success, content } = res
      if (success) {
        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }
        list.value.push(...content.content)
        total.value = content.total
        loading.value = false

        if (list.value.length >= content.total) {
          finished.value = true
        } else {
          listForm.page += 1
        }
      }
    })
    .finally(() => {
      screen.value.toggle(false)
    })
}
/**
 * --------------------------------handle other-----------------------------
 */
const initList = () => {
  // 先初始化再请求
  listForm = JSON.parse(JSON.stringify(initListForm))
  onRefresh()
}
// 新增
const handleAdd = () => {
  router.push({
    path: '/demoForm',
    query: {
      status: 0
    }
  })
}
// 关联
const relation = (item: any) => {
  console.log('关联')
  console.log(item)
}
// 区域
const onConfirmDestinationArea = (e: any) => {
  destinationAreaPicker.value = false
  listForm.destinationArea = e.selectedValues[0]
  onRefresh()
}
// 日期
const dateTimePickerConfirm = (e: any) => {
  dateTimePicker.value = false
  listForm[`${dPickerProp.value}`] = e.selectedValues.join('-')
  onRefresh()
}
/**
 * init
 */
// 工单状态
listForm.actualColdStorage = useUserStore().userData.companyName || ''
initListForm = JSON.parse(JSON.stringify(listForm))
</script>

<style lang="less">
@import '@/lib/commons/layout.less';
</style>

<style lang="less" scoped>
@import '@/lib/commons/list.less';
.ss-close-btn {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 10;
}
.bf-cont2 {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  box-sizing: border-box;
  .btn-left {
    width: 90px;
  }
  .btn-right {
    width: calc(100% - 100px);
    &.w100 {
      width: 100%;
    }
  }
}
.cf-field-wrap {
  border: 1px solid #ebedf0;
  margin-top: 10px;
  padding: 0 15px;
  width: calc(100% - 30px);
  margin-left: 15px;
  .cf-field {
    padding: 0;
    &::after {
      left: 0 !important;
    }
  }
}
.add-btn.export-btn {
  width: 70px;
}
.text-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
/*面板2 标签及按钮周边*/
.panel-block2 {
  position: relative;
  .panel-cont-wrap {
    width: calc(100% - 110px);
    justify-content: flex-start !important;
  }
  .item-action-list {
    width: 86px;
    //height: 211px;
    .action-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      button {
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        &.action-check-btn {
          background: #0070c0;
          border: 1px solid #2f528f;
        }
        &.edit-btn {
          background: #7f7f7f;
          border: 1px solid #2f528f;
        }
      }
    }
  }
  .item-tags {
    & .van-tag {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
