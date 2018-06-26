/*
七牛云配置
*/
const qiniu = require("qiniu");

// 创建上传凭证
const accessKey = "2dk7Fyb9rbfnoNlkU4k0OS9v-ddsCLEIfdfIOPab";
const secretKey = "I6yFEbtdh30b9R-Ht0jGNrKjXyBcrM5PrEWMxMrX";
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
