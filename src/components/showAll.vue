<template>
	<div class="page showAll">
		<div class="title">
			<div>简介</div>
			<div @click="close">
				<icon class='close' type="clear" size="20" />
			</div>
		</div>
		<div class="body">
			<div class="body-info">
				<p v-if="profile.director">导演：{{profile.director}}</p>
				<p v-if="profile.actor">主演：{{profile.actor}}</p>
				<p v-if="profile.category">类型：{{profile.category}}</p>
				<p v-if="profile.release">更新：{{profile.release}}</p>
			</div>
			<div class="body-cont">
				<p v-if="profile.description">
					{{profile.description}}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "detail",
        props: {
        	profile: {
        		type: Object,
        		default: {}
        	}
        },
		methods: {
			close() {
				console.log("关闭关闭",this);
                this.$parent.showAll = false;
			}
		}
	}
</script>

<style>
	.showAll {
		height: calc(100vh - 421.875rpx);
		width: 750rpx;
		overflow-y: scroll;
    	overflow-x: hidden;
		position: fixed;
        z-index:2;
		top: 421.875rpx;
        padding-top:67rpx;
		color: #7F8C8D;
        background: #EAEAEA;
	}
    .showAll.active{
        left:750rpx;
    }
	.showAll::-webkit-scrollbar{
		width: 0px;
		height: 0px;
	}
	.showAll .title{
		display: flex;
        width:730rpx;
		padding: 4rpx 10rpx;
		border-bottom: 1px solid #7F8C8D;
		line-height: 67rpx;
		justify-content: space-between;
        position:fixed;
        top: 421.875rpx;
        background:#EAEAEA;
	}
    .close{
        margin-top:16rpx;
    }
	.showAll .title div{
		height: 67rpx;
	}
	.showAll .title img{
		width: 41rpx;
		height: 41rpx;
		margin-top: 10rpx;
	}
	.showAll .body{
		padding: 30rpx 15rpx 0;
		text-align: left;
		font-size: 30rpx;
	}
	.showAll .body .body-info{
		line-height: 41rpx;
		margin-bottom: 30rpx;
	}
	.showAll .body .body-cont{
		text-indent:2em;
		line-height: 43rpx;
        padding-bottom:80rpx;
	}
</style>