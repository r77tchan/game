// 変数の宣言
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tile = {
  image1: null,
  image2: null,
  gateImg: null,
  gateNum: 0,
  gateTime: 0,
  point: [
    {},                                                    // 0、空
    {i:1,sx:32,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 1、木材
    {},
    {},
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
    {i:1,sx:32,sy:32,sw:16,sh:16,dx: 0,dy: 0,dw:16,dh:16}, // 18、木材、後に上からゲート
  ]
};

const tileMap = [
  [ 1,11,11,11,11,11,11,11,11, 0, 0, 0,11,11,11,11,11,11,11,11,12],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13],
  [16,15,15,15,15,15,15,15,15, 0, 0, 0,15,15,15,15,15,15,15,15,14],
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
  h: false,
  touchUp: false,
  touchDown: false,
  touchLeft: false,
  touchRight: false
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
    button.addEventListener('touchstart', () => {
      keys[keyName] = true;
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
  addTouchListeners('upButton', 'touchUp');
  addTouchListeners('downButton', 'touchDown');
  addTouchListeners('leftButton', 'touchLeft');
  addTouchListeners('rightButton', 'touchRight');
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
  if (keys.ArrowUp || keys.e || keys.i || keys.touchUp) {
    if (deadZone.y < player.drawY) {
      player.drawY -= player.speed;
    } else {
      map.y += player.speed;
    }
    player.positionY -= player.speed;
    isMovingUp = true;
  }
  if (keys.ArrowRight || keys.f || keys.l || keys.touchRight) {
    if (deadZone.x + deadZone.width > player.drawX + player.width) {
      player.drawX += player.speed;
    } else {
      map.x -= player.speed;
    }
    player.positionX += player.speed;
    isMovingRight = true;
  }
  if (keys.ArrowLeft || keys.s || keys.j || keys.touchLeft) {
    if (deadZone.x < player.drawX) {
      player.drawX -= player.speed;
    } else {
      map.x += player.speed;
    }
    player.positionX -= player.speed;
    isMovingLeft = true;
  }
  if (keys.ArrowDown || keys.d || keys.k || keys.touchDown) {
    if (deadZone.y + deadZone.height > player.drawY + player.height) {
      player.drawY += player.speed;
    } else {
      map.y -= player.speed;
    }
    player.positionY += player.speed;
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
        ctx.drawImage(tile['image'+tile.point[index].i], tile.point[index].sx, tile.point[index].sy, tile.point[index].sw, tile.point[index].sh, (16 * j) + tile.point[index].dx + map.x, (16 * i) + tile.point[index].dy + map.y, tile.point[index].dw, tile.point[index].dh);
        if (index == 18) {
          gateX = 16 * j;
          gateY = 16 * i;
        }
      }
    }
  }
  // ワープゲート
  tile.gateTime++;
  if (tile.gateTime > 10) {
    tile.gateTime = 0;
    tile.gateNum++;
    if (tile.gateNum > 3) {
      tile.gateNum = 0;
    }
  }
  ctx.drawImage(tile.gateImg, 28, tile.gateNum*32, 16, 32, gateX + map.x, gateY - 12 + map.y, 16, 32);
  // マップ外文字
  ctx.font = '50px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('gg.mh4.jp', map.x + 50, map.y - 100);
  ctx.font = '30px Arial';
  ctx.fillText('『Ctrl』 + 『+』で拡大推奨', map.x - 20, map.y - 20);
  ctx.fillText('移動→ESDF、IJKL', map.x - 20, map.y + tileMap.length * 16 + 30);
  ctx.fillText('加速→G、H', map.x - 20, map.y + tileMap.length * 16 + 90);
  ctx.fillText('攻撃→V、B', map.x - 20, map.y + tileMap.length * 16 + 150);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  // プレイヤー
  if (player.speed === 2) {
    ctx.drawImage(player.auraImg, 24*player.auraNum, 192/*64*/, 24, 32, player.drawX-4, player.drawY-8, 24, 32);
  }
  ctx.drawImage(player.image, player.animationFrameX * 24, player.animationFrameY * 32, 24, 32, player.drawX - 4, player.drawY - 8, 24, 32);


  // デッドゾーンを視覚的に描画（デバッグ用）
  ctx.strokeStyle = 'red';
  ctx.strokeRect(
    deadZone.x, // 開始x
    deadZone.y, // 開始y
    deadZone.width, // 横幅
    deadZone.height // 高さ
  );

  // プレイヤー判定
  ctx.strokeRect(
    player.drawX,
    player.drawY,
    player.width,
    player.height
  )

  

  // ctx.font = '40px Verdana';
  // ctx.fillStyle = 'blue';
  // ctx.textAlign = 'center';
  // ctx.textBaseline = 'middle';
  // ctx.fillText('You are dead!', canvas.width / 2, canvas.height / 2);

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
  tile.gateImg = new Image();
  tile.gateImg.src = 'gate.png';
  resizeCanvas();
  // プレイヤー描画位置は常に中心！canvas/2で中心座標、プレイヤーサイズ/2を引くとプレイヤーの中心がcanvasの中心へ
  player.drawX = (canvas.width / 2) - (16 / 2);
  player.drawY = (canvas.height / 2) - (24 / 2);

  // 現在21マス*16ピクセル / 2（真ん中）が初期位置、座標はプレイヤー左上の点になる
  player.positionX = tileMap[0].length * 16 / 2;
  player.positionY = tileMap.length * 16 / 2;

  // マップ描画開始座標はcanvasの中心からプレイヤー座標を引いた位置
  map.x = canvas.width / 2 - player.positionX;
  map.y = canvas.height / 2 - player.positionY;
  
  gameLoop();
}

// 初期化関数の呼び出し
init();