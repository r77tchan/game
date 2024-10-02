// 変数の宣言
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tile = {
  image: null,
  a: [0, 1],
  b: [1, 1],
  c: [2, 1],
  d: [3, 1],
  e: [4, 1],
  f: [5, 1],
  g: [6, 1],
  h: [7, 1],
  i: [0, 2],
  j: [1, 2],
  k: [2, 2],
  l: [3, 2],
  n: [4, 2],
  m: [5, 2],
  o: [6, 2],
  p: [7, 2]
};

const tileMap = [
  [tile.a, tile.b, tile.c, tile.d],
  [tile.e, tile.f, tile.g, tile.h],
  [tile.i, tile.j, tile.k, tile.l],
  [tile.n, tile.m, tile.o, tile.p]
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
  x: 0,
  y: 0,
  width: 16,
  height: 24,
  speed: 1,
  image: null,
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

// リサイズイベントに応じてキャンバスのサイズを変更
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  // ウィンドウ全体をキャンバスのサイズに設定
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  deadZone.width = canvas.width / 3;
  deadZone.height = canvas.height / 3;
  deadZone.x = (canvas.width - deadZone.width) / 2;
  deadZone.y = (canvas.height - deadZone.height) / 2;
  draw();
}

// 関数の定義
function update() {
  let isMovingUp = false;
  let isMovingRight = false;
  let isMovingLeft = false;
  let isMovingDown = false;
  if (keys.ArrowUp || keys.e || keys.i) {
    if (deadZone.y < player.y) {
      player.y -= player.speed;
    } else {
      map.y += player.speed;
    }
    isMovingUp = true;
  }
  if (keys.ArrowRight || keys.f || keys.l) {
    if (deadZone.x + deadZone.width > player.x + player.width) {
      player.x += player.speed;
    } else {
      map.x -= player.speed;
    }
    isMovingRight = true;
  }
  if (keys.ArrowLeft || keys.s || keys.j) {
    if (deadZone.x < player.x) {
      player.x -= player.speed;
    } else {
      map.x += player.speed;
    }
    isMovingLeft = true;
  }
  if (keys.ArrowDown || keys.d || keys.k) {
    if (deadZone.y + deadZone.height > player.y + player.height) {
      player.y += player.speed;
    } else {
      map.y -= player.speed;
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
  for (let row = 0; row < tileMap.length; row++) {
    for (let col = 0; col < tileMap[row].length; col++) {
      const selected = tileMap[row][col];
      const SCALE = 16;
      for (let k = 0; k < SCALE; k++) {
        for (let l = 0; l < SCALE; l++) {
          ctx.drawImage(tile.image, selected[0] * 16, selected[1] * 16, 16, 16, 16 * (col * SCALE + l) + map.x, 16 * (row * SCALE + k) + map.y, 16, 16);
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  ctx.drawImage(player.image, player.animationFrameX * 24, player.animationFrameY * 32, 24, 32, player.x - 4, player.y - 8, 24, 32);

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
    player.x,
    player.y,
    player.width,
    player.height
  )
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function init() {
  player.image = new Image();
  player.image.src = 'player.png';
  tile.image = new Image();
  tile.image.src = 'map.png';
  resizeCanvas();
  // player.x = (canvas.width / 2) - (16 / 2);
  // player.y = (canvas.height / 2) - (24 / 2);
  gameLoop();
}

// 初期化関数の呼び出し
init();