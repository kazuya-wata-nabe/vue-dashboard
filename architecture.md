# FSD
- app — app-wide settings, styles and providers.
- pages — compositional layer to construct full pages from entities, features and widgets.
- widgets — compositional layer to combine entities and features into meaningful blocks. (e.g. IssuesList, UserProfile).
- features — user interactions, actions that bring business value to the user. (e.g. SendComment, AddToCart, UsersSearch).
- entities — business entities. (e.g., User, Product, Order).
- shared 

# ディレクトリ、ファイル名
- kebab-caseで作成すること
- gitが大文字、小文字を区別しないため
  - ファイル名をHoge -> hogeに変更したとき差分として認識されない
  - https://zenn.dev/soma3134/articles/20220726_folder_case_sensitive

# import
- 絶対パスにすること
- import hoge from "@/xxxx"

