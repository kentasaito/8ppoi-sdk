8ppoiカートリッジバリデータ

deno run --allow-read index.js {対象ファイル}

以下にいずれにも該当しないまたはスコープを持たない識別子が参照されていないことを確認します。

・許可された標準組み込みオブジェクト
・インポート済みの識別子
・そのファイル内で定義された識別子
  ・クラス
    ・プロパティ
    ・メソッド
  ・関数
  ・変数
・メソッドの引数
・関数の引数
・クラス内のthis
・メンバ

許可された標準組み込みオブジェクトの一覧
参考: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects
undefined, Object, Number, Math, String, RegExp, Array
