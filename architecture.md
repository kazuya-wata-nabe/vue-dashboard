# アーキテクチャ
- レイヤードアーキテクチャ
- 依存は一方方向にすること
- 下位のレイヤーが上位のレイヤーをimportするのは禁止

```ts
// NG
import hoge from "@/pages"
// OK
import hoge from "@/shared"
```


- 同レイヤーでimportするのは禁止

# ディレクトリ、ファイル名
- kebab-caseで作成すること
- gitが大文字、小文字を区別しないため
  - ファイル名をHoge -> hogeに変更したとき差分として認識されない
  - https://zenn.dev/soma3134/articles/20220726_folder_case_sensitive

# import
- 絶対パスにすること

```
o: import hoge from "@/xxxx"
x: import hoge from "../xxxx"
```

# 関数はアロー関数で定義すること

```
o: const hoge = () => {}
x: function hoge() {}
```