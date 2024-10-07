const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const map = {
  x: 0,
  y: 0,
  gateNum: 0,
  gateTime: 0,
  movable: [1, 22, 3, 23],
  tile: [
    {},                                                                     // 0、空
    {src:1,type:0,refe: 0,sx:32,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 1、木材
    {src:1,type:0,refe: 0,sx:96,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 2、氷
    {src:1,type:0,refe: 0,sx:64,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 3、薄石
    {},
    {},
    {},
    {},
    {},
    {},
    {src:2,type:0,refe: 0,sx:12,sy: 58,sw: 4,sh: 4,dx:12,dy: 12,dw: 4,dh: 4}, // 10、左上枠線
    {src:2,type:0,refe: 0,sx: 0,sy: 42,sw:16,sh: 4,dx: 0,dy: 12,dw:16,dh: 4}, // 11、上枠線
    {src:2,type:0,refe: 0,sx: 0,sy: 58,sw: 4,sh: 4,dx: 0,dy: 12,dw: 4,dh: 4}, // 12、右上枠線
    {src:2,type:0,refe: 0,sx: 0,sy: 16,sw: 4,sh:16,dx: 0,dy:  0,dw: 4,dh:16}, // 13、右枠線
    {src:2,type:0,refe: 0,sx: 0,sy: 48,sw: 4,sh: 4,dx: 0,dy:  0,dw: 4,dh: 4}, // 14、右下枠線
    {src:2,type:0,refe: 0,sx: 0,sy: 32,sw:16,sh: 4,dx: 0,dy:  0,dw:16,dh: 4}, // 15、下枠線
    {src:2,type:0,refe: 0,sx:12,sy: 48,sw: 4,sh: 4,dx:12,dy:  0,dw: 4,dh: 4}, // 16、左下枠線
    {src:2,type:0,refe: 0,sx:12,sy: 16,sw: 4,sh:16,dx:12,dy:  0,dw: 4,dh:16}, // 17、左枠線
    {src:3,type:0,refe: 0,sx: 0,sy:  0,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 18、左上
    {src:3,type:0,refe: 0,sx: 0,sy: 16,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 19、右上
    {src:3,type:0,refe: 0,sx: 0,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 20、右下
    {src:3,type:0,refe: 0,sx: 0,sy: 48,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 21、左下
    {src:4,type:2,refe: 1,sx:28,sy: 32,sw:16,sh:32,dx: 0,dy:-12,dw:16,dh:32}, // 22、木材、後に上からゲート
    {src:1,type:0,refe: 0,sx:64,sy: 48,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 23、濃い石
    {src:1,type:1,refe:23,sx:64,sy: 48,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 24、濃い石、後に上からバリケード
    {src:1,type:1,refe: 1,sx:16,sy:416,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 25、木、後に上からテーブル
    {src:1,type:1,refe: 1,sx: 0,sy:416,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 26、木、後に上から白テーブル
  ],
  data: [
    [ 2,11,11,11,11,11,11,11,11, 0, 0, 0,11,11,11,11,11,11,11,11,12, 0, 0,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,25, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,25, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,26,25,26,25,26,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
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
  map1: Object.assign(new Image(), { src: 'img/map1.png' }),
  map2: Object.assign(new Image(), { src: 'img/map2.png' }),
  map3: Object.assign(new Image(), { src: 'img/map3.png' }),
  map4: Object.assign(new Image(), { src: 'img/map4.png' }),
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
    this.auraNum = 0;
    this.auraTime = 0;
    this.aniSX = 0;
    this.aniSY = 0;
    this.aniTime = 0;
    this.direction = direction;
  }
}

class LocalPlayer extends BasePlayer {
  constructor(id) {
    super(id, (21*16)/2-8, (21*16)/2-12, 0, 0, 'down'); // 初期座標設定。左上が起点だが、表示は中心にしたいのでサイズの半分引いているが、そもそも初期位置は好きに決めていいのでさほど重要ではない。一応これは、16ピクセルのブロックが上下に21あって、その中心。
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
    moveRight: ['ArrowRight', 'f', 'l', 'rightButton'],
    moveDown: ['ArrowDown', 'd', 'k', 'downButton'],
    moveLeft: ['ArrowLeft', 's', 'j', 'leftButton'],
    attack: ['n', 'v', 'attackButton'],
    boost: ['h', 'g', 'boostButton'],
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
  keys.addTouchListeners('rightButton', 'moveRight');
  keys.addTouchListeners('downButton', 'moveDown');
  keys.addTouchListeners('leftButton', 'moveLeft');
  keys.addTouchListeners('attackButton', 'attack');
  keys.addTouchListeners('boostButton', 'boost');
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
    logic.update();
    logic.draw();
    logic.debug.exe();
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

    // プレイヤー描画開始位置は常に中心！canvas/2で中心座標、プレイヤーサイズ/2を引くとプレイヤーの中心がcanvasの中心へ
    PC.dx = (canvas.width / 2) - (PC.width / 2);
    PC.dy = (canvas.height / 2) - (PC.height / 2);

    // マップ描画開始座標はcanvasの中心からプレイヤー座標を引いた位置
    // プレイヤーは中心に描画するが座標は左上が起点なので、マップ描画開始位置はプレイヤー本座標の半分左上へ移動させる
    map.x = (canvas.width / 2) - PC.px- (PC.width/2);
    map.y = canvas.height / 2 - PC.py- (PC.height/2);
  },
  update() {
    // 更新処理
    map.gateTime = (map.gateTime + 1) % 11; // 0~10循環
    map.gateNum = map.gateTime === 0 ? (map.gateNum + 1) % 4 : map.gateNum; // 0なら0~3循環、まだならそのまま
    PC.speed = (keys.isGroupPressed('boost')) ? 2 : 1;
    if (keys.isGroupPressed) {
      PC.auraTime = (PC.auraTime + 1) % 11; // 0~10循環
      if (PC.auraTime === 0) {
        PC.auraNum = (PC.auraNum + 1) % 3; // 0~2循環
      }
    }

    
    // 座標更新
    if (keys.isGroupPressed('moveUp')) {
      if (deadZone.y < PC.dy-PC.speed) {
        PC.dy -= PC.speed;
      } else {
        map.y += PC.speed;
      }
      PC.py -= PC.speed;
    }
    if (keys.isGroupPressed('moveRight')) {
      if (deadZone.x+deadZone.width > PC.dx+PC.speed+PC.width) {
        PC.dx += PC.speed;
      } else {
        map.x -= PC.speed;
      }
      PC.px += PC.speed;
    }
    if (keys.isGroupPressed('moveDown')) {
      if (deadZone.y+deadZone.height > PC.dy+PC.speed+PC.height) {
        PC.dy += PC.speed;
      } else {
        map.y -= PC.speed;
      }
      PC.py += PC.speed;
    }
    if (keys.isGroupPressed('moveLeft')) {
      if (deadZone.x < PC.dx-PC.speed) {
        PC.dx -= PC.speed;
      } else {
        map.x += PC.speed;  
      }
      PC.px -= PC.speed;
    }

    // 移動中ならアニメ時間加算、静止中なら方向に合わせて切り取り位置セット
    if (keys.isGroupPressed('moveUp') || keys.isGroupPressed('moveRight') || keys.isGroupPressed('moveDown') || keys.isGroupPressed('moveLeft')) {
      PC.aniTime++;
    } else {
      switch (PC.direction) {
        case 'up':
          PC.aniSX = 1;
          PC.aniSY = 0;
          break;
        case 'right':
          PC.aniSX = 1;
          PC.aniSY = 1;
          break;
        case 'down':
          PC.aniSX = 1;
          PC.aniSY = 2;
          break;
        case 'left':
          PC.aniSX = 1;
          PC.aniSY = 3;
          break;
      }
    }



    // 右足左足、切り替え
    if (PC.aniTime > 10) {
      PC.aniSX = PC.aniSX === 0 ? 2 : 0;
      PC.aniTime = 0;
    }


    // 移動中なら方向に合わせて切り取り位置と方向セット
    if (keys.isGroupPressed('moveUp')) {
      PC.aniSY = 0;
      PC.direction = 'up';
    }
    if (keys.isGroupPressed('moveRight')) {
      PC.aniSY = 1;
      PC.direction = 'right';
    }
    if (keys.isGroupPressed('moveDown')) {
      PC.aniSY = 2;
      PC.direction = 'down';
    }
    if (keys.isGroupPressed('moveLeft')) {
      PC.aniSY = 3;
      PC.direction = 'left';
    }









  },
  draw() {
    // クリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // マップ背景描画
    const obj = [];
    for (let i = 0; i < map.data.length; i++) {
      for (let j = 0; j < map.data[i].length; j++) {
        const index = map.data[i][j];
        if (index !== 0) {
          let info;
          if ([22,25,26].includes(index)) { // 後から描画するオブジェクト
            obj.push({index:index, dx:(16*j), dy:(16*i)});
            info = map.tile[map.tile[index].refe];
          } else {
            info = map.tile[index];
          }
          ctx.drawImage(img['map'+info.src]/*画像名*/, info.sx, info.sy, info.sw, info.sh, (16*j)+(info.dx)+(map.x), (16*i)+(info.dy)+(map.y), info.dw, info.dh);
        }
      }
    }
    // マップオブジェクト描画
    for (let i = 0; i < obj.length; i++) {
      const info = {...map.tile[obj[i].index]}; // アドレスではなく実体をコピー（下で更新するので）
      info.sy = info.type === 2 ? info.sy * map.gateNum : info.sy; // type2ならsy更新（アニメーション）
      ctx.drawImage(img['map'+info.src]/*画像名*/, info.sx, info.sy, info.sw, info.sh, (obj[i].dx)+(info.dx)+(map.x), (obj[i].dy)+(info.dy)+(map.y), info.dw, info.dh);
    }
    // プレイヤーオーラ描画
    if (PC.speed === 2) {
      ctx.drawImage(img.aura1, 24*(PC.auraNum+3), 64, 24, 32, PC.dx-4, PC.dy-4, 24, 32); // プレイヤー16,24、オーラ24,32の共にサイズ8px差なので4pxマイナスすれば中央になる
    }
    // プレイヤー描画
    ctx.drawImage(img.character1, PC.aniSX*24, PC.aniSY*32, 24, 32, PC.dx-4, PC.dy-8, 24, 32); // character1.pngは24*32ずつで並んでいるのでこのサイズで切り取っているが、画像の左4px、右8pxは余分なので、描画はx-4、y-8の位置から開始する（結果プレイヤーサイズは16*24だが、余白分、例えば髪の毛が上にはみ出ても描画はされてる。お得。）

    


    
  },
  debug: {
    exe() {
      logic.debug.PC_draw_border();
      // logic.debug.deadZone_border();
      // logic.debug.center_line();
      logic.debug.coordinate_display();
    },
    PC_draw_border() {
      // プレイヤー枠線描画
      ctx.strokeStyle = 'lime';
      ctx.lineWidth = 0.1;
      ctx.strokeRect(PC.dx, PC.dy, PC.width, PC.height);
    },
    deadZone_border() {
      // デッドゾーン描画
      ctx.strokeStyle = 'pink';
      ctx.lineWidth = 0.1;
      ctx.strokeRect(deadZone.x, deadZone.y, deadZone.width, deadZone.height);
    },
    center_line() {
      // 中心線描画
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.beginPath();
    },
    coordinate_display() {
      // 座標表示
      ctx.font = '10px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText(`px:${PC.px}/16=${Math.floor(PC.px / 16)}`, 0, 10);
      ctx.fillText(`py:${PC.py}/16=${Math.floor(PC.py / 16)}`, 0, 20);
      ctx.fillText(`dx:${PC.dx}`, 0, 40);
      ctx.fillText(`dy:${PC.dy}`, 0, 60);
      ctx.fillText(`zx:${deadZone.x}`, 0, 50);
      ctx.fillText(`zy:${deadZone.y}`, 0, 70);
      ctx.fillText(`mx:${map.x}`, 0, 90);
      ctx.fillText(`my:${map.y}`, 0, 100);
      ctx.fillText(`cx:${canvas.width / 2}`, 0, 120);
      ctx.fillText(`cy:${canvas.height / 2}`, 0, 130);
      // ctx.fillText(`xxx:${xxx}`, 0, 150);
      // ctx.fillText(`xxx:${xxx}`, 0, 160);
    },
  },
};