<template>
	<view>
		<!--<view class="top bg3 color5 font13">
			分享人ID:{{parent_no}}
		</view>-->
		<view class="list-box">
			<view class="list-item">
				<image src="../../static/images/icon9.png" style="margin-right: 22px;"></image>
				<view class="list-right ilblock bg2">
					<input class="font14" placeholder="请输入手机号(同微信绑定的手机号)" v-model="submitData.phone" />
				</view>
			</view>
			<view class="list-item">
				<image src="../../static/images/icon10.png" style="width: 19px;"></image>
				<view class="list-right ilblock bg2">
					<input class="font14 ilblock" placeholder="请输入验证码" />
					<button class="bg3 color5 ilblock radiu20 font13 flo-right">获取验证码</button>
				</view>
			</view>
			<view class="list-item">
				<image src="../../static/images/icon11.png" style="width: 19px;"></image>
				<view class="list-right ilblock bg2">
					<input class="font14" placeholder="请输入真实姓名" v-model="submitData.name" />
				</view>
			</view>
			<view class="list-item">
				<image src="../../static/images/icon12.png" style="margin-right: 22px;"></image>
				<view class="list-right ilblock bg2" @click="showSinglePicker">
					<view class="ilblock font14" style="height: 100%; line-height:35px;">{{submitData.province_id==''?'请选择地区':label}}</view>

					<view class="ilblock flo-right" style="width: 8px; height: 16px;margin-top: 9px;">
						<image src="../../static/images/home-icon9.png" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
			</view>
		</view>
		<button class="bg3 color5 radiu20 font15" style="width:69%;height:35px;line-height: 35px;" @click="submit">注册</button>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

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
					phone: '',
					name: '',
					province_id: ''
				},
				label:'',
				imgcode: '',
				siteData:[],
				pickerSingleArray: [],


				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#F98A48',
				index:'',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				parent_no:''
			}
		},

		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			if (options[0] && options[0].parent_no) {
				self.parent_no = options[0].parent_no
			};
			self.$Utils.loadAll(['getSiteData'], self)
		},
		methods: {


			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				console.log('e', e)
				this.submitData.province_id = e.value[0];
				this.label = e.label;
				this.index = e.index[0];
				console.log(this.submitData.province_id)
			},
			onCancel(e) {
				console.log('e', e)
			},

			refresh: function() {
				this.$refs.imgcode.refresh();
			},
			show: function() {
				var _self = this;
				setTimeout(function() {
					_self.refresh();
				}, 500);
			},

			getSiteData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type: 9
				};
				postData.order = {
					listorder: 'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.siteData.push.apply(self.siteData, res.info.data);
						for (var i = 0; i < self.siteData.length; i++) {
							self.pickerSingleArray.push({label:self.siteData[i].title,value:self.siteData[i].id})
						}
						console.log('self.pickerSingleArray',self.pickerSingleArray)
						self.$Utils.finishFunc('getSiteData');
					};
				};
				self.$apis.labelGet(postData, callback);
			},


			submit() {
				const self = this;

				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					parent_no: self.parent_no,
					name: self.submitData.name,
					phone: self.submitData.phone,
					province_id: self.submitData.province_id,
				};

				if (self.$Utils.checkComplete(self.submitData)) {
					const callback = (res) => {
						if (res.solely_code == 100000) {
							self.$Utils.showToast('注册成功', 'none');
							window.location.href = self.siteData[self.index].url
						} else {
							self.$Utils.showToast(res.msg, 'none')

						}
					};

					self.$apis.registerSuper(postData, callback);
				} else {
					self.$Utils.showToast('请补全信息', 'none')
				};
			},


		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.top {
		width: 100%;
		height: 30px;
		text-align: center;
		line-height: 30px;
	}

	.list-box {
		width: 100%;
		box-sizing: border-box;
		padding: 25px 4%;
		margin-bottom: 50px;
	}

	.list-item {
		margin-bottom: 25px;
	}

	.list-item image {
		width: 17px;
		height: 21px;
		margin-right: 20px;
	}

	.list-right {
		width: 87.5%;
		height: 35px;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0px 15px;
		color: rgb(128, 128, 128);
	}

	.list-right input {
		color: rgb(186, 186, 186);
		margin-top: 8px;
	}

	.list-right button {
		height: 25px;
		width: 80px;
		margin-top: 8px;
		line-height: 25px;
		position: relative;
		top: -3px;
		left: 5px;
	}
</style>
