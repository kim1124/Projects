// var aaa = {
//   numberval : 111,
//   arrayVal : ["첫번째", "두번째", "세번째"],
//   funcVal : function(){
//
//     console.log("Function value");
//
//   }
// }
//
// console.log("AAA -> ", aaa);
//
// for(var key in aaa){
//
//   console.log("Property -> " + key + " / value = " + aaa[key]);
//
// }
//
// function TEST(name, title){
//
//   this.name = name;
//   this.title = title;
//
// }
//
// var myTest = new TEST("아", "목아파");
// var myTest2 = new TEST("아", "목아파");
//
// TEST.prototype.protofunc = function(){
//
//   console.log("프로토타입 프로퍼티 -> !!");
//
// };
//
// console.log("myTest -> ", myTest.name);
// console.log("myTest -> ", myTest2.name);
//
// myTest.protofunc();

function Car(){
  var me = this;
  this.color = "blue";
  this.engin = "1.6 DOHC";
  this.trans = "GM 6T40";
  this.getCarInfo = function(){

    console.log("Car model -> ", me.model);
    console.log("Car color -> ", me.color);
    console.log("Car engin -> ", me.engin);
    console.log("Car model -> ", me.trans);

  }

}

function constr (parent){

  function C(){};

  C.prototype = parent;

  return new C();

}

var car = new Car();
var test = constr(car);

console.log("Car -> ", car);
console.log("Test -> ", test);
