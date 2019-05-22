<template>
	<div >
		<div class="img" id="poster">
			<img class="img-one" :src="mainData.mainImg&&mainData.mainImg[index]?mainData.mainImg[index].url:''" />
		</div>
		<div class="ilblock imgb">
			<img :src="QrData.url" />
		</div>
		<div class="ilblock">
			<div class="color2 font14" style="position: relative; top: 3px;">长按二维码看购买详情</div>
			<div class="color2 font14" style="position: relative; top: 17px;">购选</div>
		</div>
		<div class="ilblock" style="position: relative; left: 42px;">
			<img src="/static/images/达人/Talent%20show-img.png" style="width: 85px;" />
		</div>
	</div>
</template>

<script>
	import html2canvas from '../../common/html2canvas.js'
	export default {

		data() {
			return {
				mainData:[],
				QrData:[],
				index:'',
				url:'',
				
			}
		},
		onLoad(options) {
			const self = this;
		
			self.$Utils.loadAll(['getQrData','getMainData'], self)
			var options = self.$Utils.getHashParameters();
			console.log('options', options)
			self.index = options[0].index
		
			
			html2canvas(document.getElementById("poster"),{ width:375,height:667 }).then(function(canvas){
				var imgUrl = canvas.toDataURL();
				self.url = imgUrl;
				console.log('self.url',self.url )
			});	
		},
		methods: {
			
		
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					title: '达人海报',
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
			getQrData(){
			    const self = this;
			    const postData = {};
			    postData.tokenFuncName = 'getProjectToken';
			    postData.param = 'http://106.12.155.217/index.html'+'&user_no='+uni.getStorageSync('info').user_no;
			    postData.ext = 'png';
			    const callback = (res)=>{
			      console.log(res);
			      self.QrData = res.info;
			      console.log(9990,self.QrData)
				  self.$Utils.finishFunc('getQrData');
			    };
			    self.$apis.getQrCommonCode(postData,callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/code-first.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
