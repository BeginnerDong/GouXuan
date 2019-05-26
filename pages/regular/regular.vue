<template>
	<view>
	
		<div class="top" style="border-top: solid 1px #E8E8E8; border-bottom: solid 1px #E8E8E8;">
			<img src="../../static/images/达人/img4.png" style="width: 345px; margin:15px 15px 30px;" />
		</div>
		<div class="text ilblock color1 font15 bg2">当前权益</div>
		<div class="text-box bg1 color1">
			<view class="content ql-editor" v-html="mainData.content">
			</view>
		</div>
		<button @click="webSelf.$Router.navigateTo({route:{path:'/pages/team-code/team-code'}})" class="color5" style="background: #FB8448;width:320px;height: 35px;border-radius: 20px; margin: 30px auto 20px;font-size:14px;line-height: 35px;">
			邀请好友
		</button>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				mainData:[]
			}
		},
		
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		methods: {
			

			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['升级规则']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},	
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
		.text {
		width: 150px;
		height: 25px;
		text-align: center;
		margin-left: 120px;
		position: relative;
		top: -13px;
	
	}
	
	.text-box {
		width: 345px;
		height: 260px;
		padding: 15px;
		text-align: justify;
		margin-left: 15px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px #E6E6E6;
	}
	
	li {
		margin-top: 10px;
	
	}
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";


</style>
