<template>
	<view>
		
		<div class="box">
			支付宝账号
		</div>
		<div class="box">
			账号
			<input placeholder="请输入您的账号" v-model="submitData.ali_account"/>
		</div>
		<div class="box">
			姓名
			<input placeholder="请输入您的姓名" v-model="submitData.ali_name"/>
		</div>
		<div class="font11 color2" style="text-align: center; margin-top: 30px;margin-bottom: 50px;">关于支付宝</div>

		<button class="color5" @click="submit">
			保存修改
		</button>





	</view>
</template>

<script>
	export default {

		data() {
			return {
				submitData:{
					ali_account:'',
					ali_name:''
				}

			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)

		},
		methods: {
			
			getMainData() {
				const self = this;
				const postData = {
					tokenFuncName: 'getProjectToken',
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
						self.submitData.ali_account =  res.info.data[0].info.ali_account;
						self.submitData.ali_name =  res.info.data[0].info.ali_name;
					} else {
						self.$Utils.showToat('数据错误')
					}
					self.$Utils.finishFunc('getMainData');
				}
				self.$apis.userGet(postData, callback);
			},
			
			submit() {
				const self = this;
				
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log(pass)
				if (pass) {
					self.userInfoUpdate()	
				} else {
					self.$Utils.showToat('请完善信息', 'none')
				};
			},
			
			userInfoUpdate(){
				const self = this;
				const postData = {
					tokenFuncName: 'getProjectToken',
					data:{
						ali_account:self.submitData.ali_account,
						ali_name:self.submitData.ali_name
					}
				};
				const callback = (res) => {
					if(res.solely_code==100000){
						self.$Utils.showToast('修改成功','none');
						uni.redirectTo({
							url:'/pages/return/return'
						})
					}else{
						self.$Utils.showToast(res.msg,'none');
					}
				}
				self.$apis.userInfoUpdate(postData, callback);
			}
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
		input {
		display: inline-block;
		width: 80%;
		border: none;
		font-size: 12px;
		float: right;
		position: relative;
		top: 10px;
	}
	
	.box {
		width: 100%;
		border-bottom: solid 1px #F4F4F4;
		background: #fff;
		line-height: 40px;
		box-sizing: border-box;
		padding: 6px 15px;
	}
	button{
		background: #FF824F;width:80%;
		height: 35px;
		border-radius: 20px;
		margin: 20px auto 100px;
		line-height: 35px;
		font-size: 15px;
	}
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";


</style>
