
//工厂函数
// function user(name,age,gender){
//   var person = {};
//   person.name = name;
//   person.age = age;
//   person.gender = gender;
//   return person;
// }

// var whh =user('王花花',20,"male");
// console.log('whh:',whh);

//构造函数
function User(name,age,gender) {
  this.name= name;
  this.age= age;
  this.gender= gender;
  //this代表即将生成的对象
}

var whh = new User('王花花',20,"male");
console.log("whh",whh);