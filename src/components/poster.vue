<template>
	<div class="poster">
		<div class="title">
			<div style="width: 26rpx;height: 26rpx;margin-right:20rpx;display: inline-block;background: red;border-bottom-left-radius: 100%;border-top-right-radius: 100%;"></div>
			<div style="display: inline-block;">{{data.name}}</div>
		</div>
		<div class="flex">
			<div class="cart" v-for="item in data.contents" @click="toDetail(item)">
				<div class="cart-img">
					<img :src="item.poster"/>
				</div>
				<div class="cart-name">
					<div class="name">{{item.name}}</div>
					<div class="aword">{{item.aword}}</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
    export default {
      name: 'poster',
      data () {
        return {
          data: {}
        }
      },
      props: {
        pageDate: {
          type: Object,
          default: {}
        }
      },
      created () {
        let arrayDate = this.pageDate
        while (arrayDate.contents.length % 3 !== 0) {
          arrayDate.contents.pop()
        }
        this.data = arrayDate
      },
      methods: {
        toDetail (e) {
          wx.navigateTo({
          	url: '/pages/detail/main?mid=' + e.mid + '&template=' + e.template
          })
        }
      }
    }
</script>

<style>
	.poster>.title{
		height: 78rpx;
		line-height: 78rpx;
		text-align: left;
   		margin-left: 4rpx;
	}
	.poster .flex>.cart{
		flex:0 0 225rpx;
		margin:0 11.25rpx 11.25rpx 0;
	}
	.poster .flex>.cart img{
		width: 225rpx;
		height: 315rpx;
	}
</style>