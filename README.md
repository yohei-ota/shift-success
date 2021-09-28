# アプリ名

## Shift Success


# 概要

## アルバイトのシフト作成・管理。その他給料や締め作業関係の業務

### アルバイトのユーザー

- シフト希望を提出
- 自身が提出したシフト希望の内容を確認
- 決定した自身のシフトを一覧で確認
- *シフト交代希望や休み希望をメッセージで送信
- *全員分のシフトを日毎に確認
- *過去の自身の就業履歴を確認
- *月毎の給料暫定分を計算・確認


### 店側のユーザー

- 一日毎にシフトを作成
- シフトの編集・残業分の時間をシフトデータに付与
- 当日のシフトをトップページで確認
- *特定のアルバイトの連続勤務日数がわかる
- *特定の時間帯に何人体制かがわかる
- *締め日・給料日などを設定
- *アルバイトユーザー情報の管理
- *ユーザー全員に対してメッセージを送信
- *その日の就業データを元に日報を作成
- *日報データを元に月報を作成
- *アルバイトが働いた時間帯によって深夜手当などを付与
- *給与明細の作成


# 本番環境

### URL

## ログイン情報(テスト用)

### 会社名

-


### アルバイト

- Eメール:
- パスワード:

### 店側

- Eメール:
- パスワード:
- 暗証番号:


# 制作背景(意図)

- 現在もアルバイトのシフト作成は紙媒体で行っているところが多い印象。それをデータで行えれば経費や資源の削減に繋がると思った。
- アルバイトはシフト希望をLINEや店舗で記入しているところが多いと思うが、LINEだとフォーマットがないため記述が面倒、店舗で記入の場合は店舗に行かなくてはならない、後で自分の希望を確認することができないなどのデメリットがある。
- また、給料計算や就業履歴などは自分で管理しなくてはならず、手間がかかり面倒。
- 店側はLINEや店舗の希望表などの情報を一度まとめる作業が必要。
- それを元にシフト作成する時に手書きだと時間がかかる、目線の動きが大きい、など問題がある。
- 作成したシフトの共有に写真を撮ってからLINEで共有など手間がかかる。
- 製作者はアルバイトの経験が長く、アルバイト時代にシフトの作成を任されていた経験もあり、
両方の不便だと感じる部分があり、そこを解消できればと思った。


# DEMO


# 工夫したポイント

- 機能の実装だけではなく、実際に使用してみた時にどうゆう情報が表示されていて欲しいかや、どのような操作方法だと楽か、などを意識して作成した。
- 見るアプリケーションというよりは使うアプリケーションということを意識してデザインなどシンプルで見やすく、使いやすくなるように心がけた。


# 課題や今後実装したい機能

- メッセージ機能は普段使い慣れているLINEでのやりとりの方が使い慣れていると思うので、LINEアカウントでのログイン機能や、メッセージ機能とLINEの紐付け。
- カレンダーを表示させているが、登録している店舗のスケジュールしか表示されないので、ユーザーのスマートフォンのカレンダーとの連携。
- アルバイトユーザーは複数日分の希望を入力しなければならないので、一括入力できるような機能。(全て休みや、全て同じ時間帯で設定など)
- シフト希望が送信された時や、シフトを作成した時などに各ユーザーに通知が届くような機能。
- まだ希望を出していない時にシフト希望の締め切り日が近づくとそれを知らせてくれるような機能。
- 現状カスタマイズ性が低いと思っているので、店側の管理者ユーザーがそれを設定して変えられるような機能。(店舗の営業時間、シフト時間の設定を何時〜何時→早番・遅番、シフト提出のサイクルを1週間おき→隔週や月毎など)

# DB設計

## groups テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| group_name   | string | null: false |

### Association

- has_many : admins
- has_many : users
- has_many : user_admin_rooms
- has_many : rooms
- has_many : messages
- has_many : work_schedules
- has_many : actual_works
- has_many : daily_reports
- has_many : monthly_reports


## admins テーブル

| Column             | Type      | Options                        |
| ------------------ | --------- | ------------------------------ |
| name               | string    | null: false                    |
| email              | string    | null: false, unique: true      |
| encrypted_password | string    | null: false                    |
| group_name         | string    | null: false                    |
| pay_day            | date      | default: null                  |
| dead_line          | date      | default: null                  |
| group_id           | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- has_many :daily_reports
- has_many :messages, dependent: :destroy
- has_many :user_admin_rooms, dependent: :destroy
- has_many :rooms, through: :user_admin_rooms

## users テーブル

| Column             | Type      | Options                        |
| ------------------ | --------- | ------------------------------ |
| name               | string    | null: false                    |
| email              | string    | null: false, unique: true      |
| encrypted_password | string    | null: false                    |
| hourly_wage        | integer   | default: null                  |
| group_id           | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- has_many :work_schedules
- has_many :messages, dependent: :destroy
- has_many :user_admin_rooms, dependent: :destroy
- has_many :rooms, through: :user_admin_rooms


## user_admin_rooms テーブル

| Column   | Type      | Options                        |
| -------- | --------- | ------------------------------ |
| user_id  | reference | null: false, foreign_key: true |
| admin_id | reference | null: false, foreign_key: true |
| room_id  | reference | null: false, foreign_key: true |
| group_id | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user
- belongs_to :admin
- belongs_to :room


## rooms テーブル

| Column   | Type      | Options                        |
| -------- | --------- | ------------------------------ |
| name     | string    | null: false                    |
| group_id | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- has_many :user_admin_rooms, dependent: :destroy
- has_many :user, through: :user_admin_rooms
- has_many :messages, dependent: :destroy


## messages テーブル

| Column   | Type      | Options                        |
| -------- | --------- | ------------------------------ |
| content  | text      | null: false                    |
| user_id  | reference | null: false, foreign_key: true |
| room_id  | reference | null: false, foreign_key: true |
| group_id | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :room
- belongs_to :user
- belongs_to :admin


## work_schedules テーブル

| Column       | Type      | Options                       |
| ------------ | --------- | ----------------------------- |
| datetime_in  | datetime  |                               |
| datetime_out | datetime  |                               |
| holiday      | boolean   | default: false                |
| add_request  | string    |                               | 
| user_id      | reference | nul: false, foreign_key: true |
| group_id     | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user


## actual_works テーブル

| Column          | Type      | Options                           |
| --------------- | --------- | --------------------------------- |
| datetime_in     | datetime  | null: false                       |
| datetime_out    | datetime  | null: false                       |
| over_early_time | float     | default: false                    |
| holiday         | boolean   | default: false, foreign_key: true |
| user_id         | reference | nul: false, foreign_key: true     |
| daily_report_id | reference | optional: true, foreign_key: true |
| group_id        | reference | null: false, foreign_key: true    |

### Association

- belongs_to :group
- belongs_to :user
- belongs_to :daily_report


## daily_reports テーブル

| Column            | Type      | Options                           |
| ----------------- | --------- | --------------------------------- |
| sales             | float     |                                   |
| comments          | text      |                                   |
| admin_id          | reference | null: false, foreign_key: true    |
| monthly_report_id | reference | optional: true, foreign_key: true |
| group_id          | reference | null: false, foreign_key: true    |

### Association

- belongs_to :group
- has_many :actual_works
- belongs_to :admin
- belongs_to :monthly_report



## monthly_reports テーブル

| Column   | Type      | Options                        |
| -------- | --------- | ------------------------------ |
| sales    | float     |                                |
| comments | text      |                                |
| group_id | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- has_many :daily_reports