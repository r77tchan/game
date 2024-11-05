# 必要パラメータ
id        自動
x         !設定
y         !設定
hp        !設定
type      !設定
aniSX     固定
aniSY     固定
aniTime   固定
cnt       自動
baseXAdd  固定



サーバー処理の流れ

PostAddServlet.java
/add

処理の数、流れとしては

データベース→DataLogicのinsertDataを実行する
複数のname属性がポイント(gptにある)
リクエストパラメータをList<Data>にしないといけないはず
ここから値を取り出し、name属性のnameをString型へ、
他をListにして(2次元配列だったかな？)Dataとして格納、引数にして実行
戻り値のbooleanで分岐必要あるかな？一旦保留で

アプリケーションスコープ→setAttributeする
データベース処理が参考になる？なら真似る

セッションスコープ→ほぼ同じ

リクエストスコープ→ほぼ同じでフォワード



PostDeleteServlet.java
/delete
非同期でやることになった。gptにある。js側作らなきゃ。javaの処理は減らせる。
でもjavaも作らなきゃ。




GetSetServlet.java
/set
DataLogicのselectNamesだっけ？を実行すると
Stringで帰ってくる。それを表示
他のスコープ達もどうにかして取得して表示(名前だけなのがポイント)
ってのはやめて、
selectAllでいいなこれ、そのほうが読み込みの処理がjsだけで済む
selectNames？は削除しよう
selectDataByNameだっけ？これも要らなくなる
時間の都合で毎回selectAllすることになったので以下のメソッドは未使用って書いとこう

jsの処理も追加しないと



GetGameServlet.java
/game
データベース→DataLogicのselectAllを実行するとStringで帰ってくるから、
これを持ってフォワードするだけ
リクエストスコープに入れるんだっけ？参考書を確認しよう

アプリケーションスコープとか、全部取得して、フォワードかな？
