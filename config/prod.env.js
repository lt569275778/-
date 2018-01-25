var target = process.env.npm_lifecycle_event;
var obj = null;
if (target == 'test') {
　　//测试
　　 obj = {
　　NODE_ENV: '"production"',
　　//post用当前域名
　　API_HOST: '"http://10.83.22.164:30874"'
　　}
}else {
　　//线上
　　 obj = {
　　NODE_ENV: '"production"',
　　//post用当前域名
　　API_HOST: '"http://127.0.0.1:8081"'
　　}
}
module.exports = obj;
