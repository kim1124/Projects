/*

일 시 : 2017.03

설 명 : Xterm.JS를 이용하여 브라우저 화면에 터미널을 렌더링 합니다.

수 정 :

*/

// 0. 소켓 연결
var socket = io.connect('http://localhost:3000');

// . 터미널 영역 계산
var numWidth = window.innerWidth;
var numHeight = window.innerHeight;

var numCols = 200;
var numRows = 150;

// . 터미널 객체 생성
var terminal = new Terminal();

// . Render 영역 구하기
var dom_renderdiv = document.getElementById('terminal');

// . 소켓 이벤트 연결
socket.on('printcli', function(data){

  terminal.write(data);

});

// . 터미널 이벤트 연결
terminal.on('data', function(data){

  socket.emit('inputcli', data);

});

// . 터미널 렌더링
terminal.open(dom_renderdiv);

terminal.toogleFullscreen(true);
