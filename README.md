# README

- node管理ツールは[mise](https://mise.jdx.dev)を使ってください

## コマンド

- 初回

```sh
mise i
```

- 起動

```sh
pnpm dev
```

## アーキテクチャ

- レイヤードアーキテクチャです
- レイヤー
  - app: アプリ全体の設定
  - views: ページで使う機能
  - features: 複数ページで共有する機能
  - shared: プロジェクト/ビジネスの詳細に依存しない再利用可能な機能

## 実装ルール

- 最初から無理に共通化せず必要になったら共通化してください
  - 最初はviewsに重複する状態で作成し、共通化できる場合はfeaturesに移動してください
  - 参考
    - <https://zenn.dev/ishiyama/articles/a0c5a7504b856f#%E7%84%A1%E7%90%86%E3%81%AB%E5%85%B1%E9%80%9A%E5%8C%96%E3%81%97%E3%81%AA%E3%81%84>

- `eslint`のルールは`eslint.config.ts`で定義しています
  - 追加したい or 削除したいルールがあれば適宜カスタムしてください

## テストについて

- storybookにテストを書いてください

## その他

### vscodeの設定

- 推奨

```sh
cp vscode.settings.json .vscode/settings.json
```
