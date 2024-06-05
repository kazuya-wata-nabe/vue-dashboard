# README

- node管理ツールは[volta](https://volta.sh/)を使ってください
- パッケージマネージャはpnpmを使ってください

## コマンド
- 初回
  - pnpm install

- 起動
  - pnpm run dev

## アーキテクチャ
- レイヤードアーキテクチャです
- レイヤー
  - app: アプリ全体の設定
  - views: ページで使う機能
  - features: 2,3箇所で共有する機能
  - shared: システム全体で共有する機能

## 実装ルール
- モジュールの依存は一方方向にしてください
  - 自分より下位のレイヤーのimportのみOK
  - 同レイヤー同志のimportはNG

```ts
// OK
// @/app/hoge.ts
import fuga from "@/shared"
// NG
// @/features/aaa
import bbb from "@/views"
// NG
// @/views/ccc
import ddd from "@/views/ddd"
```

- 共通化を検討する場合は以下を参考にしてください
  - https://zenn.dev/ishiyama/articles/a0c5a7504b856f#%E7%84%A1%E7%90%86%E3%81%AB%E5%85%B1%E9%80%9A%E5%8C%96%E3%81%97%E3%81%AA%E3%81%84

- .vscode/extensions.jsonで推奨しているプラグインは全て導入してください
  - typoを減らしたいため
  
- exportはnamed exportにしてください

```ts
// OK
export const hoge = { hoge: 1 }
// NG
export default { hoge: 1 }
```

- ディレクトリ、ファイル名はkebab-caseにしてください
  - gitが大文字、小文字を区別しないため
    - https://zenn.dev/soma3134/articles/20220726_folder_case_sensitive

- importは基本的に絶対パスにしてください
  - 自分からみて下位のディレクトリは相対パスにしてください
  - importの順番をキレイにしたいため

```ts
// OK
import hoge from "@/xxxx"
import hoge from "./xxxx"
// NG
import hoge from "../xxxx"
```

- 関数はアロー関数で定義してください

```ts
// OK
const hoge = () => {}
// NG
function hoge() {}
```

- 使っていないimport, 変数は削除してください
  - 上記が残っているとpush時にエラーになります
  - push前は試行錯誤しやすいよう警告だけ

## apiについて
- api clientはfetchです
- パス、リクエスト、レスポンスの型はopenapiから自動生成しています
  - バックエンド、フロントエンドで仕様を共有するための資料にするため
  - コマンドは`pnpm gen:schema`
- 自動生成するのでapiディレクトリは作っていません
  - 必要があれば各レイヤーで作ってください
- 自動生成の元ネタなので積極的にopenapiをメンテナンスしてください
  - 自動生成し易い書き方は[こちら](https://openapi-ts.pages.dev/advanced#styleguide)

## mockについて
- mock serverはmswです
  - openapi-msw使っているため、openapiに定義されているパス、レスポンス以外は登録できません
- レスポンスは`src/app/mocks/handlers.ts`で設定しているので適宜更新してください
  - レスポンスにopenapiのexamplesを使う場合はredoclyでjsonを出力してください

## テストについて
- storybookにテストを書いてください

## その他
- ここまでに記載された内容はPJにあわせてカスタムしてください

## 時間があれば以下をやりたいこと
- openapiからzod schemaを生成する
  - https://qiita.com/ay-kapi/items/b959ee60fed8a84a9973
- ESLintを使ってモジュール間のimportを制限する
  - https://zenn.dev/sho_ts/articles/752cac66d90443
