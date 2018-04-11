


// 选中页面中的#age元素
var age_element = document.querySelector('#age');
var name_element = document.querySelector('#name');

/*当<input id="age">发生改变时执行后面的函数*/
age_element.addEventListener('change',
    function () {

        /*取到<input>中的值*/
        var age = age_element.value;

        /*将字符串转换为数字类型*/
        age = parseInt(age);

        if (!age && age !== 0) {
            console.log('年龄不能为空');
        } else if (age < 1) {
            console.log('别逗我哦');
        } else if (age == 18) {
            console.log('刚成年');
        } else if (age > 18 && age < 40) {
            console.log('青年');

        } else if (age == 92) {
            console.log('长者');

        } else {
            console.log('yo');
        }

    });

name_element.addEventListener('change',

    function () {
        var name = name_element.value.trim();

        if (!name) {
            console.log('无名氏，请输入姓名');
        } else {
            console.log(name + '您好');
        }
    });

