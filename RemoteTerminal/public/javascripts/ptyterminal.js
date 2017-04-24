/*

일 시 : 2017.03

설 명 : ptyjs를 이용하여 로컬 시스템의 CLI에 접근합니다.

수 정 :

*/

import pty from 'pty.js';
import uuid from 'uuid/v4';
import Websocket from './websocket';

class BasicTerminal {

    // Socket.IO 서버가 연동된 Express 객체를 전달 받는다.

    constructor(str_termtype = 'bash') {

        this.arr_env = process.env;
        this.str_termid = null;
        this.str_homepath = process.env.HOME;
        this.str_termtype = str_termtype;

        // 소켓 서버의 인스턴스가 있는지 확인한다.

        let inst_socket = Websocket.getSocketInstance();

        // 소켓 서버의 인스턴스가 없다면 리턴

        if (!inst_socket) {

            return false;

        }

    }

    // createPtyTermianl - pty.js를 이용하여 로컬 CLI와 연동되는 터미널을 생성한다.

    createPtyTerminal() {

        // 소켓 객체 생성

        let io = new Websocket();

        // pty.js 터미널 생성

        let str_termid = uuid();

        let obj_term = pty.spawn(this.str_termtype, [], {

            'name': 'xterm-color',
            'cwd': this.str_homepath,
            'env': this.arr_env

        });

        // 1. 터미널 이벤트 연결

        obj_term.on('data', (data) => {

            obj_socket.emit('printcli', data);

        });

        // 1-1. 소켓 이벤트 연결

        io.on('connection', (socket) => {

            // socket 이벤트 연결 - 연결된 소켓에 이벤트를 연결합니다.

            socket.on('inputcli', (data) => {

                obj_term.write(data);

            });

            socket.on('disconnect', (close) => {

                console.log("Disconnect socket : ", close);

            });

        });

        // 2. 터미널 ID 정보 저장

        this.str_termid = str_termid;

    }

    getTerminalId(){

      return this.str_termid;

    }

}

class RemoteTerminal extends BasicTerminal {

    constructor(str_termtype = 'bash') {

        super(str_termtype);

    }

}

export { BasicTerminal, RemoteTerminal };
