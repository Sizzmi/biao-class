//  var a ={};
//  var b =new Object();
//  console.log(a.constructor === b.constructor);//true

// var a = Object.create({
//   a:1,
//   b:2
// });
// console.log('a:',a);
// 输出结果
// a: {}__proto__: a: 1b: 2__proto__: Object

function Animal(color,weight){
  this.color=color;
  this.weight=weight;
}

Animal.prototype.eat = function(){
  console.log("wawawawawa...");
}
Animal.prototype.sleep = function(){
   console.log('ZZZZZZZzzzz.');
}

// var a = new Animal('black',120);
// console.log('a:',a);



function Mammal(color,weight){
  Animal.call(this,color,weight);
}

Mammal.prototype=Object.create(Animal.prototype);//继承Animal.prototype 属性功能
Mammal.prototype.constructor = Mammal; //将constructor变回 f Mammal(){}
Mammal.prototype.suckle =function(){
  console.log("好奶！");
}

var m = new Mammal('purple',300);
console.log('m:',m);


function Person(color,weight){
  Mammal.call(this,color,weight);
}
Person.prototype = Object.create(Mammal.prototype);
Person.prototype.constructor = Person; 
Person.prototype.lie = function(){
  console.log('你是傻逼');
}


var lsd = new Person('brown',100);
console.log("lsd,",lsd); // 得到3个功能继承属性