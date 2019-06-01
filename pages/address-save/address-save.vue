<template>
	<view>
		<div class="save-box">
			<div class="ilblock color2 font15" style="margin-left: 15px;">
				所在地区：
			</div>
			<div class="color1 ilblock flo-right" style="margin-right: 15px;"  @click="showMulLinkageThreePicker">{{submitData.city==''?'请选择地区':submitData.city}}
				<image src="../../static/images/home-icon9.png" style="width: 10px;height:10px;margin-left: 10px;"></image>
			</div>
				
		</div>
		<div class="save-box">
			<div class="ilblock color2 font15" style="margin-left: 15px;">
				地址类型：
			</div>
			<span class="color1 radiu20 bg2" :style="submitData.name=='公司'?'background: linear-gradient(to right,#FF9B5C,#FF6160)':''" style="padding: 4px 12px;" @click="choose('公司')">公司</span>
			<span class="color1 radiu20 bg2" :style="submitData.name=='家'?'background: linear-gradient(to right,#FF9B5C,#FF6160)':''" style="padding: 4px 12px;" @click="choose('家')">家</span>
			<span class="color1 radiu20 bg2" :style="submitData.name=='学校'?'background: linear-gradient(to right,#FF9B5C,#FF6160)':''" style="padding: 4px 12px;"	@click="choose('学校')">学校</span>
		</div>
		<div class="save-box">
			<div class="ilblock color2 font15" style="margin-left: 15px;">
				详细地址：
			</div>
			<input class="color1 ilblock" placeholder="如街道\门牌号" style="border: none; height: 60%; position: relative;top: 14px;" v-model="submitData.detail"/>

		</div>
		<div  @click="webSelf.$Utils.stopMultiClick(submit)">
			<button class="radiu20 color5">保存</button>
		</div>
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
				submitData: {
					name: '',
					city: '',
					detail: ''
				},
				webSelf:this,
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#F98A48',
				
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				
			}
		},
		onLoad(options) {
			const self = this;
			if(options.id){
				self.id = options.id;
				self.$Utils.loadAll(['getMainData'], self)
			}
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */

		},
		methods: {
			
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				
				this.submitData.city = e.label;
				console.log('e',e)
			},
			onCancel(e){
				console.log('e',e)
			},
			
			choose(type){
				const self = this;
				self.submitData.name = type
			},

			getMainData(id) {
				const self = this;
				const postData = {};
				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.tokenFuncName = 'getProjectToken';

				const callback = (res) => {
					console.log(res);
					
					self.submitData.name = res.info.data[0].name;
					self.submitData.detail = res.info.data[0].detail;
					self.submitData.city = res.info.data[0].city;
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.addressGet(postData, callback);
			},



			addressUpdate() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getProjectToken';

				postData.searchItem = {};
				postData.searchItem.id = self.id;
				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('修改成功','success');
						self.$Router.redirectTo({route:{path:'/pages/address/address'}})
					} else {
						self.$Utils.showToast(data.msg,'error')
					};
					
				};
				self.$apis.addressUpdate(postData, callback);
			},


			addressAdd() {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getProjectToken';

				postData.data = {};
				postData.data = self.$Utils.cloneForm(self.submitData);

				const callback = (data) => {
					uni.setStorageSync('canClick', true);
					if (data && data.solely_code == 100000) {
						self.$Utils.showToast('添加成功','success');
						self.$Router.redirectTo({route:{path:'/pages/address/address'}})
					} else {
						self.$Utils.showToast(data.msg,'success')
					}
					
				};
				self.$apis.addressAdd(postData, callback);
			},


			submit() {
				const self = this;
				
				var phone = self.submitData.phone;
				const pass = self.$Utils.checkComplete(self.submitData);

				console.log('self.data.sForm', self.submitData)
				console.log('pass', pass)
				if (pass) {
					
					if (self.id) {

						self.addressUpdate();
					} else {

						self.addressAdd();
					}

			
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息','success');
				};
			},

		}
	}
</script>

<style>
	@import "../../assets/style/address.css";

	page {
		background: #fff;
	}

	@import "../../assets/style/public.css";
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
