// // ==== Number
// // 1;
// // 2.1;
// // 1e3;
// // NaN;

// // ==== String
// // "Yo"
// // 'Yo'
// // `
// // asfdasdf
// // asdfasfd
// // asfd
// // `

// // ==== Boolean
//  paid = false;

// // undefined

// // null

// // ==== Array
// var arr = [1, 2, 3];
// arr = ['a', 'b', 'c'];

// arr = undefined;

// // console.log(arr);

// var list = [
//   '王花花', // 0
//   '李拴蛋', // 1
//   '刘备备',
//   '王花花',
//   '李拴蛋',
//   '刘备备',
// ];

// var person1 = list[1];
// var person2 = list[2];
// var len = list.length;

// // console.log( person1, person2, len );

// // ==== Object

// var person = {
//   name: 'whh',
//   age: 18,
//   wife: {
//     name: 'lbb',
//     age: 20,
//   },
//   pet: {
//     name: 'muhaha',
//     type: 'cat'
//   }
// }

// console.log(person);
// console.log(person.name);
// console.log(person.wife.name);
// console.log(person.pet.name);
// console.log(person.balance);

var a = {
    a1: [
      'a', 'b', { v: 666 }
    ]
  }
  
  console.log(a.a1[2].v);
  
  var b = [
    1, 3, 'a', {
      b2: {
        a: 1,
        v: 7,
        c: [{
          z: 666
        }]
      }
    }
  ]
  
  var c = {
    a: {
      u: 1,
      d: {
        o: {
          z: { 1: 2, y: [1, 2] }
        },
        p: {
          yo: [3, 5, 666]
        }
      }
    }
  }
  
  var d = [
    [1, 3, 'abc'],
    [
      'muhaha',
      { d: 1, v: ['a', 'b', { z: 666 }] }
    ]
  ]
  
  var e = {
    a: [3, {
      b: 1,
      v: [1, 3, {
        p: 666
      }]
    }, 9]
  }
  
  // ====================
  
  /* 打印出“我叫王花花，我今年18岁了” */
  
  var person = {
    name: '王花花',
    age: 18,
  }
  
  var a = '我叫' + person.name + '，我今年' + person.age + '岁了';
  console.log(a);
  
  /* 打印出“我叫李拴蛋，我老婆叫王花花，今年18岁了” */
  
   person = {
    name: '李拴蛋',
    wife: {
      name: '王花花',
      age: 18
    }
  }
  
  /* 打印出“我叫李拴蛋，我老婆一共有200块” */
  
   person = {
    name: '李拴蛋',
    wife: {
      name: '王花花',
      age: 18,
      huabei: 1000,
      balance: 1200
    },
  }
  
  /* 打印出“我叫李拴蛋，我丈人有3个朋友” */
  
   person = {
    name: '李拴蛋',
    wife: {
      name: '王花花',
      dad: {
        friends: ['王一','王二','李三']
      }
    },
  }
  
  /* 打印出“我叫李拴蛋，我丈人的第一个朋友叫王一，第三个朋友叫李三” */
  
   person = {
    name: '李拴蛋',
    wife: {
      name: '王花花',
      dad: {
        friends: [{
          name: '王一',
          children: 1,
          averageScore: 44
        }, {
          name: '王二',
          children: 3,
          averageScore: 98        
        } ,{
          name:'李三',
          children: 5,
          averageScore: 87        
        }]
      }
    },
  }
  
  /* 打印出“我叫李拴蛋，我丈人朋友们的孩子们的平均分是85.888888888” */
  
   person = {
    name: '李拴蛋',
    wife: {
      name: '王花花',
      dad: {
        friends: [{
          name: '王一',
          children: 1,
          averageScore: 44
        }, {
          name: '王二',
          children: 3,
          averageScore: 98        
        } ,{
          name:'李三',
          children: 5,
          averageScore: 87        
        }]
      }
    },
  }