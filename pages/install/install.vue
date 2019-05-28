<template>
	<view>
		<div class="bg1 top" style="display: flex;align-items: center;justify-content: center;">
			<img :src="mainData.headImgUrl" style="width: 60px;height:60px;border-radius:50%;" />
		</div>
		<div class="ist-item bg1" style="margin-top: 10px;">
			<div class="ilblock flo-left color2 font15">
				分销ID
			</div>
			<div class="ilblock flo-right color1 font15">
				{{mainData.user_no}}
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				分销者名称
			</div>
			<div class="ilblock flo-right color1 font15">
				{{mainData.info.name}}
			</div>
		</div>
		<div class="ist-item bg1" style="border-bottom: none;" @click="showMulLinkageThreePicker">
			<div class="ilblock flo-left color2 font15">
				所在地区
			</div>
			<div class="ilblock flo-right color1 font15">
				{{submitData.address==''?'请选择地区':submitData.address}}<img src="../../static/images/home-icon9.png" style="width: 6px; margin-left: 15px;" />
			</div>
		</div>
		<div class="ist-item bg1" style="border-bottom: none; margin-top: 10px;">
			<div class="ilblock flo-left color2 font15">
				产品上架通知
			</div>
			<div class="ilblock flo-right color1 font15">
				共一个<img src="../../static/images/home-icon9.png" style="width: 6px; margin-left: 15px;" />
			</div>
		</div>
		<div class="ist-item bg1" style="margin-top: 10px;">
			<div class="ilblock flo-left color2 font15">
				达人新订单通知{{submitData.notice_new}}
			</div>
			<img src="../../static/images/icon1.png"></img>
			
			<div class="ilblock flo-right color1 font15" @click="change('notice_new')">
				<img :src="submitData.notice_new=='true'?'../../static/images/icon1.png':'../../static/images/icon2.png'" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				达人退单通知
			</div>
			<div class="ilblock flo-right color1 font15" @click="change('notice_return')">
				<img :src="submitData.notice_return=='true'?'../../static/images/icon1.png':'../../static/images/icon2.png'" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				团队新订单通知
			</div>
			<div class="ilblock flo-right color1 font15" @click="change('notice_group_new')">
				<img :src="submitData.notice_group_new=='true'?'../../static/images/icon1.png':'../../static/images/icon2.png'" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				团队退单通知
			</div>
			<div class="ilblock flo-right color1 font15" @click="change('notice_group_return')">
				<img :src="submitData.notice_group_return=='true'?'../../static/images/icon1.png':'../../static/images/icon2.png'" style="width: 26px;" />
			</div>
		</div>
		<div class="ist-item bg1">
			<div class="ilblock flo-left color2 font15">
				海报显示购选LOGO
			</div>
			<div class="ilblock flo-right color1 font15" @click="change('poster')">
				<img :src="submitData.poster=='true'?'../../static/images/icon1.png':'../../static/images/icon2.png'" style="width: 26px;" />
			</div>
		</div>
		<button class="color5">
			保存修改
		</button>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},

		data() {
			return {
				submitData:{
					notice_group_new: "",
					notice_group_return: "",
					notice_new: "",
					notice_return: "",
					notice_shelf: "",
					poster:'',
					address:''
				},
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#F98A48',
				
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				mainData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)

		},
		methods: {
			
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				
				this.submitData.address = e.label;
				console.log('e',e)
			},
			onCancel(e){
				console.log('e',e)
			},
			
			getMainData() {
				const self = this;
				const postData = {
					tokenFuncName: 'getProjectToken',
					thirdapp_id: 2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0],
						self.submitData.notice_group_new = res.info.data[0].info.notice_group_new,
						self.submitData.notice_group_return = res.info.data[0].info.notice_group_return,
						self.submitData.notice_new = res.info.data[0].info.notice_new,
						self.submitData.notice_return = res.info.data[0].info.notice_return,
						self.submitData.notice_shelf = res.info.data[0].info.notice_shelf,
						self.submitData.poster = res.info.data[0].info.poster,
						self.submitData.address = res.info.data[0].info.address
					} else {
						self.$Utils.showToat('数据错误')
					}
					self.$Utils.finishFunc('getMainData');
				}
				self.$apis.userGet(postData, callback);
			},
			
			change(type){
				const self = this;
				console.log(self.submitData[type])
				if(self.submitData[type]=='true'){
					self.submitData[type]='false'
				}else if(self.submitData[type]=='false'){
					self.submitData[type]='true'
				}
				console.log(self.submitData[type])
			}
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	
	.top {
		width: 100%;
		height: 100px;
	}

	.ist-item {
		width: 100%;
		height: 42px;
		line-height: 42px;
		padding: 0px 15px;
		border-bottom: solid 1px #F6F6F6;
	}
	button{
		 background: #FB8448;
		 width:80%;
		 height: 35px;
		 line-height: 35px;
		 border-radius: 20px;
		 margin: 30px auto 20px;
		 border: none;
		 font-size: 15px;
	}
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
