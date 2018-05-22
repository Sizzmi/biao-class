var person = {
  fname: "bobo",
  lname: "da",
  fullname: function () {
    return this.lname + this.fname;
  }
}

var get_full_name = person.fullname;
console.log('person:', person);//user: {fname: "bobo", lname: "da"}
console.log(person.fullname());//boboda

//this 一般指父级对象或者即将生成的对象

function yo(name,a,b,c){
  console.log('Yo.'+name+'我是'+this.name);
}

// var whh={
//   name:'whh',
// }
// var lsd={
//   name:'lsd',
// }

// whh.yo = yo;
// lsd.yo = yo;
// whh.yo();//Yo.我是whh
// lsd.yo();//Yo.我是lsd

var whh = {
  name:'王花花'
}
yo.call(whh,'bobo',1,2,3);//Yo.bobo我是王花花
yo.apply(whh,['bobo',1,2,3]);//Yo.bobo我是王花花
yo2 = yo.bind(whh);
yo2('bobo'); //Yo.bobo我是王花花