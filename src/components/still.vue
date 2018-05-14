<template>
	<div class="still">
		<div class="title">
			<div style="width: 26rpx;height: 26rpx;margin-right:20rpx;display: inline-block;background: red;border-bottom-left-radius: 100%;border-top-right-radius: 100%;"></div>
			<div style="display: inline-block;">{{data.name}}</div>
		</div>
		<div class="flex">
			<div class="cart" v-for="(item,index) in data.contents" @click="toDetail(item)">
				<div class="cart-img" >
					<img :src="item.still" />
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
      name: 'still',
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
        if (arrayDate.contents.length % 2 !== 0) {
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
	.flex{
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		padding: 0 15rpx 0 26rpx;
	}
	.still>.title{
		height: 78rpx;
		line-height: 78rpx;
		text-align: left;
   		margin-left: 4rpx;
	}
	.still .flex>.cart{
		flex:0 0 343rpx;
		margin:0 11rpx 11rpx 0;
	}
	.still .flex>.cart img{
		width: 343rpx;
		height: 193rpx;
	}
	.cart-name{
		height: 93.75rpx;
		line-height: 46.87rpx;
		margin: 11.25rpx 0;
		text-align: left;
		overflow: hidden;
	}
	.name{
		font-size: 30rpx;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.aword{
		font-size: 26rpx;
		color: #7f8c8d;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>