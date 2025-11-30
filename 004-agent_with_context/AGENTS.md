## システム概要
- Flask 製の API (`todo_api/`) と React + TypeScript 製の SPA (`todo_frontend/`) から成る最小構成の TODO アプリです。

## 利用ツール
- Pythonのライブラリ管理: uv
- Nodejsのパッケージ管理: pnpm

## プロジェクト構成
- todo_api/ : バックエンドAPIサーバ
  - domain/ : ビジネスロジック層
    - entity/ : エンティティ定義
    - usecase/ : ユースケース実装
  - memdb/ : インメモリDB実装
  - server/ : Flaskサーバ実装
    - api.py : API定義
- todo_frontend/ : フロントエンドSPA
  - src/
    - api/ : FlaskAPI呼び出し
    - domain/ : ビジネスロジック層
      - entity/ : エンティティ定義
    - view/
      -

## プロジェクト構成のポリシー
- エンティティ定義にはビジネスロジックは持たせない
- エンティティ定義は、バックエンドとフロントエンドで両方定義するが、JSONで同じ名前のオブジェクトをやりとりできるようにする
- ビジネスロジックはフロントエンドでは持たせず、バックエンドで実装する
  - フロントエンドではデータの絞り込みなどは行わず、バックエンドに任せる
- HTTP ハンドラは極力薄く保ち、状態遷移やバリデーションは `OperationInteractor` に閉じ込めます。

## 開発ワークフロー
- 開発サーバ起動
  - バックエンド: `uv run python -m todo_api.server.api`（ポート 8080。`todo_api/public` を自動 Serve）。
  - フロントエンド: `cd todo_frontend && pnpm start`（または `npm start`）。ポート 3000 で Flask にプロキシします。
- バックエンド
  - フォーマット: `uv run ruff format .`
  - リント: `uv run ruff check .`
  - テスト: `uv run python -m unittest discover -p "*_test.py" -v`
- フロントエンド
  - リント: `cd todo_frontend && pnpm lint --fix`
  - フォーマットも `pnpm list --fix` で行う
- コード修正後は、フォマット、リント、テストを実行すること
