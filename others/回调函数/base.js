// function yo(callback) {
//   console.log("yo");
//   if(callback){
//     callback();
//   }
// }

// yo(function(){
//   console.log("打钱");
// });

// var a = [2,4,6,8];

// function each(arr) {
//   for(var i = 0;i<arr.length;i++){
//     // console.log(arr[i]);
//     var item = arr[i];
//     if(item>5 ){
//       console.log(item);
//     }
//   }
// }

// // each(a);//2,4,6,8
// each(a);//6,8


var b = [2,4,,6,8];
function each(arr,callback){
  for(var i = 0;i<arr.length;i++){
    var item =arr[i];
    callback(item);
  }
}

each(b,function(item){
  if(item>5){
    console.log(item);
  }
});//6,8

each(b,function(item){
  if(item<5){
    console.log(item);
  }
});//2,4



each(b,function(item){
  if(item==2){
    console.log(item);
  }
});//2

function equal2(item){
  if(item == 2){
    console.log(item);
  }
}

each(b,equal2);//2