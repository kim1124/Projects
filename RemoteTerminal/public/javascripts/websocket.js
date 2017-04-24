/*

일 시 : 2017.03

설 명 : 웹소켓에 관련된 객체를 생성합니다.

수 정 :

*/

import io from 'socket.io';

let obj_staticsock = null;

class Websocket {

  static createSocketServer(server){

    if(!server){

      return false;

    }

    obj_staticsock = io(server);

  }

  static getSocketInstance(){

    return obj_staticsock;

  }

}

export { Websocket };
