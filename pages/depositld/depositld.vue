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
		<div class="font11 color2" style=" margin-top: 15px;margin-bottom: 5px;padding: 0 15px;">
			1.为保证您的提现顺利，请您在输入支付宝账号的时候务必填写正确的账号，确认是否为本人常用账号，如果资料填写不正确或不完整则会被系统驳回。

		</div>
		<div class="font11 color2" style=" margin-top: 15px;margin-bottom: 50px;padding: 0 15px;">
			2.建议您反复检查账号、姓名是否正确，如果同一个手机号绑定不同的支付宝时，请使用邮箱地址作为您的收款账号。
		
		</div>
		
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
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['getMainData'], self)
			});
			if(res){
				self.$Utils.loadAll(['getMainData'], self)
			};

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
						if(res.info.data[0].info.ali_account==null){
							self.submitData.ali_account =  ''
						};
						if(res.info.data[0].info.ali_name==null){
						
							self.submitData.ali_name =  ''
						};
					} else {
						self.$Utils.showToast('数据错误')
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
					self.$Utils.showToast('请完善信息', 'none')
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
						setTimeout(function(){
						   uni.redirectTo({
						   	url:'/pages/return/return'
						   })
						},1000);
						
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
