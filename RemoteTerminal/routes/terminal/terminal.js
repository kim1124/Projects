/*

일 시 : 2017.03

설 명 : 클라이언트 요청에 대한 라우팅 기능을 제공합니다.

수 정 :

*/

// 0. 중요모듈 import

import os from 'os';
import express from 'express';
import BasicTerminal from '../../public/javascripts/ptyterminal';

let terminalRouter = express.Router();

// 1. connLocalTerminal - Xterm.js를 사용하여 웹 터미널 클라이언트를 브라우저에 출력합니다.

terminalRouter.get('/connLocalTerminal', (req, res) => {

    // 1-1. 로컬 터미널 객체 생성

    let obj_localterm = new BasicTerminal('bash');

    // 1-2. 로컬 터미널 생성

    obj_localterm.createPtyTerminal();

    // 1-3. 클라이언트에 정보 전달

    let str_id = obj_localterm.getTerminalId();

    let obj_params = {

        'str_termid': str_id

    };

    // 1-4. EJS 템플릿 렌더링

    res.render('/terminal/webterminal.ejs', obj_params);

});

// 2. connRemoteTerminal - 원격지에 있는 시스템에 접근합니다.

terminalRouter.get('/connRemoteTerminal', (req, res) => {});

export default terminalRouter;
