function A() {}
A.prototype.name ='asdasd';
var a = new A();
var b = new A();
console.log(a);//A {}__proto__: name: "asdasd"constructor: ƒ A()__proto__: Object
console.log(a.__proto__ ===b.__proto__);//true

// // 实例化
function User(name,age){
  this.name = name;
  this.age = age;
}
  User.prototype.greet=function(){
    console.log("hi我是"+this.name +"，我今年"+this.age+"岁了");
  }

  var whh = new User('王花花',19);
  var lsd = new User('李飒但',19);

  User.prototype.greet=function(){
    console.log('打钱');
  }

  // whh.constructor 
  // //输出结果
  // ƒ User(name,age){
  //   this.name = name;
  //   this.age = age;
  // }


  // whh.greet();//打钱
  // whh.__proto__ === lsd.__proto__ //true


//   this.eat=function() {
//     console.log('bobobobobo.');
//   }

//   this.greeting= function(){
//     console.log("hi我是"+this.name +"，我今年"+this.age+"岁了");
//   }
// }

// var whh = new User('王花花',19);
// whh.eat();//bobobobobo.
// whh.greeting();//hi我是王花花，我今年19岁了
// var lsd = new User('李飒但',19);
// lsd.greeting();//hi我是李飒但，我今年19岁了