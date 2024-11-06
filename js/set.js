
/*
テスト(解析後を想定)
const objData = {
  名前: [['grimReaper', 835, 425, 7],['whiteKnight', 467, 527, 10]],
}
dbData = objData;
appData = objData;
*/

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const map = {
  tile: [
    {},                                                                       // 0、空
    {src:1,type:0,refe: 0,sx:32,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 1、木材
    {src:1,type:0,refe: 0,sx:96,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 2、氷
    {src:1,type:0,refe: 0,sx:64,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 3、薄石
    {src:1,type:0,refe: 0,sx:80,sy: 32,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 4、石
    {src:1,type:0,refe: 0,sx:64,sy: 48,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 5、石
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
    {src:1,type:0,refe: 0,sx:80,sy: 48,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 23、濃い石
    {src:1,type:1,refe:23,sx:48,sy:448,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 24、濃い石、後に上からバリケード
    {src:1,type:1,refe: 1,sx:16,sy:416,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 25、木、後に上からテーブル
    {src:1,type:1,refe: 1,sx: 0,sy:416,sw:16,sh:16,dx: 0,dy:  0,dw:16,dh:16}, // 26、木、後に上から白テーブル
    {src:1,type:0,refe:23,sx: 0,sy:464,sw:16,sh:32,dx: 0,dy:-16,dw:16,dh:32}, // 27、上からガーゴイル
    {src:1,type:0,refe:23,sx:96,sy:464,sw:16,sh:32,dx: 0,dy:-16,dw:16,dh:32}, // 28、上からナイト
  ],
  data: [
    [10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [20, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [24, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [24, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [24, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,27, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,27, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3,23, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,27, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,27, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14],
  ],
};
const img = {
  map1: Object.assign(new Image(), { src: 'images/map1.png' }),
  map2: Object.assign(new Image(), { src: 'images/map2.png' }),
  map3: Object.assign(new Image(), { src: 'images/map3.png' }),
  map4: Object.assign(new Image(), { src: 'images/map4.png' }),
  monster1: Object.assign(new Image(), { src: 'images/monster1.png' }),
  monster2: Object.assign(new Image(), { src: 'images/monster2.png' }),
  monster3: Object.assign(new Image(), { src: 'images/monster3.png' }),
  monster4: Object.assign(new Image(), { src: 'images/monster4.png' }),
};
const keys = {
  groups: {
    boost: ['g', 'G'],
    moveUp: ['e', 'E',],
    moveDown: ['d', 'D'],
    moveLeft: ['s', 'S'],
    moveRight: ['f', 'F'],
    selectBack: ['v', 'V'],
    selectNext: ['b', 'B'],
    delete: ['c', 'C'],
    r: ['r', 'R'],
    t: ['t', 'T'],
    y: ['y', 'Y'],
    u: ['u', 'U'],
    i: ['i', 'I'],
    o: ['o', 'O'],
    p: ['p', 'p'],
    z: ['z', 'Z'],
    x: ['x', 'X'],
    hpDown: ['n', 'N'],
    hpUp: ['m', 'M'],
  },
  states: {},
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
const calcLogic = {
  getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getRandomType() {
    const types = Object.keys(MNS.type);
    return types[Math.floor(Math.random() * types.length)];
  },
};
const MNS = {
  monsters: [],
  type: {
    wizardGhost: {img:1,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:0,baseY:0},
    wizardLily: {img:1,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:2,baseY:0},
    mummy: {img:2,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:0,baseY:0},
    frog: {img:2,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:1,baseY:0},
    wolf: {img:2,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:3,baseY:0},
    tanuki: {img:2,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:3,baseY:1},
    zombie: {img:3,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:3,baseY:0},
    grimReaper: {img:4,width:24,height:32,imgW:24,imgH:32,dx:0,dy:0,baseX:0,baseY:1},
    whiteKnight: {img:2,width:16,height:24,imgW:24,imgH:32,dx:4,dy:8,baseX:2,baseY:0},
  },
}
let formNum = 0;
let speed = 1;
let selected = -1;
let localData = {};




function draw() {
  // キーリスナ
  if (selected !== -1) {
    if (keys.isGroupPressed('boost')) {
      speed = 10;
    } else {
      speed = 1;
    }
    if (keys.isGroupPressed('moveUp')) {
      if (MNS.monsters[selected][2]-speed >= 16) {
        MNS.monsters[selected][2] -= speed;
        const mnsElement = document.querySelectorAll('.mns');
        const inpY = mnsElement[selected].querySelectorAll('input')[1];
        const cal = Number(inpY.value) - speed;
        inpY.value = cal;
      }
    }
    if (keys.isGroupPressed('moveRight')) {
      if (MNS.monsters[selected][1]+speed <= 928) {
        MNS.monsters[selected][1] += speed;
        const mnsElement = document.querySelectorAll('.mns');
        const inpX = mnsElement[selected].querySelectorAll('input')[0];
        const cal = Number(inpX.value) + speed;
        inpX.value = cal;
      }
    }
    if (keys.isGroupPressed('moveDown')) {
      if (MNS.monsters[selected][2]+speed <= 552) {
        MNS.monsters[selected][2] += speed;
        const mnsElement = document.querySelectorAll('.mns');
        const inpY = mnsElement[selected].querySelectorAll('input')[1];
        const cal = Number(inpY.value) + speed;
        inpY.value = cal;
      }
    }
    if (keys.isGroupPressed('moveLeft')) {
      if (MNS.monsters[selected][1]-speed >= 384) {
        MNS.monsters[selected][1] -= speed;
        const mnsElement = document.querySelectorAll('.mns');
        const inpX = mnsElement[selected].querySelectorAll('input')[0];
        const cal = Number(inpX.value) - speed;
        inpX.value = cal;
      }
    }
    if (keys.isGroupHandled('selectBack')) {
      removeSelectedClass();
      selected--;
      if (selected <= -1) {
        selected = formNum-1;
      }
      addSelectedClass();
    }
    if (keys.isGroupHandled('selectNext')) {
      removeSelectedClass();
      selected++;
      if (selected > formNum-1) {
        selected = 0;
      }
      addSelectedClass();
    }
    if (keys.isGroupHandled('delete')) {
      const selectedDelete = document.querySelectorAll('.delete-target')[selected];
      deleteThisForm(selectedDelete);
    }
    if (keys.isGroupPressed('hpDown')) {
      if (MNS.monsters[selected][3]-1 >= 1) {
        MNS.monsters[selected][3] -= 1;
        const mnsElement = document.querySelectorAll('.mns');
        const inpHp = mnsElement[selected].querySelectorAll('input')[2];
        const cal = Number(inpHp.value) - 1;
        inpHp.value = cal;
      }
    }
    if (keys.isGroupPressed('hpUp')) {
      if (MNS.monsters[selected][3]+1 <= 999) {
        MNS.monsters[selected][3] += 1;
        const mnsElement = document.querySelectorAll('.mns');
        const inpHp = mnsElement[selected].querySelectorAll('input')[2];
        const cal = Number(inpHp.value) + 1;
        inpHp.value = cal;
      }
    }
  }
    if (keys.isGroupHandled('r')) {
      addMonster(Object.keys(MNS.type)[0]);
    }
    if (keys.isGroupHandled('t')) {
      addMonster(Object.keys(MNS.type)[1]);
    }
    if (keys.isGroupHandled('y')) {
      addMonster(Object.keys(MNS.type)[2]);
    }
    if (keys.isGroupHandled('u')) {
      addMonster(Object.keys(MNS.type)[3]);
    }
    if (keys.isGroupHandled('i')) {
      addMonster(Object.keys(MNS.type)[4]);
    }
    if (keys.isGroupHandled('o')) {
      addMonster(Object.keys(MNS.type)[5]);
    }
    if (keys.isGroupHandled('p')) {
      addMonster(Object.keys(MNS.type)[6]);
    }
    if (keys.isGroupHandled('z')) {
      addMonster(Object.keys(MNS.type)[7]);
    }
    if (keys.isGroupHandled('x')) {
      addMonster(Object.keys(MNS.type)[8]);
    }

  // マップ描画
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < map.data.length; i++) {
    for (let j = 0; j < map.data[i].length; j++) {
      const index = map.data[i][j];
      let info;
      if (index === 27 || index === 24) {
        info = map.tile[map.tile[index].refe];
        ctx.drawImage(img['map'+info.src], info.sx, info.sy, info.sw, info.sh, (16*j)+(info.dx), (16*i)+(info.dy), info.dw, info.dh);
      }
      info = map.tile[index];
      ctx.drawImage(img['map'+info.src], info.sx, info.sy, info.sw, info.sh, (16*j)+(info.dx), (16*i)+(info.dy), info.dw, info.dh);
    }
  }
  // モンスター描画
  for (let i = 0; i < MNS.monsters.length; i++) {
    const monster = MNS.monsters[i];
    const type = MNS.type[monster[0]];
    const baseX = type.baseX * type.imgW * 3;
    const baseY = type.baseY * type.imgH * 4;
    ctx.drawImage(img['monster'+type.img], baseX+type.imgW, baseY+type.imgH*2, type.imgW, type.imgH, monster[1]-384-type.dx+16, monster[2]-16-type.dy+16, type.imgW, type.imgH);
    if (i === selected) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(monster[1]-384+16, monster[2]-16+16, type.width, type.height);
    }
    ctx.font = '10px Arial';
    ctx.fillStyle = 'lime';
    ctx.textAlign = "center";
    ctx.fillText(`${monster[3]}`, monster[1]-384+16+(type.width/2), monster[2]-16+16);
  }
  requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', () => {
  // keys.statesへの値セット
  Object.values(keys.groups).flat().forEach(key => {
    keys.states[key] = {
      pressed: false,
      handled: false
    };
  });
  // キーリスナー
  document.addEventListener('keydown', (e) => {
    // フォームの入力にフォーカスがある場合、キーイベントを無視
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    if (keys.states.hasOwnProperty(e.key)) {
      if (!keys.states[e.key].pressed) {
        keys.states[e.key].pressed = true;
        keys.states[e.key].handled = false;
      }
    }
  });
  document.addEventListener('keyup', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    if (keys.states.hasOwnProperty(e.key)) {
      keys.states[e.key].pressed = false;
      keys.states[e.key].handled = false;
    }
  });
  // スライダー内容読み込み
  if (localStorage.getItem('slider')) {
    slider.value = localStorage.getItem('slider');
    document.querySelector('canvas').style.width = `${slider.value}%`;
  }
  // Java側から代入された内容表示
  Object.keys(dbData).forEach(dataName => {
    const insertTarget = document.getElementsByClassName('storage-ul')[0];
    insertTarget.insertAdjacentHTML('beforeend', `<li class="storage-li"><span class="storage-dataName">${dataName}</span><span class="tap-button dbDataDelete" onclick="DataDelete(this)">削除</span><span class="tap-button dbDataLoad" onclick="DataLoad(this)">読み込み</span></li>`);
  });
  Object.keys(appData).forEach(dataName => {
    const insertTarget = document.getElementsByClassName('storage-ul')[1];
    insertTarget.insertAdjacentHTML('beforeend', `<li class="storage-li"><span class="storage-dataName">${dataName}</span><span class="tap-button appDataDelete" onclick="DataDelete(this)">削除</span><span class="tap-button appDataLoad" onclick="DataLoad(this)">読み込み</span></li>`);
  });
  Object.keys(sesData).forEach(dataName => {
    const insertTarget = document.getElementsByClassName('storage-ul')[0];
    insertTarget.insertAdjacentHTML('beforeend', `<li class="storage-li"><span class="storage-dataName">${dataName}</span><span class="tap-button sesDataDelete" onclick="DataDelete(this)">削除</span><span class="tap-button sesDataLoad" onclick="DataLoad(this)">読み込み</span></li>`);
  });
  // ローカルストレージ内容表示
  if (localStorage.getItem('setData')) {
    localData = JSON.parse(localStorage.getItem('setData'));
    const insertTarget = document.getElementsByClassName('storage-ul')[3];

    Object.keys(localData).forEach(dataName => {
      insertTarget.insertAdjacentHTML('beforeend', `<li class="storage-li"><span class="storage-dataName">${dataName}</span><span class="tap-button localDataDelete" onclick="DataDelete(this)">削除</span><span class="tap-button localDataLoad" onclick="DataLoad(this)">読み込み</span></li>`);
    });
  }
  draw();
});

const slider = document.getElementById('widthSlider');
slider.addEventListener('input', () => {
  document.querySelector('canvas').style.width = `${slider.value}%`;
  localStorage.setItem('slider', slider.value);
});

document.getElementById('mnsDataAdd').addEventListener('click', () => {
  const randomType = calcLogic.getRandomType();
  addMonster(randomType);
});

function addMonster(type, x, y, hp) {
  let X = x;
  let Y = y;
  let HP = hp;
  if (!X) {
    X = calcLogic.getRandomInRange(384, 928);
  }
  if (!Y) {
    Y = calcLogic.getRandomInRange(16, 552);
  }
  if (!HP) {
    HP = calcLogic.getRandomInRange(1, 30);
  }

  const formHtml = `
    <div class="mns mnsSelected">
      <label>
        <div class="form-group">
          <span class="formSpan formType">種類:</span>
          <select name="type" class="form-data" onchange="updateType(this)" onfocus="selectESDF(this)">
            <option value="wizardGhost" ${type === "wizardGhost" ? "selected" : ""}>wizardGhost</option>
            <option value="wizardLily" ${type === "wizardLily" ? "selected" : ""}>wizardLily</option>
            <option value="mummy" ${type === "mummy" ? "selected" : ""}>mummy</option>
            <option value="frog" ${type === "frog" ? "selected" : ""}>frog</option>
            <option value="wolf" ${type === "wolf" ? "selected" : ""}>wolf</option>
            <option value="tanuki" ${type === "tanuki" ? "selected" : ""}>tanuki</option>
            <option value="zombie" ${type === "zombie" ? "selected" : ""}>zombie</option>
            <option value="grimReaper" ${type === "grimReaper" ? "selected" : ""}>grimReaper</option>
            <option value="whiteKnight" ${type === "whiteKnight" ? "selected" : ""}>whiteKnight</option>
          </select>
        </div>
      </label>

      <label>
        <div class="form-group">
          <span class="formSpan formInput">x:</span>
          <input class="form-data" oninput="updateX(this)" onfocus="selectESDF(this)" type="number" name="x" min="384" max="928" step="1" required value="${X}">
        </div>
      </label>

      <label>
        <div class="form-group">
          <span class="formSpan formInput">y:</span>
          <input class="form-data" oninput="updateY(this)" onfocus="selectESDF(this)" type="number" name="y" min="16" max="552" step="1" required value="${Y}">
        </div>
      </label>

      <label>
        <div class="form-group" style="position: relative;">
          <span class="formSpan formInput">hp:</span>
          <input class="form-data" type="number" oninput="updateHp(this)" onfocus="selectESDF(this)" name="hp" min="1" max="999" step="1" required value="${HP}">
          </div>
      </label>

      <img class="mns-img" src="images/${type}.png" alt="${type}">


      <div class="tap-button-container">
        <span class="tap-button delete-target" onclick="deleteThisForm(this)">削除(C)</span>
        <span class="selected select-target" onclick="selectESDF(this)">selected(VB)</span>
      </div>


    </div>
  `;

  const container = document.querySelector('.mns-data');
  container.insertAdjacentHTML('beforeend', formHtml);

  formNum++;
  document.querySelector('.submit').style.visibility = 'visible';
  document.getElementById('form-guide-message').style.display = 'none';

  MNS.monsters.push([type, X, Y, HP]);

  if (selected !== -1) {
    removeSelectedClass();
  }

  selected = formNum - 1;
}

function updateType(selectElement) {
  const mnsCurrent = selectElement.closest('.mns');
  const image = mnsCurrent.querySelector('.mns-img');
  if (image) {
    const selectedType = selectElement.value;
    image.src = `images/${selectedType}.png`;
    image.alt = selectedType;
  }
  const mnsAll = document.querySelectorAll('.mns');
  const index = Array.from(mnsAll).indexOf(mnsCurrent);
  MNS.monsters[index][0] = selectElement.value;

}
function deleteThisForm(selectElement) {
  removeSelectedClass();

  const mnsCurrent = selectElement.closest('.mns');
  const mnsAll = document.querySelectorAll('.mns');
  const index = Array.from(mnsAll).indexOf(mnsCurrent);
  MNS.monsters.splice(index, 1);

  mnsCurrent.remove();
  formNum--;
  if (formNum <= 0) {
    document.querySelector('.submit').style.visibility = 'hidden';
    document.getElementById('form-guide-message').style.display = 'block';
  }

  if (formNum > 0) {
    selected = formNum-1;
    addSelectedClass();
  } else {
    selected = -1;
  }
}
function updateX(selectElement) {
  const mnsCurrent = selectElement.closest('.mns');
  const mnsAll = document.querySelectorAll('.mns');
  const index = Array.from(mnsAll).indexOf(mnsCurrent);
  MNS.monsters[index][1] = Number(selectElement.value);
}
function updateY(selectElement) {
  const mnsCurrent = selectElement.closest('.mns');
  const mnsAll = document.querySelectorAll('.mns');
  const index = Array.from(mnsAll).indexOf(mnsCurrent);
  MNS.monsters[index][2] = Number(selectElement.value);
}
function updateHp(selectElement) {
  const mnsCurrent = selectElement.closest('.mns');
  const mnsAll = document.querySelectorAll('.mns');
  const index = Array.from(mnsAll).indexOf(mnsCurrent);
  MNS.monsters[index][3] = Number(selectElement.value);
}
function selectESDF(selectElement) {
  removeSelectedClass();

  const mnsCurrent = selectElement.closest('.mns');
  const mnsAll = document.querySelectorAll('.mns');
  const index = Array.from(mnsAll).indexOf(mnsCurrent);
  selected = index;

  addSelectedClass();
}
function removeSelectedClass() {
  const oldSelected = document.querySelector('.selected');
  if (oldSelected) {
    oldSelected.classList.remove('selected');
    oldSelected.classList.add('tap-button');
    oldSelected.textContent = 'ESDFキー移動(G加速、NM→hp)';
    oldSelected.previousElementSibling.textContent = '削除';
  }

  const mnsSelected = document.querySelector('.mnsSelected');
  if (mnsSelected) {
    mnsSelected.classList.remove('mnsSelected');
  }
}
function addSelectedClass() {
  const newSelected = document.querySelectorAll('.select-target')[selected];
  newSelected.textContent = 'selected(VB)';
  newSelected.classList.remove('tap-button');
  newSelected.classList.add('selected');
  newSelected.previousElementSibling.textContent = '削除(C)';

  const mnsTarget = document.querySelectorAll('.mns')[selected];
  mnsTarget.classList.add('mnsSelected');
}

document.querySelectorAll('.submit button').forEach(button => {
  button.addEventListener('click', (event) => {
    const name = document.getElementById('name');
    if (!name.value) {
      return;
    }
    const buttonValue = event.target.value;
    switch (buttonValue) {
      case '0':
        if (!confirm(`登録？対象「データベース」`)) {
          event.preventDefault();
        }
        break;
      case '1':
        if (!confirm(`登録？対象「アプリケーションスコープ」`)) {
          event.preventDefault();
        }
        break;
      case '2':
        if (!confirm(`登録？対象「セッションスコープ」`)) {
          event.preventDefault();
        }
        break;
      case '3':
        if (!confirm(`登録？対象「リクエストスコープ」`)) {
          event.preventDefault();
        }
        break;
      case '4': // ローカルストレージ保存ボタン
        event.preventDefault();
        if (window.confirm(`登録？対象「ローカルストレージ」`)) {
          const mnsClass = document.getElementsByClassName('mns');
          const formData = [];
          for (let i = 0; i < mnsClass.length; i++) {
            const formDataClass = mnsClass[i].querySelectorAll('.form-data');
            formData.push([formDataClass[0].value, formDataClass[1].value, formDataClass[2].value, formDataClass[3].value]);
          }

          localData[name.value] = formData;
          localStorage.setItem('setData', JSON.stringify(localData));

          location.reload(true);
        }
        break;
    }
  });
});

function DataDelete(selectElement) {
  // 1つ前の兄弟要素のテキストコンテントがキー名
  const keyName = selectElement.previousElementSibling.textContent;
  if (!confirm(`削除？対象:「${keyName}」`)) {
    return;
  }
  // 所持しているクラスで分岐
  if (selectElement.classList.contains('localDataDelete')) {
    delete localData[keyName];
    localStorage.setItem('setData', JSON.stringify(localData));
    location.reload(true);
  } else {
    // ローカルストレージからの削除以外の処理
    // つまりdb、app、sesの削除リクエスト
    // fetchで非同期のpostリクエストを送る
    // responseが帰って来たらページのリロード(成否は関係ないかな)
  }
}
function DataLoad(selectElement) {
  // 2つ前の兄弟要素のテキストコンテントがキー名
  const keyName = selectElement.previousElementSibling.previousElementSibling.textContent;
  if (!confirm(`読み込み？対象:「${keyName}」`)) {
    return;
  }
  // 所持しているクラスで分岐
  let targetData = [[]];
  if (selectElement.classList.contains('dbDataLoad')) {
    targetData = dbData[keyName];
  } else if (selectElement.classList.contains('appDataLoad')) {
    targetData = appData[keyName];
  } else if (selectElement.classList.contains('sesDataLoad')) {
    targetData = sesData[keyName];
  } else if (selectElement.classList.contains('localDataLoad')) {
    targetData = localData[keyName];
  }
  // 現フォームデータ等リセット
  MNS.monsters = [];
  document.getElementsByClassName('mns-data')[0].innerHTML = '';
  document.getElementById('name').value = keyName;
  formNum = 0;
  selected = -1;
  // モンスター数分読み込む
  for (const monster of targetData) {
    addMonster(monster[0], monster[1], monster[2], monster[3]);
  }
}