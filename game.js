// 変数の宣言
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tile = {
  image1: null,
  image2: null,
  image3: null,
  gateImg: null,
  gateNum: 0,
  gateTime: 0,
  moveable: [1, 22, 3, 23],
  point: [
    {},                                                    // 0、空
    {i:1,sx:32,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 1、木材
    {i:1,sx:96,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 2、氷
    {i:1,sx:64,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 3、薄石
    {},
    {},
    {},
    {},
    {},
    {},
    {i:2,sx:12,sy:58,sw: 4,sh: 4,dx:12,dy:12,dw: 4,dh: 4}, // 10、左上枠線
    {i:2,sx: 0,sy:42,sw:16,sh: 4,dx: 0,dy:12,dw:16,dh: 4}, // 11、上枠線
    {i:2,sx: 0,sy:58,sw: 4,sh: 4,dx: 0,dy:12,dw: 4,dh: 4}, // 12、右上枠線
    {i:2,sx: 0,sy:16,sw: 4,sh:16,dx: 0,dy: 0,dw: 4,dh:16}, // 13、右枠線
    {i:2,sx: 0,sy:48,sw: 4,sh: 4,dx: 0,dy: 0,dw: 4,dh: 4}, // 14、右下枠線
    {i:2,sx: 0,sy:32,sw:16,sh: 4,dx: 0,dy: 0,dw:16,dh: 4}, // 15、下枠線
    {i:2,sx:12,sy:48,sw: 4,sh: 4,dx:12,dy: 0,dw: 4,dh: 4}, // 16、左下枠線
    {i:2,sx:12,sy:16,sw: 4,sh:16,dx:12,dy: 0,dw: 4,dh:16}, // 17、左枠線
    {i:3,sx: 0,sy: 0,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 18、左上
    {i:3,sx: 0,sy:16,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 19、右上
    {i:3,sx: 0,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 20、右下
    {i:3,sx: 0,sy:48,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 21、左下
    {i:1,sx:32,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 22、木材、後に上からゲート
    {i:1,sx:64,sy:48,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 23、濃い石
    {i:1,sx:64,sy:48,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 24、濃い石、後に上からバリケード
    {i:1,sx:32,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 25、木、後に上からテーブル
    {i:1,sx:32,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 26、木、後に上から白テーブル
  ]
};

const tileMap = [
  [ 2,11,11,11,11,11,11,11,11, 0, 0, 0,11,11,11,11,11,11,11,11,12, 0, 0,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,25, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,25, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26,25,26,25,26,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,21,11,11,20, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,23, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,23, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,23, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18,15,15,19, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
  [16,15,15,15,15,15,15,15,15, 0, 0, 0,15,15,15,15,15,15,15,15,14, 0, 0,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14],
];

const map = {
  x: 0,
  y: 0
};

const deadZone = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
};

const player = {
  positionX: 0,
  positionY: 0,
  drawX: 0,
  drawY: 0,
  width: 16,
  height: 24,
  speed: 1,
  image: null,
  auraImg: null,
  auraNum: 0,
  auraTime: 0,
  animationFrameX: 1,
  animationFrameY: 2,
  animationCounter: 0,
  animationDelay: 10,
  direction: 'down',
};

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  e: false,
  f: false,
  d: false,
  s: false,
  i: false,
  l: false,
  k: false,
  j: false,
  g: false,
  h: false
};

// イベントリスナーの設定
document.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const dpad = document.getElementById('dpad');

  // スマホやタブレットを判定する
  if (/Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent)) {
    dpad.style.display = 'block';
  }

  // 十字キーのイベントリスナーを追加
  const addTouchListeners = (buttonId, keyName) => {
    const button = document.getElementById(buttonId);
    button.addEventListener('touchstart', (e) => {
      keys[keyName] = true;
      e.preventDefault(); // 長押しによる選択を防止
    });

    button.addEventListener('touchend', () => {
      keys[keyName] = false;
    });

    // `touchcancel` イベントも追加して、予期しない場合でもキーを解除
    button.addEventListener('touchcancel', () => {
      keys[keyName] = false;
    });
  };

  // 各ボタンにタッチイベントリスナーを追加
  addTouchListeners('upButton', 'e');
  addTouchListeners('downButton', 'd');
  addTouchListeners('leftButton', 's');
  addTouchListeners('rightButton', 'f');
  addTouchListeners('boostButton', 'h'); // ダッシュボタンは'h'キーに対応させる
});


// リサイズイベントに応じてキャンバスのサイズを変更
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  // ウィンドウサイズに基づいてキャンバスのサイズを設定し、2の倍数に丸める
  canvas.width = Math.floor(window.innerWidth / 2) * 2;
  canvas.height = Math.floor(window.innerHeight / 2) * 2;
  deadZone.width = canvas.width / 4;
  deadZone.height = canvas.height / 4;
  deadZone.x = (canvas.width - deadZone.width) / 2;
  deadZone.y = (canvas.height - deadZone.height) / 2;

  // プレイヤー描画位置は常に中心！canvas/2で中心座標、プレイヤーサイズ/2を引くとプレイヤーの中心がcanvasの中心へ
  player.drawX = (canvas.width / 2) - (16 / 2);
  player.drawY = (canvas.height / 2) - (24 / 2);

  // マップ描画開始座標はcanvasの中心からプレイヤー座標を引いた位置
  map.x = canvas.width / 2 - player.positionX;
  map.y = canvas.height / 2 - player.positionY;

  draw();
}

// 関数の定義
function update() {
  let isMovingUp = false;
  let isMovingRight = false;
  let isMovingLeft = false;
  let isMovingDown = false;
  if (keys.g || keys.h) {
    player.speed = 2;
    player.auraTime++;
    if (player.auraTime > 10) {
      player.auraTime = 0;
      player.auraNum++;
      if (player.auraNum > 2) {
        player.auraNum = 0;
      }
    }
  } else {
    player.speed = 1;
  }
  if (keys.ArrowUp || keys.e || keys.i) {
    if (tile.moveable.includes(tileMap[Math.floor((player.positionY-player.speed)/16)][Math.floor((player.positionX)/16)]) && tile.moveable.includes(tileMap[Math.floor((player.positionY-player.speed)/16)][Math.floor((player.positionX+player.width)/16)])) {
      if (deadZone.y < player.drawY-player.speed) {
        player.drawY -= player.speed;
      } else {
        map.y += player.speed;
      }
      player.positionY -= player.speed;
    }
    isMovingUp = true;
  }
  if (keys.ArrowRight || keys.f || keys.l) {
    if (tile.moveable.includes(tileMap[Math.floor((player.positionY)/16)][Math.floor((player.positionX+player.speed+player.width)/16)]) && tile.moveable.includes(tileMap[Math.floor((player.positionY+player.height)/16)][Math.floor((player.positionX+player.speed+player.width)/16)]) && tile.moveable.includes(tileMap[Math.floor((player.positionY+player.height/2)/16)][Math.floor((player.positionX+player.speed+player.width)/16)])) {
      if (deadZone.x + deadZone.width > player.drawX+player.speed + player.width) {
        player.drawX += player.speed;
      } else {
        map.x -= player.speed;
      }
      player.positionX += player.speed;
    }
    isMovingRight = true;
  }
  if (keys.ArrowLeft || keys.s || keys.j) {
    if (tile.moveable.includes(tileMap[Math.floor((player.positionY)/16)][Math.floor((player.positionX-player.speed)/16)]) && tile.moveable.includes(tileMap[Math.floor((player.positionY+player.height)/16)][Math.floor((player.positionX-player.speed)/16)]) && tile.moveable.includes(tileMap[Math.floor((player.positionY+player.height/2)/16)][Math.floor((player.positionX-player.speed)/16)])) {
      if (deadZone.x < player.drawX-player.speed) {
        player.drawX -= player.speed;
      } else {
        map.x += player.speed;
      }
      player.positionX -= player.speed;
    }
    isMovingLeft = true;
  }
  if (keys.ArrowDown || keys.d || keys.k) {
    if (tile.moveable.includes(tileMap[Math.floor((player.positionY+player.speed+player.height)/16)][Math.floor((player.positionX)/16)]) && tile.moveable.includes(tileMap[Math.floor((player.positionY+player.speed+player.height)/16)][Math.floor((player.positionX+player.width)/16)])) {
      if (deadZone.y + deadZone.height > player.drawY+player.speed + player.height) {
        player.drawY += player.speed;
      } else {
        map.y -= player.speed;
      }
      player.positionY += player.speed;
    }
    isMovingDown = true;
  }
  if(isMovingUp || isMovingRight || isMovingLeft || isMovingDown) {
    player.animationCounter++;
  } else {
    switch (player.direction) {
      case 'down':
        player.animationFrameX = 1;
        player.animationFrameY = 2;
        break;
      case 'up':
        player.animationFrameX = 1;
        player.animationFrameY = 0;
        break;
      case 'right':
        player.animationFrameX = 1;
        player.animationFrameY = 1;
        break;
      case 'left':
        player.animationFrameX = 1;
        player.animationFrameY = 3;
        break;
    }
  }
  if (player.animationCounter >= player.animationDelay) {
    if (player.animationFrameX === 0) {
      player.animationFrameX = 2;
    } else {
      player.animationFrameX = 0;
    }
    player.animationCounter = 0;
  }
  if (isMovingLeft) {
    player.animationFrameY = 3;
    player.direction = 'left';
  }
  if (isMovingRight) {
    player.animationFrameY = 1;
    player.direction = 'right';
  }
  if (isMovingUp) {
    player.animationFrameY = 0;   
    player.direction = 'up';
  }
  if (isMovingDown) {
    player.animationFrameY = 2;
    player.direction = 'down'
  }
  
  
}

function drawMap() {
  let gateX;
  let gateY;
  for (let i = 0; i < tileMap.length; i++) {
    for (let j = 0; j < tileMap[i].length; j++) {
      let index = tileMap[i][j];
      if (index != 0) {
        ctx.drawImage(tile['image'+tile.point[index].i], tile.point[index].sx, tile.point[index].sy, tile.point[index].sw, tile.point[index].sh, (16 * j) + tile.point[index].dx + map.x - (16 / 2), (16 * i) + tile.point[index].dy + map.y - (24 / 2), tile.point[index].dw, tile.point[index].dh);
        if (index == 22) {
          gateX = 16 * j;
          gateY = 16 * i;
        }
        // テーブル
        if (index == 25) {
          ctx.drawImage(tile.image1, 16, 416, 16, 16, (j*16)+map.x-(16/2), (i*16)+map.y-(24/2), 16, 16);
        }
        if (index == 26) {
          ctx.drawImage(tile.image1, 0, 416, 16, 16, (j*16)+map.x-(16/2), (i*16)+map.y-(24/2), 16, 16);
        }
      }
    }
  }
  // ワープゲートアニメーション処理
  tile.gateTime++;
  if (tile.gateTime > 10) {
    tile.gateTime = 0;
    tile.gateNum++;
    if (tile.gateNum > 3) {
      tile.gateNum = 0;
    }
  }
  // ワープゲートは16*16で収まらないので、ループ内で描画すると以降のループで上書きされて埋もれてしまう
  ctx.drawImage(tile.gateImg, 28, tile.gateNum*32, 16, 32, gateX + map.x - (16 / 2), gateY - 12 + map.y - (24 / 2), 16, 32);
  // マップ外文字
  ctx.font = '50px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('gg.mh4.jp', map.x + 50, map.y - 100);
  ctx.font = '30px Arial';
  ctx.fillText('『Ctrl』 + 『+』で拡大推奨', map.x - 20, map.y - 20);
  ctx.fillText('移動→ESDF、IJKL', map.x - 20, map.y + tileMap.length * 16 + 30);
  ctx.fillText('加速→G、H', map.x - 20, map.y + tileMap.length * 16 + 90);
  ctx.fillText('攻撃→V、N', map.x - 20, map.y + tileMap.length * 16 + 150);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  // プレイヤー
  if (player.speed === 2) {
    ctx.drawImage(player.auraImg, 24*(player.auraNum+3), /*192*/64, 24, 32, player.drawX-4, player.drawY-8, 24, 32);
  }
  ctx.drawImage(player.image, player.animationFrameX * 24, player.animationFrameY * 32, 24, 32, player.drawX - 4, player.drawY - 8, 24, 32);
  // プレイヤー座標表示
  ctx.font = '10px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText(`px:${player.positionX}/16=${Math.floor(player.positionX/16)}`, 0, 10);
  ctx.fillText(`py:${player.positionY}/16=${Math.floor(player.positionY/16)}`, 0, 20);
  ctx.fillText(`dx:${player.drawX}`, 0, 40);
  ctx.fillText(`zx:${deadZone.x}`, 0, 50);
  ctx.fillText(`dy:${player.drawY}`, 0, 60);
  ctx.fillText(`zy:${deadZone.y}`, 0, 70);
  ctx.fillText(`mx:${map.x}`, 0, 90);
  ctx.fillText(`my:${map.y}`, 0, 100);
  
  // デッドゾーンを視覚的に描画（デバッグ用）
  // ctx.strokeStyle = 'pink';
  // ctx.strokeRect(
  //   deadZone.x, // 開始x
  //   deadZone.y, // 開始y
  //   deadZone.width, // 横幅
  //   deadZone.height // 高さ
  // );

  // プレイヤー判定
  ctx.strokeStyle = 'lime';
  ctx.strokeRect(
    player.drawX,
    player.drawY,
    player.width,
    player.height
  );

}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function init() {
  player.image = new Image();
  player.image.src = 'player.png';
  player.auraImg = new Image();
  player.auraImg.src = 'aura.png';
  tile.image1 = new Image();
  tile.image1.src = 'map.png';
  tile.image2 = new Image();
  tile.image2.src = 'frame.png';
  tile.image3 = new Image();
  tile.image3.src = 'frame2.png';
  tile.gateImg = new Image();
  tile.gateImg.src = 'gate.png';
  resizeCanvas();
  // プレイヤー描画位置は常に中心！canvas/2で中心座標、プレイヤーサイズ/2を引くとプレイヤーの中心がcanvasの中心へ
  player.drawX = (canvas.width / 2) - (16 / 2);
  player.drawY = (canvas.height / 2) - (24 / 2);

  // 現在21マス*16ピクセル / 2（真ん中）が初期位置、座標はプレイヤー左上の点になる、マップ描画との兼ね合いで-プレイヤーサイズ/2
  player.positionX = 21 * 16 / 2 - (16 / 2);
  player.positionY = tileMap.length * 16 / 2 - (24 / 2);

  // マップ描画開始座標はcanvasの中心からプレイヤー座標を引いた位置
  map.x = canvas.width / 2 - player.positionX;
  map.y = canvas.height / 2 - player.positionY;
  
  gameLoop();
}

// 初期化関数の呼び出し
init();