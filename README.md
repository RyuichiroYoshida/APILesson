# APILesson Project

## 🎯 教材の目的

- APIとは何かを理解する

- Unity（クライアント）→ GAS（サーバー）→ スプレッドシート（データベース）の通信構造を理解

- JSON形式の送受信を体験

- HTTP通信（GET / POST）を実装してみる

## 🧩 サンプルプロジェクト概要

``` plane_text
    📁 ディレクトリ構成例
    unity-gas-sheet-sample/
    ├── UnityProject/
    │   └── Assets/
    │       └── Scripts/
    │           ├── GoogleAPIClient.cs
    │           ├── DataSender.cs
    │           └── DataViewer.cs
    ├── GAS/
    │   └── main.gs
    └── README.md
```

## 🧠 全体の流れ

1. スプレッドシートを準備

    例: 「UserData」というシートを作成

    1行目にヘッダー（id, name, score）を設定

2. GASでAPIを作成

    HTTP経由でデータを追加（POST）・取得（GET）できるエンドポイントを用意

    Unityで通信スクリプトを作成

3. UnityWebRequest を使ってGASと通信

    JSON形式でデータを送受信
