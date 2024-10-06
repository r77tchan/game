const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const map = {
  x: 0,
  y: 0,
  gateNum: 0,
  gateTime: 0,
  movable: [1, 22, 3, 23],
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
  ],
  tile: [
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
  ],
};

const img = {
  attack1: Object.assign(new Image(), { src: 'img/attack1.png' }),
  aura1: Object.assign(new Image(), { src: 'img/aura1.png' }),
  character1: Object.assign(new Image(), { src: 'img/character1.png' }),
  gate1: Object.assign(new Image(), { src: 'img/gate1.png' }),
  map1: Object.assign(new Image(), { src: 'img/map1.png' }),
  map2: Object.assign(new Image(), { src: 'img/map2.png' }),
  map3: Object.assign(new Image(), { src: 'img/map3.png' }),
};

const deadZone = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

class BasePlayer {
  constructor(id, px, py, dx, dy, direction) {
    this.id = id;
    this.px = px;
    this.py = py;
    this.dx = dx;
    this.dy = dy;
    this.width = 16;
    this.height = 24;
    this.speed = 1;
    this.auraSX = 0;
    this.auraSY = 0;
    this.auraNum = 0;
    this.auraTime = 0;
    this.aniSX = 0;
    this.aniSY = 0;
    this.aniNum = 0;
    this.aniTime = 0;
    this.direction = direction;
  }
}

class LocalPlayer extends BasePlayer {
  constructor(id) {
    super(id, 0, 0, 0, 0, 'down');
    this.attack = [
      {state: false, x: 0, y: 0, time: 0, direction: ''},
    ];
  }
  handleInput(input) {

  }
}

class RemotePlayer extends BasePlayer {
  constructor(id, px, py, dx, dy) {

  }
  updateFromServer(data) {

  }
}

const keys = {
  groups: {
    moveUp: ['ArrowUp', 'e', 'i', 'upButton'],
    moveDown: ['ArrowDown', 'd', 'k', 'downButton'],
    moveLeft: ['ArrowLeft', 's', 'j', 'leftButton'],
    moveRight: ['ArrowRight', 'f', 'l', 'rightButton'],
    boost: ['g', 'h', 'boostButton'],
    attack: ['n', 'v', 'attackButton'],
  },
  states: {},
  addTouchListeners(buttonId, groupKey) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('touchstart', (e) => {
        if (!this.states[buttonId].pressed) {
          this.states[buttonId].pressed = true;
          this.states[buttonId].handled = false;
        }
        // e.preventDefault(); // 長押しによる選択を防止
      });
      button.addEventListener('touchend', () => {
        this.states[buttonId].pressed = false;
        this.states[buttonId].handled = false;
      });
      button.addEventListener('touchcancel', () => {
        this.states[buttonId].pressed = false;
        this.states[buttonId].handled = false;
      });
    }
  },
  isGroupPressed(group) {
    return this.groups[group].some(key => this.states[key].pressed);
  },
  isGroupHandled(group) {
    let handledKey = this.groups[group].find(key => this.states[key].pressed && !this.states[key].handled);
    if (handledKey) {
      this.states[handledKey].handled = true;
      return true;
    }
    return false;
  },
};

document.addEventListener('DOMContentLoaded', function () {
  // keys.statesへの値セット
  Object.values(keys.groups).flat().forEach(key => {
    keys.states[key] = {
      pressed: false,
      handled: false
    };
  });
  // キーリスナー
  document.addEventListener('keydown', (e) => {
    if (keys.states.hasOwnProperty(e.key)) {
      if (!keys.states[e.key].pressed) {
        keys.states[e.key].pressed = true;
        keys.states[e.key].handled = false;
      }
    }
  });
  document.addEventListener('keyup', (e) => {
    if (keys.states.hasOwnProperty(e.key)) {
      keys.states[e.key].pressed = false;
      keys.states[e.key].handled = false;
    }
  });
  // スマホ用ボタン処理
  const dpad = document.getElementById('dpad');
  // モバイルやタブレットを判定し、iPadやAndroidタブレットも含める
  if (navigator.maxTouchPoints > 0 || /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent)) {
    dpad.style.display = 'block';
  }
  // 各ボタンにタッチイベントリスナーを追加
  keys.addTouchListeners('upButton', 'moveUp');
  keys.addTouchListeners('downButton', 'moveDown');
  keys.addTouchListeners('leftButton', 'moveLeft');
  keys.addTouchListeners('rightButton', 'moveRight');
  keys.addTouchListeners('boostButton', 'boost');
  keys.addTouchListeners('attackButton', 'attack');
  // リサイズイベントに応じてキャンバスのサイズを変更
  window.addEventListener('resize', logic.resizeCanvas);
  
  logic.init();
});

const PC = new LocalPlayer(0);

const logic = {
  init() {
    logic.resizeCanvas();
    logic.gameLoop();
  },
  gameLoop() {
    logic.draw();
    requestAnimationFrame(logic.gameLoop);
  },
  resizeCanvas() {
    // ウィンドウサイズに基づいてキャンバスのサイズを設定し、2の倍数に丸める
    canvas.width = Math.floor(window.innerWidth / 2) * 2;
    canvas.height = Math.floor(window.innerHeight / 2) * 2;
    deadZone.width = canvas.width / 4;
    deadZone.height = canvas.height / 4;
    deadZone.x = (canvas.width - deadZone.width) / 2;
    deadZone.y = (canvas.height - deadZone.height) / 2;

    // プレイヤー描画位置は常に中心！canvas/2で中心座標、プレイヤーサイズ/2を引くとプレイヤーの中心がcanvasの中心へ
    PC.dx = (canvas.width / 2) - (PC.width / 2);
    PC.dy = (canvas.height / 2) - (PC.height / 2);

    // マップ描画開始座標はcanvasの中心からプレイヤー座標を引いた位置
    // map.x = canvas.width / 2 - player.positionX;
    // map.y = canvas.height / 2 - player.positionY;
    // logic.draw();
  },
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (keys.isGroupPressed('moveUp')) {
      PC.dy -= 1;
    }
    if (keys.isGroupPressed('moveRight')) {
      PC.dx += 1;
    }
    if (keys.isGroupPressed('moveDown')) {
      PC.dy += 1;
    }
    if (keys.isGroupPressed('moveLeft')) {
      PC.dx -= 1;
    }
    ctx.strokeRect(PC.dx,PC.dy,PC.width,PC.height);
  }
};