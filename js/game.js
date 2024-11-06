const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const wave = {
  num : 0,
};
const battle = {
  count: 0,
  status: 0, // 0→待ち状態 1→カウント中 2→戦闘中 3→選択画面 4→カスタム戦闘中
  selectionScreen: 0,
};

const setData = {};

const map = {
  x: 0,
  y: 0,
  gateNum: 0,
  gateTime: 0,
  movable: [1, 22, 3, 4, 5, 23],
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
    [ 2,11,11,11,11,11,11,11,11, 0, 0, 0,11,11,11,11,11,11,11,11,12, 0, 0,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,25, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,25, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26,26,25,26,25,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,21,11,11,20, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,23, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,23, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,23, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18,15,15,19, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,27, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,27, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3,28, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [16,15,15,15,15,15,15,15,15, 0, 0, 0,15,15,15,15,15,15,15,15,14, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,27, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,27, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,13],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14],
  ],
};

const img = {
  attack1: Object.assign(new Image(), { src: 'images/attack1.png' }),
  attack2: Object.assign(new Image(), { src: 'images/attack2.png' }),
  aura1: Object.assign(new Image(), { src: 'images/aura1.png' }),
  character1: Object.assign(new Image(), { src: 'images/character1.png' }),
  character2: Object.assign(new Image(), { src: 'images/character2.png' }),
  character3: Object.assign(new Image(), { src: 'images/character3.png' }),
  character4: Object.assign(new Image(), { src: 'images/character4.png' }),
  character5: Object.assign(new Image(), { src: 'images/character5.png' }),
  character6: Object.assign(new Image(), { src: 'images/character6.png' }),
  character7: Object.assign(new Image(), { src: 'images/character7.png' }),
  character8: Object.assign(new Image(), { src: 'images/character8.png' }),
  character9: Object.assign(new Image(), { src: 'images/character9.png' }),
  character10: Object.assign(new Image(), { src: 'images/character10.png' }),
  character11: Object.assign(new Image(), { src: 'images/character11.png' }),
  character12: Object.assign(new Image(), { src: 'images/character12.png' }),
  character13: Object.assign(new Image(), { src: 'images/character13.png' }),
  character14: Object.assign(new Image(), { src: 'images/character14.png' }),
  character15: Object.assign(new Image(), { src: 'images/character15.png' }),
  character16: Object.assign(new Image(), { src: 'images/character16.png' }),
  character17: Object.assign(new Image(), { src: 'images/character17.png' }),
  character18: Object.assign(new Image(), { src: 'images/character18.png' }),
  character19: Object.assign(new Image(), { src: 'images/character19.png' }),
  character20: Object.assign(new Image(), { src: 'images/character20.png' }),
  character21: Object.assign(new Image(), { src: 'images/character21.png' }),
  discord1: Object.assign(new Image(), { src: 'images/discord1.png' }),
  effect1: Object.assign(new Image(), { src: 'images/effect1.png' }),
  face1: Object.assign(new Image(), { src: 'images/face1.png' }),
  map1: Object.assign(new Image(), { src: 'images/map1.png' }),
  map2: Object.assign(new Image(), { src: 'images/map2.png' }),
  map3: Object.assign(new Image(), { src: 'images/map3.png' }),
  map4: Object.assign(new Image(), { src: 'images/map4.png' }),
  monster1: Object.assign(new Image(), { src: 'images/monster1.png' }),
  monster2: Object.assign(new Image(), { src: 'images/monster2.png' }),
  monster3: Object.assign(new Image(), { src: 'images/monster3.png' }),
  monster4: Object.assign(new Image(), { src: 'images/monster4.png' }),
};

const deadZone = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const discord = {
  isViewingLinks: [false, false, false],
  select: 0,
  choices: [
    ['専用discordサーバー', 'https://discord.gg/q9qD6PAfrm', '接続、wave開始、クリアの', 'サーバーログを受け取ります'],
    ['素材サイト/白螺子屋', 'http://hi79.web.fc2.com/', '使用した素材サイトへのリンク', ''],
    ['gg紹介ページ', 'https://r77tchan.github.io/gg/', '当サイト紹介ページへのリンク', ''],
  ],
};

const settings = {
  isChangingSettings: [false, false],
  select: 0,
  flags: [
    localStorage.getItem('isDeadZoneVisible') === null ? false : JSON.parse(localStorage.getItem('isDeadZoneVisible')),
    localStorage.getItem('isBorderVisible') === null ? false : JSON.parse(localStorage.getItem('isBorderVisible')),
    localStorage.getItem('isCoordinateVisible') === null ? false : JSON.parse(localStorage.getItem('isCoordinateVisible')),
    localStorage.getItem('isHpPositionLeft') === null ? false : JSON.parse(localStorage.getItem('isHpPositionLeft')),
  ],
};

const imgPC = [
  ['勇者1', 1, 0, 0],
  ['勇者2', 1, 1, 0],
  ['勇者3', 1, 2, 0],
  ['勇者4', 1, 3, 0],
  ['勇者5', 1, 0, 1],
  ['勇者6', 1, 1, 1],
  ['勇者7', 1, 2, 1],
  ['勇者8', 1, 3, 1],
  ['一般人1', 2, 0, 0],
  ['一般人2', 2, 1, 0],
  ['一般人3', 2, 2, 0],
  ['一般人4', 2, 3, 0],
  ['一般人5', 2, 0, 1],
  ['一般人6', 2, 1, 1],
  ['一般人7', 2, 2, 1],
  ['一般人8', 2, 3, 1],
  ['一般人9', 3, 0, 0],
  ['一般人10', 3, 1, 0],
  ['一般人11', 3, 2, 0],
  ['一般人12', 3, 3, 0],
  ['一般人13', 3, 0, 1],
  ['一般人14', 3, 1, 1],
  ['一般人15', 3, 2, 1],
  ['一般人16', 3, 3, 1],
  ['一般人17', 4, 0, 0],
  ['一般人18', 4, 1, 0],
  ['一般人19', 4, 2, 0],
  ['一般人20', 4, 3, 0],
  ['一般人21', 4, 0, 1],
  ['一般人22', 4, 1, 1],
  ['一般人23', 4, 2, 1],
  ['一般人24', 4, 3, 1],
  ['一般人25', 5, 0, 0],
  ['一般人26', 5, 1, 0],
  ['一般人27', 5, 2, 0],
  ['一般人28', 5, 3, 0],
  ['一般人29', 5, 0, 1],
  ['一般人30', 5, 1, 1],
  ['一般人31', 5, 2, 1],
  ['一般人32', 5, 3, 1],
  ['一般人33', 6, 0, 0],
  ['一般人34', 6, 1, 0],
  ['一般人35', 6, 2, 0],
  ['一般人36', 6, 3, 0],
  ['一般人37', 6, 0, 1],
  ['一般人38', 6, 1, 1],
  ['一般人39', 6, 2, 1],
  ['一般人40', 6, 3, 1],
  ['一般人41', 7, 0, 0],
  ['一般人42', 7, 1, 0],
  ['一般人43', 7, 2, 0],
  ['一般人44', 7, 3, 0],
  ['一般人45', 7, 0, 1],
  ['一般人46', 7, 1, 1],
  ['一般人47', 8, 0, 0],
  ['一般人48', 8, 1, 0],
  ['一般人49', 8, 2, 0],
  ['一般人50', 8, 3, 0],
  ['一般人51', 8, 0, 1],
  ['一般人52', 8, 1, 1],
  ['戦士1', 9, 0, 0],
  ['戦士2', 9, 1, 0],
  ['戦士3', 9, 2, 0],
  ['戦士4', 9, 3, 0],
  ['戦士5', 9, 0, 1],
  ['戦士6', 9, 1, 1],
  ['戦士7', 9, 2, 1],
  ['戦士8', 9, 3, 1],
  ['戦士9', 10, 0, 0],
  ['戦士10', 10, 1, 0],
  ['戦士11', 10, 2, 0],
  ['戦士12', 10, 0, 1],
  ['戦士13', 10, 1, 1],
  ['戦士14', 11, 0, 0],
  ['戦士15', 11, 1, 0],
  ['戦士16', 11, 2, 0],
  ['戦士17', 11, 3, 0],
  ['戦士18', 11, 0, 1],
  ['戦士19', 11, 1, 1],
  ['戦士20', 12, 0, 0],
  ['戦士21', 12, 1, 0],
  ['戦士22', 12, 2, 0],
  ['戦士23', 12, 3, 0],
  ['戦士24', 12, 0, 1],
  ['戦士25', 12, 1, 1],
  ['城の人1', 13, 0, 0],
  ['城の人2', 13, 1, 0],
  ['城の人3', 13, 2, 0],
  ['城の人4', 13, 3, 0],
  ['城の人5', 13, 0, 1],
  ['城の人6', 13, 1, 1],
  ['城の人7', 13, 2, 1],
  ['城の人8', 13, 3, 1],
  ['研究員1', 14, 0, 0],
  ['研究員2', 14, 1, 0],
  ['研究員3', 14, 2, 0],
  ['研究員4', 14, 3, 0],
  ['研究員5', 14, 0, 1],
  ['研究員6', 14, 1, 1],
  ['研究員7', 14, 2, 1],
  ['研究員8', 14, 3, 1],
  ['忍者1', 15, 0, 0],
  ['忍者2', 15, 1, 0],
  ['忍者3', 15, 2, 0],
  ['忍者4', 15, 3, 0],
  ['忍者5', 15, 0, 1],
  ['忍者6', 15, 1, 1],
  ['忍者7', 15, 2, 1],
  ['忍者8', 15, 3, 1],
  ['魔法使い1', 16, 0, 0],
  ['魔法使い2', 16, 1, 0],
  ['魔法使い3', 16, 2, 0],
  ['魔法使い4', 16, 3, 0],
  ['魔法使い5', 16, 0, 1],
  ['魔法使い6', 16, 1, 1],
  ['魔法使い7', 16, 2, 1],
  ['魔法使い8', 16, 3, 1],
  ['魔法使い9', 17, 0, 0],
  ['魔法使い10', 17, 1, 0],
  ['魔法使い11', 17, 2, 0],
  ['魔法使い12', 17, 3, 0],
  ['ピラミッド1', 18, 0, 0],
  ['ピラミッド2', 18, 1, 0],
  ['ピラミッド3', 18, 2, 0],
  ['ピラミッド4', 18, 3, 0],
  ['ピラミッド5', 18, 0, 1],
  ['ピラミッド6', 18, 1, 1],
  ['氷1', 19, 0, 0],
  ['氷2', 19, 1, 0],
  ['氷3', 19, 2, 0],
  ['氷4', 19, 3, 0],
  ['氷5', 19, 0, 1],
  ['氷6', 19, 1, 1],
  ['氷7', 19, 2, 1],
  ['氷8', 19, 3, 1],
  ['海底1', 20, 0, 0],
  ['海底2', 20, 1, 0],
  ['海底3', 20, 0, 1],
  ['海底4', 20, 1, 1],
  ['海底5', 20, 2, 1],
  ['海底6', 20, 3, 1],
  ['Vital1', 21, 0, 0],
  ['Vital2', 21, 1, 0],
  ['Vital3', 21, 2, 0],
  ['Vital4', 21, 3, 0],
];

const auraImg = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [0, 1],
  [1, 1],
];

const calcLogic = {
  generateUniqueId() {
    return Date.now() + '_' + Math.random().toString(36).slice(2, 11);
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getRandomBoolean() {
    return Math.random() < 0.5;
  },
};

const MNS = {
  monsters: {},
  bullets: {},
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
  create: {
    exe() {
      for (let i = 0; i < 5+(wave.num+5)*2; i++) {
        const keys = Object.keys(MNS.type);
        const randomKey = keys[Math.floor(Math.random()*keys.length)];

        const genId = calcLogic.generateUniqueId();
        MNS.monsters[genId] = {
          id: genId,
          x: calcLogic.getRandomInt(384, 928),
          y: calcLogic.getRandomInt(16, 552),
          hp: calcLogic.getRandomInt(1, 1+(wave.num+5)*2),
          type: randomKey,
          aniSX: 1,
          aniSY: 2,
          aniTime: 0,
          cnt: calcLogic.getRandomInt(0, 1000),
          baseXAdd: 0,
        };
      }
    },
    fromSaveData() {
      // 取り出しの順序が保証されない？
      const selectedName = Object.keys(setData)[battle.selectionScreen-1];

      const monstersData = setData[selectedName];

      for (const msData of monstersData) {
        const genId = calcLogic.generateUniqueId();
        MNS.monsters[genId] = {
          id: genId,
          x: Number(msData[1]),
          y: Number(msData[2]),
          hp: Number(msData[3]),
          type: msData[0],
          aniSX: 1,
          aniSY: 2,
          aniTime: 0,
          cnt: calcLogic.getRandomInt(0, 1000),
          baseXAdd: 0,
        };
      }
    },
  },
  aiLogic: {
    moveToPlayer_horizontalFirst(monster) {
      if (monster.x < PC.px) {
        monster.x += 1;
        monster.aniSY = 1;
      } else if (monster.x > PC.px) {
        monster.x -= 1;
        monster.aniSY = 3;
      } else if (monster.y < PC.py) {
        monster.y += 1;
        monster.aniSY = 2;
      } else if (monster.y > PC.py) {
        monster.y -= 1;
        monster.aniSY = 0;
      }
      MNS.aiLogic.moveAnimation(monster);
    },
    moveToPlayer_verticalFirst(monster) {
      if (monster.y < PC.py) {
        monster.y += 1;
        monster.aniSY = 2;
      } else if (monster.y > PC.py) {
        monster.y -= 1;
        monster.aniSY = 0;
      } else if (monster.x < PC.px) {
        monster.x += 1;
        monster.aniSY = 1;
      } else if (monster.x > PC.px) {
        monster.x -= 1;
        monster.aniSY = 3;
      }
      MNS.aiLogic.moveAnimation(monster);
    },
    moveToPlayer_dualAxis(monster) {
      if (monster.y < PC.py) {
        monster.y += 1;
        monster.aniSY = 2;
      } else if (monster.y > PC.py) {
        monster.y -= 1;
        monster.aniSY = 0;
      }
      if (monster.x < PC.px) {
        monster.x += 1;
        monster.aniSY = 1;
      } else if (monster.x > PC.px) {
        monster.x -= 1;
        monster.aniSY = 3;
      }
      MNS.aiLogic.moveAnimation(monster);
    },
    moveAnimation(monster) {
      monster.aniTime++;
      if (monster.aniTime > 10) {
        monster.aniSX = monster.aniSX === 0 ? 2 : 0;
        monster.aniTime = 0;
      }
    },
    zombie(monster) {
      if (calcLogic.getRandomBoolean()) {
        monster.cnt++;
        if (monster.cnt > 1000) {
          monster.cnt = 0;
        } else if (monster.cnt % 100 > 70) {
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        } else if (monster.cnt % 100 > 40) {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        } else {
          monster.aniSX = 1;
        }
      }
    },
    mummy(monster) {
      monster.cnt++;
      if (monster.cnt % 2 === 0) {
        if (monster.cnt > 2000) {
          monster.cnt = 0;
        } else if (monster.cnt > 1700) {
          if (monster.cnt % 100 >= 50) {
            MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
            MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
            MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
            MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
          } else {
            MNS.aiLogic.moveToPlayer_verticalFirst(monster);
            MNS.aiLogic.moveToPlayer_verticalFirst(monster);
            MNS.aiLogic.moveToPlayer_verticalFirst(monster);
            MNS.aiLogic.moveToPlayer_verticalFirst(monster);
          }
        } else if (monster.cnt > 50) {
          if (monster.cnt % 100 >= 50) {
            MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
          } else {
            MNS.aiLogic.moveToPlayer_verticalFirst(monster);
          }
        } else {
          monster.aniSX = 1;
        }
      }
    },
    wolf(monster) {
      monster.cnt++;
      if (monster.cnt > 1000) {
        monster.cnt = 0;
      } else if (monster.cnt > 200) {
        if (monster.cnt % 90 > 60) {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        } else if (monster.cnt % 90 > 30) {
          MNS.aiLogic.moveToPlayer_dualAxis(monster);
        } else {
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        }
      } else {
        monster.aniSX = 1;
      }
    },
    tanuki(monster) {
      monster.cnt++;
      if (monster.cnt > 1000) {
        monster.cnt = 0;
      } else if (monster.cnt > 400) {
        if (monster.cnt % 100 > 50) {
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        } else {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        }
      } else {
        monster.aniSX = 1;
      }
    },
    frog(monster) {
      monster.cnt++;
      if (monster.cnt > 1000) {
        monster.cnt = 0;
      } else if (monster.cnt % 300 === 0) {
        for (let i = 0; i < 64; i++) {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        }
      } else if (monster.cnt % 300 > 200) {
        if (calcLogic.getRandomBoolean()) {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        } else {
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        }
      } else if (monster.cnt % 300 > 150) {
        MNS.aiLogic.moveToPlayer_verticalFirst(monster);
      } else if (monster.cnt % 300 > 100) {
        MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
      } else {
        monster.aniSX = 1;
      }
    },
    grimReaper(monster) {
      monster.cnt++;
      if (monster.cnt > 1000) {
        monster.cnt = 0;
      } else if (monster.cnt > 100) {
        MNS.aiLogic.moveToPlayer_dualAxis(monster);
      } else {
        monster.aniSX = 1;
      }
    },
    wizardGhost(monster) {
      monster.cnt++;
      if (monster.cnt % 2 === 0) {
        if (monster.cnt > 1000) {
          monster.cnt = 0;
        } else if (monster.cnt % 100 <= 1) {
          monster.baseXAdd = 0;
          const genId = calcLogic.generateUniqueId();
          MNS.bullets[genId] = {
            id: genId,
            x: monster.x,
            y: monster.y,
            img: 2,
            baseX: 2,
            baseY: 0,
            aniTime: 0,
            aniNum: 0,
            width: (monster.aniSY === 0 || monster.aniSY === 2) ? 16 : 24,
            height: (monster.aniSY === 0 || monster.aniSY === 2) ? 24 : 16,
            dx: (monster.aniSY === 0 || monster.aniSY === 2) ? 4 : 0,
            dy: (monster.aniSY === 0 || monster.aniSY === 2) ? 8 : 16,
            dir: monster.aniSY,
            speed: 2,
          };
        } else if (monster.cnt % 100 > 75) {
          monster.baseXAdd = 1;
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        } else if (monster.cnt % 100 > 50) {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        } else if (monster.cnt % 100 > 25) {
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        } else {
          monster.aniSX = 1;
        }
      }
    },
    wizardLily(monster) {
      monster.cnt++;
      if (monster.cnt % 2 === 0) {
        if (monster.cnt > 1000) {
          monster.cnt = 0;
        } else if (monster.cnt % 100 <= 1) {
          monster.baseXAdd = 0;
          const genId = calcLogic.generateUniqueId();
          MNS.bullets[genId] = {
            id: genId,
            x: monster.x,
            y: monster.y,
            img: 2,
            baseX: 2,
            baseY: 0,
            aniTime: 0,
            aniNum: 0,
            width: (monster.aniSY === 0 || monster.aniSY === 2) ? 16 : 24,
            height: (monster.aniSY === 0 || monster.aniSY === 2) ? 24 : 16,
            dx: (monster.aniSY === 0 || monster.aniSY === 2) ? 4 : 0,
            dy: (monster.aniSY === 0 || monster.aniSY === 2) ? 8 : 16,
            dir: monster.aniSY,
            speed: 2,
          };
        } else if (monster.cnt % 100 > 75) {
          monster.baseXAdd = 1;
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        } else if (monster.cnt % 100 > 50) {
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        } else if (monster.cnt % 100 > 25) {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        } else {
          monster.aniSX = 1;
        }
      }
    },
    whiteKnight(monster) {
      monster.cnt++;
      if (monster.hp < 20) {
        if (monster.cnt % 100 >= 50) {
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
          MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
        } else {
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
          MNS.aiLogic.moveToPlayer_verticalFirst(monster);
        }
      } else {
        if (monster.cnt % 2 === 0) {
          if (monster.cnt > 100) {
            monster.cnt = 0;
          } else if (monster.cnt % 100 >= 50) {
            MNS.aiLogic.moveToPlayer_horizontalFirst(monster);
          } else {
            MNS.aiLogic.moveToPlayer_verticalFirst(monster);
          }
        }
      }
    },
  },
};

const PC = {
  id: 0,
  px: (21*16)/2-8, // 初期座標設定。左上が起点だが、表示は中心にしたいのでサイズの半分引いているが、そもそも初期位置は好きに決めていいのでさほど重要ではない。一応これは、16ピクセルのブロックが上下に21あって、その中心。
  py: (21*16)/2-12,
  dx: 0,
  dy: 0,
  direction: 'down',
  speed: 1,
  width: 16,
  height: 24,
  auraNum: 0,
  auraTime: 0,
  aniSX: 0,
  aniSY: 0,
  aniTime: 0,
  // attack: 3,
  hp: 200,
  img: localStorage.getItem('img') === null ? 0 : Number(localStorage.getItem('img')),
  isChangingCharacter: [false, false],
  auraImg: localStorage.getItem('auraImg') === null ? 1 : Number(localStorage.getItem('auraImg')),
  isChangingAura: [false, false],
  attacks: {},
  noInput() {

  },
  pressInput(input) {
    switch (input) {
      case 'boost': {
        this.speed = 2;
        this.auraTime = (this.auraTime + 1) % 11; // 0~10循環
        if (this.auraTime === 0) {
          this.auraNum = (this.auraNum + 1) % 3; // 0~2循環
        }
        break;
      }
      case 'moveUp': {
        const nextY = Math.floor((this.py-this.speed) / 16);
        const nowX1 = Math.floor((this.px) / 16);
        const nowX2 = Math.floor((this.px+this.width-1) / 16); // 起点が0なのでwidth-1
        if (map.movable.includes(map.data[nextY][nowX1]) && map.movable.includes(map.data[nextY][nowX2])) {
          if (deadZone.y < this.dy-this.speed) {
            this.dy -= this.speed;
          } else {
            map.y += this.speed;
          }
          this.py -= this.speed;
        }
        this.aniSY = 0;
        this.direction = 'up';
        break;
      }
      case 'moveRight': {
        const nextX = Math.floor((this.px+this.speed+this.width-1) / 16);
        const nowY1 = Math.floor((this.py) / 16);
        const nowY2 = Math.floor((this.py+this.height-1) / 16);
        const nowY3 = Math.floor((this.py+(this.height/2)) / 16); // プレイヤー高さ24、マップ高さ16なので、第三の判定としてYの中央（ないと真ん中すり抜ける）
        if (map.movable.includes(map.data[nowY1][nextX]) && map.movable.includes(map.data[nowY2][nextX]) && map.movable.includes(map.data[nowY3][nextX])) {
          if (deadZone.x+deadZone.width > this.dx+this.speed+this.width) {
            this.dx += this.speed;
          } else {
            map.x -= this.speed;
          }
          this.px += this.speed;
        }
        this.aniSY = 1;
        this.direction = 'right';
        break;
      }
      case 'moveDown': {
        const nextY = Math.floor((this.py+this.speed+this.height-1) / 16);
        const nowX1 = Math.floor((this.px) / 16);
        const nowX2 = Math.floor((this.px+this.width-1) / 16);
        if (map.movable.includes(map.data[nextY][nowX1]) && map.movable.includes(map.data[nextY][nowX2])) {
          if (deadZone.y+deadZone.height > this.dy+this.speed+this.height) {
            this.dy += this.speed;
          } else {
            map.y -= this.speed;
          }
          this.py += this.speed;
        }
          this.aniSY = 2;
          this.direction = 'down';
          break;
      }
      case 'moveLeft': {
        const nextX = Math.floor((this.px-this.speed) / 16);
        const nowY1 = Math.floor((this.py) / 16);
        const nowY2 = Math.floor((this.py+this.height-1) / 16);
        const nowY3 = Math.floor((this.py+(this.height/2)) / 16);
        if (map.movable.includes(map.data[nowY1][nextX]) && map.movable.includes(map.data[nowY2][nextX]) && map.movable.includes(map.data[nowY3][nextX])) {
          if (deadZone.x < this.dx-this.speed) {
            this.dx -= this.speed;
          } else {
            map.x += this.speed;
          }
          this.px -= this.speed;
        }
        this.aniSY = 3;
        this.direction = 'left';
        break;
      }
      case 'attack': {

        break;
      }
    }
  },
  handleInput(input) {
    switch (input) {
      case 'attack' : {
        // if (this.attack <= 0) {
        //   return;
        // }
        const genId = calcLogic.generateUniqueId();
        PC.attacks[genId] = {
          id: genId,
          dir: PC.direction,
          x: PC.px,
          y: PC.py+4, // プレイヤー高さ24、攻撃オブジェ高さ16なので、+4で中心スタートになる
          distance: 0,
          sy: 0,
        };
        break;
      }
    }
  },
  moving() {
    this.aniTime++;
    // 右足左足、切り替え
    if (this.aniTime > 10) {
      this.aniSX = this.aniSX === 0 ? 2 : 0;
      this.aniTime = 0;
    }
    PC.isChangingCharacter[1] = true;
    PC.isChangingAura[1] = true;
    settings.isChangingSettings[1] = true;
    discord.isViewingLinks[1] = true;
  },
  stopping() {
    switch (this.direction) {
      case 'up':
        this.aniSX = 1;
        this.aniSY = 0;
        break;
      case 'right':
        this.aniSX = 1;
        this.aniSY = 1;
        break;
      case 'down':
        this.aniSX = 1;
        this.aniSY = 2;
        break;
      case 'left':
        this.aniSX = 1;
        this.aniSY = 3;
        break;
    }
  },
  acceptingNormalInput() {
    // 通常キー入力
    if (!Object.keys(keys.groups).some(key => keys.isGroupPressed(key))) {
      PC.noInput();
      PC.stopping();
    } else {
      Object.keys(keys.groups).forEach((key) => { // 押されてるキー数分、各引数で関数呼び出し
        if (keys.isGroupPressed(key)) {
          PC.pressInput(key);
        }
        if (keys.isGroupHandled(key)) {
          PC.handleInput(key);
        }
      });
      if (['moveUp', 'moveRight', 'moveDown', 'moveLeft'].some(tmp => keys.isGroupPressed(tmp))) { // 4つのうちいずれか押されてる
        PC.moving();
      } else {
        PC.stopping();
      }
      // いずれか押されている場合にサーバーへ現在情報（上での更新後）送信
      // const transData = {
      //   id: PC.id,
      //   x: PC.px,
      //   y: PC.py,
      //   aniSX: PC.aniSX,
      //   aniSY: PC.aniSY,
      //   auraNum: PC.speed === 2 ? PC.auraNum : -1,
      //   img: PC.img,
      //   auraImg: PC.auraImg,
      // }
      // socket.emit('player_update', transData);
    }
  },
  acceptingCharacterChangeInput() {
     // キャラクター変更画面キー入力
     Object.keys(keys.groups).forEach((key) => {
      if (keys.isGroupHandled(key)) {
        switch (key) {
          case 'moveRight':
            if (PC.img < imgPC.length-1) {
              PC.img++;
            }
            break;
          case 'moveLeft':
            if (PC.img > 0) {
              PC.img--;
            }
            break;
          case 'attack':
            PC.isChangingCharacter[0] = false; // 特定のキーでフラグ変更
            PC.isChangingCharacter[1] = false; // movingのときにtrueにしてる
            localStorage.setItem('img', PC.img);
            break;
          case 'boost':
            PC.img = Math.floor(Math.random() * 145);
            break;
        }
      }
    });
  },
  acceptingAuraChangeInput() {
     // オーラ変更画面キー入力
     Object.keys(keys.groups).forEach((key) => {
      if (keys.isGroupHandled(key)) {
        switch (key) {
          case 'moveRight':
            if (PC.auraImg < auraImg.length-1) {
              PC.auraImg++;
            }
            break;
          case 'moveLeft':
            if (PC.auraImg > 0) {
              PC.auraImg--;
            }
            break;
          case 'attack':
            PC.isChangingAura[0] = false;
            PC.isChangingAura[1] = false;
            localStorage.setItem('auraImg', PC.auraImg);
            break;
        }
      }
    });
  },
  acceptingSettingChangeInput() {
    // 設定変更画面キー入力
    Object.keys(keys.groups).forEach((key) => {
      if (keys.isGroupHandled(key)) {
        switch (key) {
          case 'moveDown':
            if (settings.select < settings.flags.length-1) {
              settings.select++;
            }
            break;
          case 'moveUp':
            if (settings.select > 0) {
              settings.select--;
            }
            break;
          case 'attack':
            settings.isChangingSettings[0] = false;
            settings.isChangingSettings[1] = false;
            settings.flags[settings.select] = !settings.flags[settings.select];
            localStorage.setItem('isDeadZoneVisible', JSON.stringify(settings.flags[0]));
            localStorage.setItem('isBorderVisible', JSON.stringify(settings.flags[1]));
            localStorage.setItem('isCoordinateVisible', JSON.stringify(settings.flags[2]));
            localStorage.setItem('isHpPositionLeft', JSON.stringify(settings.flags[3]));
            break;
        }
      }
    });
  },
  acceptingViewingLinksInput() {
    // リンク画面キー入力
    Object.keys(keys.groups).forEach((key) => {
      if (keys.isGroupHandled(key)) {
        switch (key) {
          case 'moveDown':
            if (discord.select < discord.choices.length-1) {
              discord.select++;
            }
            break;
          case 'moveUp':
            if (discord.select > 0) {
              discord.select--;
            }
            break;
          case 'attack':
            discord.isViewingLinks[2] = true;
            break;
          case 'boost':
            discord.isViewingLinks[0] = false;
            discord.isViewingLinks[1] = false;
            break;
        }
      }
    });
  },
  acceptingViewingLinksInput_confirm() {
    // リンク確認画面キー入力
    Object.keys(keys.groups).forEach((key) => {
      if (keys.isGroupHandled(key)) {
        switch (key) {
          case 'attack':
            discord.isViewingLinks[0] = false;
            discord.isViewingLinks[1] = false;
            discord.isViewingLinks[2] = false;
            window.open(discord.choices[discord.select][1], '_blank')
            break;
          case 'boost':
            discord.isViewingLinks[0] = false;
            discord.isViewingLinks[1] = false;
            discord.isViewingLinks[2] = false;
            break;
        }
      }
    });
  },
  acceptingBattleSelect() {
    // 戦闘(バトル)選択画面キー入力
    Object.keys(keys.groups).forEach((key) => {
      if (keys.isGroupHandled(key)) {
        switch (key) {
          case 'attack':
            if (battle.selectionScreen === 0) {
              serverLogic.start_battle_countdown(); // デフォルトのwave制カウントダウン開始
            } else {
              serverLogic.init_battle_custom(); // カスタム戦闘開始
            }
            break;
          case 'boost':
            battle.status = 0;
            break;
          case 'moveUp':
            if (battle.selectionScreen-1 >= 0) {
              battle.selectionScreen--;
            }
            break;
          case 'moveDown':
            if (battle.selectionScreen+1 <= Object.keys(setData).length) {
              battle.selectionScreen++;
            }
            break;
        }
      }
    });
  },
  updatePC() {
    if (PC.isChangingCharacter[0] && PC.isChangingCharacter[1]) {
      // キャラクター変更画面キー入力
      PC.acceptingCharacterChangeInput();
    } else if (PC.isChangingAura[0] && PC.isChangingAura[1]) {
      // オーラ変更画面キー入力
      PC.acceptingAuraChangeInput();
    } else if (settings.isChangingSettings[0] && settings.isChangingSettings[1]) {
      // 設定変更画面キー入力
      PC.acceptingSettingChangeInput();
    } else if (discord.isViewingLinks[2]) {
      // リンク確認画面キー入力
      PC.acceptingViewingLinksInput_confirm();
    } else if (discord.isViewingLinks[0] && discord.isViewingLinks[1]) {
      // リンク画面キー入力
      PC.acceptingViewingLinksInput();
    } else if (battle.status === 3) {
      // 戦闘(バトル)選択画面キー入力
      PC.acceptingBattleSelect();
    } else {
      // 通常キー入力
      PC.acceptingNormalInput();
      // 特定の座標についたらフラグ変更
      if (PC.px === 224 && PC.py === 24 && PC.isChangingCharacter[1]) {
        PC.isChangingCharacter[0] = true;
        PC.stopping();
      } else if (PC.px === 224 && PC.py === 24+32 && PC.isChangingAura[1]) {
        PC.isChangingAura[0] = true;
        PC.stopping();
      } else if (PC.px === 304 && PC.py === 112 && settings.isChangingSettings[1]) {
        settings.isChangingSettings[0] = true;
        PC.stopping();
      } else if (PC.px === 272 && PC.py === 112 && discord.isViewingLinks[1]) {
        discord.isViewingLinks[0] = true;
        PC.stopping();
      }
    }
  },
}






const keys = {
  groups: {
    boost: ['h', 'g', 'boostButton', 'H', 'G'],
    moveUp: ['ArrowUp', 'e', 'i', 'upButton', 'E', 'I'],
    moveDown: ['ArrowDown', 'd', 'k', 'downButton', 'D', 'K'],
    moveLeft: ['ArrowLeft', 's', 'j', 'leftButton', 'S', 'J'],
    moveRight: ['ArrowRight', 'f', 'l', 'rightButton', 'F', 'L'],
    attack: ['n', 'v', 'b', 'attackButton', 'N', 'V', 'B'],
  },
  states: {},
  addTouchListeners(buttonId, groupKey) {
    const button = document.getElementById(buttonId); // タッチ用リスナ
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
  keys.addTouchListeners('boostButton', 'boost');
  keys.addTouchListeners('upButton', 'moveUp');
  keys.addTouchListeners('rightButton', 'moveRight');
  keys.addTouchListeners('downButton', 'moveDown');
  keys.addTouchListeners('leftButton', 'moveLeft');
  keys.addTouchListeners('attackButton', 'attack');
  // リサイズイベントに応じてキャンバスのサイズを変更
  window.addEventListener('resize', logic.resizeCanvas);

  // ローカルストレージ内容読み込み
  if (localStorage.getItem('setData')) {
    const localStorageData = JSON.parse(localStorage.getItem('setData'));
    Object.keys(localStorageData).forEach(dataName => {
      setData[dataName] = localStorageData[dataName];
    });
  }

  logic.init();
});

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

    PC.updatePC();

    serverLogic.check_player_attack_object();
    serverLogic.inBattle();




  },
  draw() {
    // クリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // マップ背景描画
    const obj1 = [];
    const obj2 = [];
    for (let i = 0; i < map.data.length; i++) {
      for (let j = 0; j < map.data[i].length; j++) {
        const index = map.data[i][j];
        if (index !== 0) {
          let info;
          if ([22,25,26,24].includes(index)) { // 後から描画するオブジェクト
            obj1.push({index:index, dx:(16*j), dy:(16*i)});
            info = map.tile[map.tile[index].refe]; // 参照先情報(下タイル)
          } else if ([27,28].includes(index)) { // プレイヤーの後に描画するオブジェクト(2マスだけど判定は下だけ)
            obj2.push({index:index, dx:(16*j), dy:(16*i)});
            info = map.tile[map.tile[index].refe];
          } else {
            info = map.tile[index];
          }
          ctx.drawImage(img['map'+info.src]/*画像名*/, info.sx, info.sy, info.sw, info.sh, (16*j)+(info.dx)+(map.x), (16*i)+(info.dy)+(map.y), info.dw, info.dh);
        }
      }
    }
    // マップオブジェクト描画
    for (let i = 0; i < obj1.length; i++) {
      const info = {...map.tile[obj1[i].index]}; // アドレスではなく実体をコピー（下で更新するので）
      info.sy = info.type === 2 ? info.sy * map.gateNum : info.sy; // type2ならsy更新（アニメーション）
      ctx.drawImage(img['map'+info.src]/*画像名*/, info.sx, info.sy, info.sw, info.sh, (obj1[i].dx)+(info.dx)+(map.x), (obj1[i].dy)+(info.dy)+(map.y), info.dw, info.dh);
    }
    // マップ内文字
    ctx.font = '10px Arial';
    if (battle.status === 0) {
      ctx.fillStyle = 'red';
      ctx.fillText('↑攻撃してゲーム開始', map.x+620, map.y+320);
    } else if (battle.status === 1) {
      ctx.fillStyle = 'blue';
      ctx.fillText('↑攻撃して時間短縮', map.x+620, map.y+320);
    }


    // モンスター描画、処理
    Object.keys(MNS.monsters).forEach(monsterId => {
      const monster = MNS.monsters[monsterId];
      ctx.drawImage(img[`monster${MNS.type[monster.type].img}`], MNS.type[monster.type].imgW*monster.aniSX+(MNS.type[monster.type].baseX+monster.baseXAdd)*MNS.type[monster.type].imgW*3, MNS.type[monster.type].imgH*monster.aniSY+MNS.type[monster.type].baseY*MNS.type[monster.type].imgH*4, MNS.type[monster.type].imgW, MNS.type[monster.type].imgH, (monster.x-MNS.type[monster.type].dx)+(map.x), (monster.y-MNS.type[monster.type].dy)+(map.y), MNS.type[monster.type].imgW, MNS.type[monster.type].imgH);
      // 枠線描画
      if (settings.flags[1]) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 0.1;
        ctx.strokeRect((monster.x)+(map.x), (monster.y)+(map.y), MNS.type[monster.type].width, MNS.type[monster.type].height);
      }
      // hp表示
      ctx.font = '10px Arial';
      ctx.fillStyle = 'red';
      ctx.textAlign = "center";    // 水平方向の中央
      ctx.textBaseline = "middle"; // 垂直方向の中央
      ctx.fillText(`${monster.hp}`, (monster.x)+(map.x)+(MNS.type[monster.type].width/2), (monster.y)+(map.y));
    });


    // NPC描画
    ctx.drawImage(img.character14, (24*1), (32*3), 24, 32, (map.x)+256-4, (map.y)+24-8, 24, 32);
    ctx.drawImage(img.character14, (24*1), (32*3)+(32*4), 24, 32, (map.x)+256-4, (map.y)+24+32-8, 24, 32);
    ctx.drawImage(img.character14, (24*1)+(24*3*3), (32*2)+(32*4), 24, 32, (map.x)+256+48-4, (map.y)+24+48-8, 24, 32);
    ctx.drawImage(img.discord1, 0, 0, 16, 16, (map.x)+272, (map.y)+80, 16, 16);







    // 自プレイヤーオーラ描画
    if (PC.speed === 2) {
      ctx.drawImage(img.aura1, (24*3*auraImg[PC.auraImg][0])+(PC.auraNum*24), (128*auraImg[PC.auraImg][1]), 24, 128, PC.dx-4, PC.dy-8-64, 24, 128); // プレイヤー16,24、オーラ24,32の共にサイズ8px差なので4pxマイナスすれば中央になる、でも縦は気分で変えていい
    }
    PC.speed = 1;
    // 自プレイヤー描画
    ctx.drawImage(img['character'+imgPC[PC.img][1]], (PC.aniSX*24)+(imgPC[PC.img][2]*24*3), (PC.aniSY*32)+(imgPC[PC.img][3]*32*4), 24, 32, PC.dx-4, PC.dy-8, 24, 32); // character1.pngは24*32ずつで並んでいるのでこのサイズで切り取っているが、画像の左4px、右8pxは余分なので、描画はx-4、y-8の位置から開始する（結果プレイヤーサイズは16*24だが、余白分、例えば髪の毛が上にはみ出ても描画はされてる。お得。）



    // 2マスだけど判定は下だけオブジェクト描画(ガーゴイル)
    for (let i = 0; i < obj2.length; i++) {
      const info = {...map.tile[obj2[i].index]};
      ctx.drawImage(img['map'+info.src]/*画像名*/, info.sx, info.sy, info.sw, info.sh, (obj2[i].dx)+(info.dx)+(map.x), (obj2[i].dy)+(info.dy)+(map.y), info.dw, info.dh);
    }


    // 敵の弾描画、枠線も
    Object.keys(MNS.bullets).forEach(bulletId => {
      const bullet = MNS.bullets[bulletId];
      ctx.drawImage(img['attack'+bullet.img], (24*bullet.aniNum)+(bullet.baseX*24*3), (32*bullet.dir)+(bullet.baseY*32*4), 24, 32, (map.x)+(bullet.x-bullet.dx), (map.y)+(bullet.y-bullet.dy), 24, 32);
      if (settings.flags[1]) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 0.1;
        ctx.strokeRect((bullet.x)+(map.x), (bullet.y)+(map.y), bullet.width, bullet.height);
      }
    });



    // 攻撃オブフェクト描画
    Object.keys(PC.attacks).forEach(attackId => {
      const attack = PC.attacks[attackId];
      ctx.drawImage(img.attack1, 24*9, 32*attack.sy, 24, 32, (attack.x-4/*余白分*/)+(map.x), (attack.y-16/*余白分*/)+(map.y), 24, 32); // 切り取りサイズは24*32、実サイズは16*16
      if (settings.flags[1]) { // 枠線表示設定
        ctx.strokeStyle = 'lime';
        ctx.lineWidth = 0.1;
        ctx.strokeRect((attack.x)+(map.x), (attack.y)+(map.y), 16, 16);
      }
    });

    // プレイヤーの攻撃爆破エフェクト
    for (let i = 0; i < explosion1.length; i++) {
      explosion1[i].time++;
      if (explosion1[i].time > 20) {
        explosion1.splice(i, 1);
        i--;
        continue;
      } else if (explosion1[i].time > 15) {
        explosion1[i].sy = 7;
      } else if (explosion1[i].time > 10) {
        explosion1[i].sy = 4;
      } else if (explosion1[i].time > 5) {
        explosion1[i].sy = 5;
      }
      ctx.drawImage(img.effect1, 0, 32*explosion1[i].sy, 72, 32, (explosion1[i].x-28)+(map.x), (explosion1[i].y-12)+(map.y), 72, 32);
    }






  },
  debug: {
    exe() {
      logic.debug.outside_pc();
      logic.debug.outside_char();
      // logic.debug.center_line();
      if (settings.flags[0]) {
        logic.debug.display_deadZone();
      }
      if (settings.flags[1]) {
        logic.debug.draw_border();
      }
      logic.debug.announce();
      if (settings.flags[2]) {
        logic.debug.coordinate_display();
      }
      if (settings.flags[3]) {
        logic.debug.display_hp_left();
      } else {
        logic.debug.display_hp_on();
      }
      if (PC.isChangingCharacter[0]) {
        logic.debug.pc_changeWindow();
      } else if (PC.isChangingAura[0]) {
        logic.debug.aura_changeWindow();
      } else if (settings.isChangingSettings[0]) {
        logic.debug.settings_changeWindow();
      } else if (discord.isViewingLinks[2]) {
        logic.debug.discord_linkWindow_confirm();
      } else if (discord.isViewingLinks[0]) {
        logic.debug.discord_linkWindow();
      } else if (battle.status === 3) {
        logic.debug.battle_selectWindow();
      }
    },
    outside_pc() {
      // キャラ顔画像
      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
      ctx.drawImage(img.face1, 0, 0, 48, 48, (map.x), (map.y-100), 48, 48);
      ctx.font = '14px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText('↓素材(http://hi79.web.fc2.com/)', map.x+20, map.y-110);
      ctx.font = '10px Arial';
      ctx.fillText('(白螺子屋/二次利用不可)', map.x+220, map.y-110);
    },
    outside_char() {
      // マップ外文字
      ctx.font = '50px Arial';
      ctx.fillStyle = 'yellow';
      ctx.fillText('gg.mh4.jp', map.x+60, map.y-60);
      ctx.font = '30px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText('『Ctrl』 + 『+』で拡大推奨', map.x-10, map.y-10);
      ctx.fillText('移動→ESDF、IJKL、矢印', map.x-20, map.y+map.tile.length*16-110);
      ctx.fillText('加速→G、H', map.x-20, map.y+map.tile.length*16-70);
      ctx.fillText('攻撃→V、B、N', map.x-20, map.y+map.tile.length*16-30);
    },
    center_line() {
      // 中心線描画
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 0.4;
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
    display_deadZone() {
      // デッドゾーン描画
      ctx.strokeStyle = 'pink';
      ctx.lineWidth = 0.1;
      ctx.strokeRect(deadZone.x, deadZone.y, deadZone.width, deadZone.height);
    },
    draw_border() {
      // プレイヤー枠線描画
      ctx.strokeStyle = 'lime';
      ctx.lineWidth = 0.1;
      ctx.strokeRect(PC.dx, PC.dy, PC.width, PC.height);

    },
    announce() {
      // アナウンス
      for (let i = 0; i < announce.length; i++) {
        ctx.font = '30px Arial';
        ctx.fillStyle = announce[i][2];
        ctx.textAlign = "center";    // 水平方向の中央
        ctx.textBaseline = "middle"; // 垂直方向の中央
        ctx.fillText(`${announce[i][0]}`, canvas.width/2, canvas.height/2-(announce.length-1)*40+i*40);
        announce[i][1]--;
        if (announce[i][1] <= 0) {
          announce.splice(i, 1);
          i--;
        }
      }
      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
    coordinate_display() {
      // 座標表示
      ctx.font = '10px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText(`px:${PC.px}/16=${Math.floor(PC.px / 16)}`, 0, 10);
      ctx.fillText(`py:${PC.py}/16=${Math.floor(PC.py / 16)}`, 0, 20);

      ctx.fillText(`px:${PC.px}+7.5=${Math.floor(PC.px + 7.5)}(+0.5)`, 0, 40);
      ctx.fillText(`py:${PC.py}+11.5=${Math.floor(PC.py + 11.5)}(+0.5)`, 0, 50);

      ctx.fillText(`px:${PC.px}+15=${Math.floor(PC.px + 15)}`, 0, 70);
      ctx.fillText(`py:${PC.py}+23=${Math.floor(PC.py + 23)}`, 0, 80);

      ctx.fillText(`dx:${PC.dx}`, 0, 100);
      ctx.fillText(`dy:${PC.dy}`, 0, 110);
      ctx.fillText(`mx:${map.x}`, 0, 130);
      ctx.fillText(`my:${map.y}`, 0, 140);
    },
    display_hp_left() {
      ctx.font = '10px Arial';
      ctx.fillStyle = 'lime';
      if (settings.flags[2]) {
        ctx.fillText(`hp:${PC.hp}`, 0, 160);
      } else {
        ctx.fillText(`hp:${PC.hp}`, 0, 10);
      }
    },
    display_hp_on() {
      // 自分hp表示
      ctx.font = '10px Arial';
      ctx.fillStyle = 'lime';
      ctx.textAlign = "center";    // 水平方向の中央
      ctx.textBaseline = "middle"; // 垂直方向の中央
      ctx.fillText(`${PC.hp}`, (PC.px)+(map.x)+(PC.width/2), (PC.py)+(map.y));
      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
    pc_changeWindow() {
      // キャラ画像変更ウィンドウ
      ctx.fillStyle = 'rgb(255,255,255,0.9)';
      ctx.fillRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-24)/2, (canvas.height-32)/2, 24, 32);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'lightsalmon';
      ctx.fillText(`${imgPC[PC.img][0]}(${PC.img+1}/${imgPC.length})`, canvas.width/2, canvas.height/2-30);
      for (let i = -3; i <= 3; i++) {
        if (PC.img+i >= 0 && PC.img+i < imgPC.length) {
          const shiftX = i * 48;
          ctx.drawImage(img['character'+imgPC[PC.img+i][1]], (24*1)+(imgPC[PC.img+i][2]*24*3), (32*2)+(imgPC[PC.img+i][3]*32*4), 24, 32, (canvas.width-24+shiftX)/2, (canvas.height-32-4)/2, 24, 32);
        }
      }
      ctx.fillStyle = 'black';
      ctx.fillText('キャラクター変更', canvas.width/2, canvas.height/2-55);
      ctx.font = '16px Arial';
      ctx.fillText('左右移動→選択', canvas.width/2, canvas.height/2+30);
      ctx.fillText('加速→ランダム選択', canvas.width/2, canvas.height/2+48);
      ctx.fillText('攻撃→変更&終了', canvas.width/2, canvas.height/2+66);
      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
    aura_changeWindow() {
      // オーラ変更ウィンドウ
      PC.auraTime = (PC.auraTime + 1) % 11; // 0~10循環
      if (PC.auraTime === 0) {
        PC.auraNum = (PC.auraNum + 1) % 3; // 0~2循環
      }

      ctx.fillStyle = 'rgb(255,255,255,0.9)';
      ctx.fillRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);
      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-24)/2, (canvas.height-32)/2, 24, 32);

      for (let i = -3; i <= 3; i++) {
        if (PC.auraImg+i >= 0 && PC.auraImg+i < auraImg.length) {
          const shiftX = i * 48;
          ctx.drawImage(img.aura1, (24*3*auraImg[PC.auraImg+i][0])+(PC.auraNum*24), (128*auraImg[PC.auraImg+i][1]), 24, 128, (canvas.width-24+shiftX)/2, (canvas.height-128+28-64)/2, 24, 128);
          ctx.drawImage(img['character'+imgPC[PC.img][1]], (24*1)+(imgPC[PC.img][2]*24*3), (32*2)+(imgPC[PC.img][3]*32*4), 24, 32, (canvas.width-24+shiftX)/2, (canvas.height-32-4)/2, 24, 32);
        }
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('オーラ変更', canvas.width/2, canvas.height/2-55);

      ctx.font = '16px Arial';
      ctx.fillText('左右移動→選択', canvas.width/2, canvas.height/2+48);
      ctx.fillText('攻撃→変更&終了', canvas.width/2, canvas.height/2+66);

      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
    settings_changeWindow() {
      // 設定変更ウィンドウ
      ctx.fillStyle = 'rgb(255,255,255,0.9)';
      ctx.fillRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);
      ctx.strokeStyle = 'powderblue';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);

      const location = 18*settings.select;
      ctx.fillStyle = 'rgb(255,0,0,0.5)';
      ctx.fillRect((canvas.width-170)/2, canvas.height/2-41+location, 170, 18);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('設定変更', canvas.width/2, canvas.height/2-55);

      ctx.font = '16px Arial';
      ctx.fillText('上下移動→選択', canvas.width/2, canvas.height/2+48);
      ctx.fillText('攻撃→変更&終了', canvas.width/2, canvas.height/2+66);

      ctx.fillStyle = 'lightsalmon';
      ctx.fillText('デッドゾーン表示', canvas.width/2, canvas.height/2-30);
      ctx.fillText('枠線表示', canvas.width/2, canvas.height/2-12);
      ctx.fillText('座標表示', canvas.width/2, canvas.height/2+6);
      ctx.fillText('hpを左に表示', canvas.width/2, canvas.height/2+24);

      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
    discord_linkWindow_confirm() {
      // リンク表示確認ウィンドウ
      ctx.fillStyle = 'rgb(255,255,255,0.9)';
      ctx.fillRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('確認画面', canvas.width/2, canvas.height/2-55);

      ctx.font = '16px Arial';
      ctx.fillText('攻撃→YES', canvas.width/2, canvas.height/2+48);
      ctx.fillText('加速→NO', canvas.width/2, canvas.height/2+66);

      ctx.font = '12px Arial';
      ctx.fillStyle = 'lightsalmon';
      ctx.fillText(discord.choices[discord.select][0], canvas.width/2, canvas.height/2-26);
      ctx.fillStyle = 'black';
      ctx.fillText(discord.choices[discord.select][2], canvas.width/2, canvas.height/2-13);
      ctx.fillText(discord.choices[discord.select][3], canvas.width/2, canvas.height/2-0);
      ctx.fillText(discord.choices[discord.select][1], canvas.width/2, canvas.height/2+13);
      ctx.fillText('を開きますか？', canvas.width/2, canvas.height/2+26);

      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
    discord_linkWindow() {
      // リンク表示ウィンドウ
      ctx.fillStyle = 'rgb(255,255,255,0.9)';
      ctx.fillRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);

      const location = 22*discord.select;
      ctx.fillStyle = 'rgb(255,0,0,0.5)';
      ctx.fillRect((canvas.width-170)/2, canvas.height/2-45+location, 170, 18);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('外部リンク', canvas.width/2, canvas.height/2-55);

      ctx.font = '16px Arial';
      ctx.fillText('上下移動→選択', canvas.width/2, canvas.height/2+30);
      ctx.fillText('攻撃→決定', canvas.width/2, canvas.height/2+48);
      ctx.fillText('加速→戻る', canvas.width/2, canvas.height/2+66);

      ctx.fillStyle = 'lightsalmon';
      ctx.fillText(discord.choices[0][0], canvas.width/2, canvas.height/2-33);
      ctx.fillText(discord.choices[1][0], canvas.width/2, canvas.height/2-11);
      ctx.fillText(discord.choices[2][0], canvas.width/2, canvas.height/2+9);

      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
    battle_selectWindow() {
      // バトル選択画面ウィンドウ
      const battleName = ['デフォルト(wave制)'];

      Object.keys(setData).forEach(dataName => {
        battleName.push(dataName);
      });
      let point = battle.selectionScreen;
      if (point >= 2 && point !== battleName.length-1) { // 最初でも最後のデータでもないなら真ん中
        point = 1;
      } else if (point >= 2 && point === battleName.length-1) { // 最後のデータなら下
        point = 2;
      }

      ctx.fillStyle = 'rgb(255,255,255,0.9)';
      ctx.fillRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);
      ctx.strokeStyle = '#bfffba';
      ctx.lineWidth = 1;
      ctx.strokeRect((canvas.width-170)/2, (canvas.height-150)/2, 170, 150);

      const location = 22*point;
      ctx.fillStyle = '#bfffba';
      ctx.fillRect((canvas.width-170)/2, canvas.height/2-45+location, 170, 18);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '18px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('戦闘内容選択', canvas.width/2, canvas.height/2-55);

      ctx.font = '16px Arial';
      ctx.fillText('上下移動→選択', canvas.width/2, canvas.height/2+30);
      ctx.fillText('攻撃→決定', canvas.width/2, canvas.height/2+48);
      ctx.fillText('加速→戻る', canvas.width/2, canvas.height/2+66);

      ctx.fillStyle = 'lightsalmon';
      for (let i = 0; i < battleName.length; i++) {
        if (i >= 3) {
          break;
        }
        let startIndex = i;
        if (battle.selectionScreen >= 2) {
          startIndex = i+battle.selectionScreen-1;
        }
        if (battle.selectionScreen >= 2 && battle.selectionScreen === battleName.length-1) {
          startIndex = i+battle.selectionScreen-2;
        }
        ctx.fillText(battleName[startIndex], canvas.width/2, canvas.height/2-33+(i*22));
      }


      ctx.textAlign = "start";    // デフォルト値
      ctx.textBaseline = "alphabetic";  // デフォルト値
    },
  },
};

const serverLogic = {
  check_player_attack_object() { // プレイヤーの攻撃オブジェクト判定
    Object.keys(PC.attacks).forEach(attackId => {
      const attack = PC.attacks[attackId];
      // 一定距離進んだら画像差し替え、消滅
      if (attack.distance > 36) {
        delete PC.attacks[attackId];
        return;
      } else if (attack.distance > 27) {
        attack.sy = 1;
      } else if (attack.distance > 18) {
        attack.sy = 2;
      } else if (attack.distance > 9) {
        attack.sy = 3;
      }

      // 対オブジェ衝突判定
      const nowX1 = Math.floor((attack.x) / 16);
      const nowX2 = Math.floor((attack.x+15) / 16);
      const nowY1 = Math.floor((attack.y) / 16);
      const nowY2 = Math.floor((attack.y+15) /16);
      if (!map.movable.includes(map.data[nowY1][nowX1]) || !map.movable.includes(map.data[nowY1][nowX2]) || !map.movable.includes(map.data[nowY2][nowX1]) || !map.movable.includes(map.data[nowY2][nowX2])) {
        const coordinate = {
          x: attack.x,
          y: attack.y,
          time : 0,
          sy : 6,
        };
        explosion1.push(coordinate);
        // 戦闘開始する為のナイト判定
        if (map.data[nowY1][nowX1] === 28 || map.data[nowY1][nowX2] === 28 || map.data[nowY2][nowX1] === 28 || map.data[nowY2][nowX2] === 28) {
          if (battle.status === 1) {
            battle.count -= 200;
            announce.push([`wave${wave.num+1}開始まで${battle.count}秒`, 50, 'blue']);
          } else if (battle.status === 0) {
            battle.status = 3; // バトル(戦闘)内容選択画面へ
          }
        }
        delete PC.attacks[attackId];
        return;
      }

      // 戦闘中の場合
      if (battle.status === 2 || battle.status === 4) {
        const ax1 = attack.x;
        const ax2 = attack.x + 15;
        const ay1 = attack.y;
        const ay2 = attack.y + 15;
        Object.keys(MNS.monsters).forEach(monsterId => {
          const monster = MNS.monsters[monsterId];
          const mx1 = monster.x;
          const mx2 = monster.x + MNS.type[monster.type].width - 1;
          const my1 = monster.y;
          const my2 = monster.y + MNS.type[monster.type].height - 1;
          // 矩形同士の衝突判定
          if (ax2 >= mx1 && ax1 <= mx2 && ay2 >= my1 && ay1 <= my2) {
            // 衝突時の処理
            monster.hp--;
            if (monster.hp <= 0) {
              delete MNS.monsters[monsterId];
            }
            const coordinate = {
              x: attack.x,
              y: attack.y,
              time : 0,
              sy : 6,
            };
            explosion1.push(coordinate);
          }
        });
      }

      // プレイヤー攻撃オブジェ移動
      attack.distance++;
      switch (attack.dir) {
        case 'up':
          attack.y -= 3;
          break;
        case 'right':
          attack.x += 3;
          break;
        case 'down':
          attack.y += 3;
          break;
        case 'left':
          attack.x -= 3;
          break;
      }
    });
  },
  start_battle_countdown() { // 戦闘までのカウントダウン開始
    battle.status = 1;
    battle.count = 600;
    announce.push([`wave${wave.num+1}開始まで${battle.count}秒`, 50, 'blue']);
    const intervalId = setInterval(() => {
      battle.count--;
      if (battle.count <= 0) {
        clearInterval(intervalId);
        serverLogic.init_battle();
      } else {
        announce.push([`wave${wave.num+1}開始まで${battle.count}秒`, 50, 'blue']);
      }
    }, 1000);
  },
  init_battle() { // 戦闘開始
    serverLogic.mapChange_toBattle();
    battle.status = 2;
    announce.push([`wave${wave.num+1}が開始されました`, 200, 'blue']);
    MNS.create.exe();
  },
  mapChange_toBattle() {
    map.data[18][41] = 23;
    map.data[ 9][23] = 24;
    map.data[10][23] = 24;
    map.data[11][23] = 24;
  },
  mapChange_toStand() {
    map.data[18][41] = 28;
    map.data[ 9][23] = 23;
    map.data[10][23] = 23;
    map.data[11][23] = 23;
  },
  inBattle() { // 戦闘中の場合
    if (battle.status !== 2 && battle.status !== 4) {
      return;
    }
    // プレイヤーhpが0になったらゲームオーバー
    if (PC.hp <= 0) {
      if (battle.status === 2) {
        announce.push([`GAME OVER wave${wave.num+1}失敗`, 500, 'red']);
        wave.num = 0;
      } else if (battle.status === 4) {
        announce.push([`カスタム戦闘失敗`, 200, 'red']);
        announce.push([`${Object.keys(setData)[battle.selectionScreen-1]}`, 200, 'red']);
      }
      serverLogic.mapChange_toStand();
      battle.status = 0;
      PC.hp = 200;
      MNS.monsters = {};
      MNS.bullets = {};
      return;
    }
    // モンスターがいなくてゲームクリア(プレイヤー攻撃オブジェクトで消滅してる)
    if (Object.keys(MNS.monsters).length === 0) {
      if (battle.status === 2) {
        wave.num++;
        announce.push([`wave${wave.num}をクリアしました`, 200, 'red']);
        serverLogic.start_battle_countdown(); // 次へ
      } else if (battle.status === 4) {
        announce.push([`カスタム戦闘をクリアしました`, 200, 'red']);
        announce.push([`${Object.keys(setData)[battle.selectionScreen-1]}`, 200, 'red']);
        battle.status = 0; // 終了
      }
      serverLogic.mapChange_toStand();
      PC.hp = 200;
      MNS.bullets = {};
      return;
    }
    // モンスター処理
    Object.keys(MNS.monsters).forEach(monsterId => {
      const monster = MNS.monsters[monsterId];
      const mx1 = monster.x;
      const mx2 = monster.x + MNS.type[monster.type].width - 1;
      const my1 = monster.y;
      const my2 = monster.y + MNS.type[monster.type].height - 1;
      const px1 = PC.px;
      const px2 = PC.px + 15;
      const py1 = PC.py;
      const py2 = PC.py + 23;
      // 矩形同士の衝突判定
      if (px2 >= mx1 && px1 <= mx2 && py2 >= my1 && py1 <= my2) {
        const coordinate = {
          x: px1,
          y: py1+4,
          time : 0,
          sy : 6,
        };
        explosion1.push(coordinate);
        PC.hp--;
      }
      MNS.aiLogic[monster.type](monster);
    });
    // 敵の弾の処理
    Object.keys(MNS.bullets).forEach(bulletId => {
      const bullet = MNS.bullets[bulletId];
      bullet.aniTime = (bullet.aniTime + 1) % 11; // 0~10循環
      bullet.aniNum = bullet.aniTime === 0 ? (bullet.aniNum + 1) % 3 : bullet.aniNum; // 0なら0~2循環、まだならそのまま
      switch (bullet.dir) {
        case 0:
          bullet.y -= bullet.speed;
          break;
        case 1:
          bullet.x += bullet.speed;
          break;
        case 2:
          bullet.y += bullet.speed;
          break;
        case 3:
          bullet.x -= bullet.speed;
          break;
      }
      let bx1 = bullet.x;
      const bx2 = bullet.x + bullet.width - 1;
      let by1 = bullet.y;
      const by2 = bullet.y + bullet.height - 1;
      const px1 = PC.px;
      const px2 = PC.px + 15;
      const py1 = PC.py;
      const py2 = PC.py + 23;
      // 矩形同士の衝突判定
      if (px2 >= bx1 && px1 <= bx2 && py2 >= by1 && py1 <= by2) {
        const coordinate = {
          x: px1,
          y: py1+4,
          time : 0,
          sy : 6,
        };
        explosion1.push(coordinate);
        PC.hp--;
      }
      // 敵の弾と外壁との衝突判定x が 384~928+16(元の座標がプレイヤーの左上起点なので実際は一番右の座標は928+プレイヤーの幅分ある)、y が 16~552+24
      if (bx1 <= 384 || bx2 >= 928+16 || by1 <= 16 || by2 >= 552+24) {
        if (bullet.dir === 2) { by1 += 8; } // 爆破アニメーション位置調整(応急処置)
        if (bullet.dir === 1) { bx1 += 4; } // 爆破アニメーション位置調整(応急処置)
        const coordinate = {
          x: bx1,
          y: by1,
          time : 0,
          sy : 6,
        };
        explosion1.push(coordinate);
        delete MNS.bullets[bulletId];
        return;
      }
    });
  },
  init_battle_custom() {
    serverLogic.mapChange_toBattle();
    battle.status = 4;
    announce.push([`カスタム戦闘が開始されました`, 200, 'blue']);
    announce.push([`${Object.keys(setData)[battle.selectionScreen-1]}`, 200, 'blue']);
    MNS.create.fromSaveData();
  },
}

let explosion1 = []; // プレイヤーの攻撃爆破
const announce = [];


// コンソール用関数
function setWave(num) {
  const parsedNum = Number(num);
  // null, undefined, NaN, 小数点, 空文字、false、文字列のすべてに対処
  if (num != null && !isNaN(parsedNum) && Number.isInteger(parsedNum) && parsedNum >= 0 && parsedNum <= 100 && battle.status === 0) {
    wave.num = parsedNum;
    serverLogic.start_battle_countdown();
  }
}


