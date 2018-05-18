/*入口文件，整个应用从这里启动*/

var event = require('./event');

init();

/*初始化*/
function init() {
  /*绑定所有必要的事件，比如表单提交、按钮点击之类*/
  event.add_events();
}