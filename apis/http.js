import store from "@/store"
import config from "@/config/index.config.js";
import token from '@/common/token.js';


export default {
	HTTP(obj) {
		var self = this;	
		const callback = (res)=>{
            if(res){
                obj.data.refreshToken=false;
            };
            self.HTTP(obj);
        };

        if(obj.data.tokenFuncName){
            console.log('obj.data.token');
            if(obj.data.refreshToken){
                token[obj.data.tokenFuncName](callback,{refreshToken:true});
            }else{
                obj.data.token = token[obj.data.tokenFuncName](callback);
            };
            if(!obj.data.token){
                return;
            };
            console.log('obj.data.token',obj.data.token);
        };
		
		var custom_header = {'content-type': 'application/json',};
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		uni.request({
			url: config.baseUrl + obj.url, //仅为示例，并非真实接口地址。
			data: obj.data,		
			method:obj.type,
			header:custom_header,
			success: (res) => {
				console.log('resres')
				var code = res.data.solely_code;
                if (res.data.solely_code == '200000') {
                    console.log('params.data.tokenFuncName',obj)
                    token[obj.data.tokenFuncName](callback,{refreshToken:true});
                } else {
                    obj.sCallback && obj.sCallback(res.data);
                };
				if(uni.getStorageSync('loadAllArray').length==0||!uni.getStorageSync('loadAllArray')){
					uni.hideLoading();
				};
				
			},
            fail: function (err) {
                
                uni.showToast({
                    title:'网络故障',
                    icon:'fail',
                    duration:2000,
                    mask:true,
                });
            }
		});	
	}
}
