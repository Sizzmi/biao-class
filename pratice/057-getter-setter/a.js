var data = require('/.data');

/*从data模块获取age */
var age = data.get_age();

console.log(age);

/*从更改data模块中的age的值，同时更新当前模块的值*/
age = data.set_age(2);
console.log(age);
console.log(data.get_age());