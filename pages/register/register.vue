<template>
	<view>
		<view class="top bg3 color5 font13">
			ID:5645866
		</view>
		<view class="list-box">
			<view class="list-item">
				<image src="../../static/images/达人/icon9.png" style="margin-right: 22px;"></image>
				<view class="list-right ilblock bg2">
					<input class="font14" placeholder="请输入手机号(同微信绑定的手机号)" v-model="submitData.phone" />
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
				<image src="../../static/images/达人/icon11.png" style="width: 19px;" ></image>
				<view class="list-right ilblock bg2">
					<input class="font14" placeholder="请输入真实姓名" v-model="submitData.name"/>
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
		<button class="bg3 color5 radiu20 font15" style="width:69%;height:35px;line-height: 35px;" @click="submit">注册</button>
	</view>
</template>

<script>

	export default {

		data() {
			return {
				submitData:{
					phone:'',
					name:''
				},
				imgcode:''
			}
		},
		
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			if(options[0]&&options[0].parent_no){
				self.parent_no = options[0].parent_no
			};
		
		},
		methods: {
			
			
			refresh:function(){
				this.$refs.imgcode.refresh();
			},
			show:function(){
				var _self=this;
				setTimeout(function(){
					_self.refresh();
				},500);
			},
		

			submit() {
				const self = this;
				
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					primary_scope: 30,
				};
				postData.saveAfter = [
					{
						tableName:'UserInfo',
						FuncName:'update',
						searchItem:{
							user_no:uni.getStorageSync('user_info').user_no
						},
						data:{
							level:1,
							name:self.submitData.name,
							phone:self.submitData.phone,
						}
					}	
				];
				if(self.parent_no){
					postData.saveAfter.push({
						tableName:'Distribution',
						FuncName:'add',
						data:{
							type:1,
							child_no:uni.getStorageSync('user_info').user_no,
							parent_no:self.parent_no,
						}
					});
				};
				console.log('submit',self.submitData)
				if (self.$Utils.checkComplete(self.submitData)) {
					const callback = (res) => {
						if (res.solely_code == 100000) {
							console.log(res);
						} else {
							self.$Utils.showToast(res.msg)
						}
					};
					
					self.$apis.userUpdate(postData, callback);
				} else {
					self.$Utils.showToast('信息不全', 'none')
				};
			},


		}
	}
</script>

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
	
	
	@import "../../assets/style/index.css";
	@import "../../assets/style/basic.css";
</style>
