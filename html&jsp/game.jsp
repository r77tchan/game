<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="images/favicon1.png" type="image/png" sizes="48x48">
  <title>gg.mh4.jp(オフライン)</title>
  <style>
    body, html {
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center; /* 縦方向の中央配置 */
      justify-content: center; /* 横方向の中央配置 */
      overflow: hidden; /* スクロールバーを表示しない */
      background-color: black;
      user-select: none; /* タッチ時に選択されないようにする */
      -webkit-user-select: none; /* Safari用 */
      -ms-user-select: none; /* IE用 */
      touch-action: none; /* タッチ操作のデフォルトを抑制する */
    }
    canvas {
      display: block; /* 不要な隙間を取り除くため */
      image-rendering: pixelated;
    }
    .dpad {
      position: fixed;
      bottom: 50px; /* 画面の下から50ピクセルの位置に配置 */
      left: 35%;
      transform: translateX(-50%); /* 横方向の中央に配置するために位置を調整 */
      width: 160px;
      height: 160px;
      display: none;
    }
    .dpad button {
      position: absolute;
      width: 40px;
      height: 40px;
      font-size: 24px;
      background-color: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 5px;
    }
    .boost { top: 80px; left: 160px; }
    .up { top: 0; left: 40px; }
    .left { top: 40px; left: 0; }
    .right { top: 40px; left: 80px; }
    .down { top: 80px; left: 40px; }
    .attack { top: 0; left: 160px; }

  </style>
</head>
<body>
  <canvas width="350" height="600"></canvas>
  <div id="dpad" class="dpad">
    <button class="boost" id="boostButton">B</button>
    <button class="up" id="upButton">▲</button>
    <button class="left" id="leftButton">◀</button>
    <button class="right" id="rightButton">▶</button>
    <button class="down" id="downButton">▼</button>
    <button class="attack" id="attackButton">A</button>
  </div>
  <script>
      let dbData = {};
      let appData = {};
      let sesData = {};
      let reqData = {};
      <% String dbData = (String)request.getAttribute("dbData"); %>
      <% String appData = (String)request.getAttribute("appData"); %>
      <% String sesData = (String)request.getAttribute("sesData"); %>
      <% String reqData = (String)request.getAttribute("reqData"); %>
      <% if (dbData != null) { %>
      dbData = JSON.parse('<%= dbData %>');
      <% } %>
      <% if (appData != null) { %>
      appData = JSON.parse('<%= appData %>');
      <% } %>
      <% if (sesData != null) { %>
      sesData = JSON.parse('<%= sesData %>');
      <% } %>
      <% if (reqData != null) { %>
      reqData = JSON.parse('<%= reqData %>');
      <% } %>
    </script>
  <script src="js/game.js"></script>
</body>
</html>