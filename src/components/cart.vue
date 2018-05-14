<template>
  <scroll-view scroll-y style='height:100%'>
    <div v-if="pageContent.blocks" v-for="(item,index) in pageContent.blocks">
      <swiper class="tab-content" v-if="item.template == 'focus'" indicator-dots="true" autoplay="true">
        <swiper-item  v-for="(value,key) in item.contents" @click="toDetail(value)">
          <image :src="value.banner" class="slide-image" mode="scaleToFill"/>
        </swiper-item>
      </swiper>
      <div v-if="item.template == 'still'">
      	<still :pageDate="item"></still>
      </div>
      <div v-if="item.template == 'poster'">
      	<poster :pageDate="item"></poster>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  import still from './still.vue'
  import poster from './poster.vue'
  
export default {
    name: 'cart',
    props: {
      navId: {
        type: String,
        default: ''
      }
    },
    components: {
      still,
      poster
    },
    data () {
      return {
        pageContent: {}
      }
    },
    created () {
      if (this.navId === '1') {
        this.getContent()
      }
    },
    methods: {
      getContent () {
        let that = this
        if (this.pageContent.blocks) {
          return
        }
        wx.request({
          url: 'http://po.funshion.com/v6/config/channelhome?nav_id=' + that.navId,
          success: function (res) {
            that.pageContent = res.data
          }
        })
      },
      toDetail (e) {
      	wx.navigateTo({
      		url: '/pages/detail/main?mid=' + e.mid + '&template=' + e.template
      	})
      }
    }
}
</script>

<style>
.card {
  padding: 10px;
}
.slide-image{
  width:750rpx;
  height:300rpx
}
</style>
