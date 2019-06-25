<template>
	<view>
		<div class="text color2" style="font-size: 17px;margin: 28px 15px 20px; text-align: center;">
			{{mainData.title}}
		</div>
		<div class="color1 font13" style="text-align: right;margin-right: 20px;margin-bottom: 20px;">{{mainData.create_time}}</div>
		<div style="width: 100%;">
			<view class="content ql-editor" v-html="mainData.content">
			</view>
		</div>
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
			var options = self.$Utils.getHashParameters();
			if(options[0].type&&options[0].type=='kefu'){
				self.title = '客服说明'
			}else{
				self.title = '使用教程'
			};
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
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', [self.title]],
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
	@import "../../assets/style/quill.css";
	page {
		background: #fff;
	}
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
