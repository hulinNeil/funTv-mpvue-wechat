<template>
  <view>
    <scroll-view class="tab" scroll-x="true">
      <view class="tab-bar" :class="index == activeTabIndex ? 'active' : ''" v-for='(item,index) in tabs' @click="changeTab(index)">{{item.name}}</view>
    </scroll-view>
    <swiper class="tab-content" duration="300" @change="changeTab" :current="activeTabIndex">
      <swiper-item v-for='(item,index) in tabs' >
        <cart :navId='item.nav_id'></cart>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>

import cart from '../../components/cart.vue'

export default {
  data () {
    return {
      activeTabIndex: 0,
      userInfo: {},
      tabs: []
    }
  },
  components: {cart},
  methods: {
    changeTab (e) {
      let index = 0
      if (e.target) {
        index = e.target.current
      } else {
        index = e
      }
      this.activeTabIndex = index
      this.$children[index].getContent()
    },
    getTabbar () {
      console.log('02154')
      let that = this
      wx.request({
        url: 'http://po.funshion.com/v7/config/channel',
        success: function (res) {
          console.log(res)
          let n = ['cmedia', 'cstill', 'cvariety', 'csiterec']
          let o = res.data.channels.filter(function (t) {
            return n.indexOf(t.template) > -1
          })
          that.tabs = o
        }
      })
    }
  },
  onLoad () {
    console.log('333')
  },
  created () {
    // 调用应用实例的方法获取全局数据
    console.log('555')
    this.getTabbar()
  }
}
</script>

<style scoped>
  .tab{
    white-space: nowrap;
    height:30px;
    border-bottom:1px solid #eee;
  }
  .tab-bar{
    width:auto;
    display:inline-block;
    padding: 0 20px;
  }
  .tab-bar.active{
    color:red;
  }
  .tab-content{
    height:calc(100vh - 30px);
  }
</style>
