<template>
	<view>
		<view class="top bg3 color5 font13">
			ID:5645866
		</view>
		<view class="list-box">
			<view class="list-item">
				<image src="../../static/images/达人/icon9.png" style="margin-right: 22px;"></image>
				<view class="list-right ilblock bg2">
					<input class="font14" placeholder="请输入手机号(同微信绑定的手机号)" />
				</view>
			</view>
			<view class="list-item">
				<image src="../../static/images/达人/icon10.png" style="width: 19px;"></image>
				<view class="list-right ilblock bg2">
					<input class="font14 ilblock" placeholder="请输入验证码" />
					<button class="bg3 color5 ilblock radiu20 font13 flo-right">获取验证码</button>
				</view>
			</view>
			<view class="list-item">
				<image src="../../static/images/达人/icon11.png" style="width: 19px;"></image>
				<view class="list-right ilblock bg2">
					<input class="font14" placeholder="请输入真实姓名" />
				</view>
			</view>
			<view class="list-item">
				<image src="../../static/images/达人/icon12.png" style="margin-right: 22px;"></image>
				<view class="list-right ilblock bg2">
					<view class="ilblock font14" style="height: 100%; line-height:35px;">请选择地区</view>
					<view class="ilblock flo-right" style="width: 8px; height: 16px;margin-top: 9px;">
						<image src="../../static/images/home-icon9.png" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
			</view>
		</view>
		<button class="bg3 color5 radiu20 font15" style="width:69%;height:35px;line-height: 35px;">注册</button>
	</view>
</template>


<style>
	page{
		background: #fff;
	}
	.top{
		width: 100%;
		height: 30px;
		text-align: center;
		line-height: 30px;
	}
	.list-box{
		width: 100%;
		box-sizing: border-box;
		padding: 25px 4%;
		margin-bottom: 50px;
	}
	.list-item{
		margin-bottom: 25px;
	}
	.list-item image{
		width: 17px;
		height: 21px;
		margin-right: 20px;
	}
	.list-right{
		width: 87.5%;
		height: 35px;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0px 15px;
		color: rgb(128,128,128);
	}
	.list-right input{
		color: rgb(186,186,186);
		margin-top: 8px;
	}
	.list-right button{
		height: 25px;
		width: 80px;
		margin-top: 8px;
		line-height: 25px;
		position: relative;
		top: -3px;
		left: 5px;
	}
	
	
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
