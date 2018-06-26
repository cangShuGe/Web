/*
七牛云配置
*/
const qiniu = require("qiniu");

// 创建上传凭证
const accessKey = "RMOsmzr3QNHOjkAxZfuV0jbAV3eKmizDLCvaYHpF";
const secretKey = "uKncqhiJKgs0ffxo80pQpQgM82h9DxZskTwTsR_A";
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: "library",
  deadline: 1531479972
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = {
  uploadToken
};
