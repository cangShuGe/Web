import * as qiniu from 'qiniu-js'


const config = {
  useCdnDomain: true,
  region: qiniu.region.z2,
  retryCount:2,

};

var putExtra = {
  fname: "",
  params: {},
  mimeType: ["image/png", "image/jpeg", "image/gif"] || null
};
var requestUrl = qiniu.createMkFileUrl(
  uploadUrl,
  file.size,
  key,
  putExtra
);

export default {
  uploadQiniu:function(file,key,token,putExtra,config){
    var observable = qiniu.upload(file, key, token, putExtra, config)
    var subscription = observable.subscribe(observer) // 上传开始
    // or
  },
  uploadQiniu2:function(){
    var subscription = this.observable.subscribe(next, error, complete) // 这样传参形式也可以
  },
  uploadCancel:function(){
    this.subscription.unsubscribe() // 上传取消
  }
}
