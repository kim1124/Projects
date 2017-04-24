/*

일 시 : 2017.03

설 명 : ptyjs 터미널을 관리하는 매니저 객체 입니다.

수 정 :

*/

class PtyManager {

  constructor(){

    this.obj_terminal = {};

  }

  setTerminalById(id, obj_terminal){

    this.obj_terminal[id] = obj_terminal;

  }

  getTerminalById(id){

    let obj_terminal = this.obj_terminal[id];

    if(obj_terminal){

      return false;

    }

    return obj_terminal;

  }

  delTerminalById(id){

    delete this.obj_terminal[id];

  }

}

export {PtyManager};
