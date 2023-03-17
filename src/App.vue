<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import '@/lib/baseStyle/index.less';
@import '@/lib/baseStyle/base.less';
// body {
//   font-size: 16px;
//   background-color: #f8f8f8;
//   -webkit-font-smoothing: antialiased;
// }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    display: flex;
    z-index: 999;
    min-height: calc(100% + 1px);
  }
}

/*列表筛选块*/
.search-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 12px -8px rgba(0, 0, 0, 0.53);
  height: 52px;
  .van-dropdown-menu {
    /*flex: auto;*/
    width: 70px;
    & .van-dropdown-menu__item {
      justify-content: flex-start;
    }
  }
  .van-dropdown-menu__bar {
    box-shadow: none;
    .van-dropdown-menu__title {
      font-size: 14px;
      color: #0d0d0d;
      &::after {
        border-color: transparent transparent #0d0d0d #0d0d0d;
      }
    }
    .van-dropdown-menu__title--active::after {
      border-color: transparent transparent currentColor currentColor;
    }
  }
  .add-btn {
    width: 86px;
    height: 29px;
    background: #1296db;
    border-radius: 5px;
    color: #fff;
    border: none;
    margin-left: 5px;
    margin-right: 10px;
    .van-button__text {
      display: flex;
      align-items: center;
      justify-content: center;
      .ab-wrap {
        width: 17px;
        height: 17px;
        margin-left: 3px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.total-block {
  color: #000;
  font-size: 14px;
}
// 新增
.add-btn-wrap {
  width: 100%;
  height: 50px;
  padding: 0 22px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .add-btn {
    width: 100%;
    height: 36px;
    background: transparent;
    border-radius: 5px;
    color: #3399ff;
    border: 2px dashed #3399ff;
    font-weight: bold;
    .van-button__text {
      display: flex;
      align-items: center;
      justify-content: center;
      .van-icon {
        margin-right: 8px;
        font-weight: bold;
      }
    }
  }
}
/*刷新*/
.van-pull-refresh {
  min-height: calc(100vh - 52px);
  & .van-pull-refresh__head {
    margin-top: 5px;
  }
  & .van-pull-refresh__track {
    min-height: calc(100vh - 52px);
  }
}
/*操作*/
.action-block {
  padding: 20px 0;
  .action-list {
    margin-bottom: 20px;
    & .van-cell {
      padding: 15px 15px;
      & .iconshuaxin {
        font-size: 22px;
        color: #666;
        margin-right: 18px;
      }
      & .van-icon {
        font-size: 22px;
        color: #343434;
        margin-right: 18px;
      }
      font-size: 16px;
      color: #343434;
    }
  }
  & .cancel-btn {
    width: calc(100% - 30px);
    margin: auto;
    color: #272726 !important;
  }
}
</style>
