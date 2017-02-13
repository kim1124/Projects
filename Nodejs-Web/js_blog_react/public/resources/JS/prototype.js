/*

2016.12.16

NodeJS - ReactJS 기초강의 자바스크립트 프로토타입 예제

*/

// 메서드 체이닝 예제

/*

function a(){
    console.log('a call');
    return this;
}
function b(){
    console.log('b call');
    return this;
}
a();
b();

var account = {
    id : "",
    password : "",
    setId : function(myId){
        this.id = myId;
        return this;
    },
    setPassword : function(myPassword){
        this.password = myPassword;
        return this;
    },
    print : function(){
        console.log("id : " + this.id);
        console.log("password :" + this.password);
    }
};

account.setId('abc').setPassword('1234');
account.print();

*/

function Car(){


};

console.log("Prototype => ", Car.prototype);
