
## このアプリは？

PythonでWeb APIサーバを作り、Reactでフロントエンドを作られている。

TODOアプリを作ってあり、以下のコマンドで起動する

```
# APIサーバ(Python)の起動
uv run python -m todo_api.server.api

# フロントエンドサーバ(React)の起動
cd todo_frontend && npm start
```

## 実行してみるプロンプト

APIとフロントエンドで、タスクのカードのデータTaskを、以下のエンティティでやりとりしている。

todo_api/domain/entity/entity.py
todo_frontend/src/entity/task.ts

ステータスが以下の2種類しかない。

- "todo": 完了前
- "done": 完了済み

ステータスを3種類にしたい。

- "todo": 実施前
- "in_progress": 進行中
- "done": 完了済み

バックエンドの実装に、"in_progress"のステータスに変更するAPIを追加したい。

フロントエンドの、タスクカードの実装は以下にある。

todo_frontend/src/views/taskList.tsx

以下の変更をしたい。

- "in_progress"か"todo"かタスクカードに表示したい
- "start"ボタンを追加したい
