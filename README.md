# アプリ名

## Shift Success


# 概要

## アルバイトのシフト作成・管理

### アルバイトのユーザー

- シフト希望を提出
- 自身が提出したシフト希望の内容を確認
- 決定した自身のシフトを一覧で確認


### 店側のユーザー

- 一日毎にシフトを作成
- シフトの編集・残業分の時間をシフトデータに付与
- 当日のシフトをトップページで確認


# 本番環境

### URL
https://shift-success.herokuapp.com/

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

## 会社名登録トップページ
![会社名登録トップ](https://i.gyazo.com/6c5027fdfc0d01ecc960900914279b1a.png)  
ログインや新規登録する前のページ。会社名を入力することで各会社名のグループへ振り分けられ、それぞれのページへ遷移できる。未登録の会社の場合は新しく会社名が登録される。

## 会社名登録後ページ
![管理者・アルバイト振り分け](https://i.gyazo.com/4174e8b779637612e1e804419fed9db7.png)  
会社名入力後それぞれのユーザーのログイン・新規登録の振り分けページへ遷移。

## アルバイト・管理者のログイン・新規登録ページ
![アルバイトログインページ](https://i.gyazo.com/89a5d61e35aa4fbb8772ae2c362f77e1.png)  
![アルバイト新規登録ページ](https://i.gyazo.com/1bc09038a3779f8dead40c1e6d0ec3ee.png)  
![管理者ログインページ](https://i.gyazo.com/46ca0c8d7e48a5fc56998bc5b1fa27fc.png)  
![管理者新規登録ページ](https://i.gyazo.com/eb3b139e5c5473d086590591a1e40a8f.png)  

## アルバイトログイン・新規登録後トップページ 
![アルバイトログイン・新規登録後トップページ](https://i.gyazo.com/af754dcf70c5bcc0633e8b1b334f3ea6.jpg)  
アルバイトのログイン後トップページでは会社名・ユーザー名が表示され、今月分と来月分の確定シフト(オレンジ)と自分が提出したシフト希望(ピンク)がカレンダー形式で表示される。
確定シフトでは「休み」の時は何も表示されないが、シフト希望の「休み」は表示される。
フッター部分に各ページへ遷移できるメニューが一覧で表示されている。

## アルバイトシフト申請イメージGIF
![shift-schedule](https://user-images.githubusercontent.com/88124490/136316864-b04d4f42-2896-4320-a24a-abc93da9e02d.gif)  
アルバイトシフト希望申請ページでは左側に今月と来月のカレンダー、右側にシフト希望入力フォームが表示されており、入力フォームの日付は本日から2週間後の月曜日から7日分になっている。
左側のカレンダーには確定シフト(オレンジ)とシフト希望(ピンク)が表示されており、入力フォームの【送信】ボタンをクリックすると、1週間分のシフト希望が保存され、左側のカレンダーに表示される。

## 管理者ログイン・新規登録後トップページ
![管理者ユーザートップページ](https://i.gyazo.com/b6de6899c5a68b9859a609048050cd3c.jpg)  
管理者のログイン後トップページでは会社名と本日のシフトが表形式と一覧で表示されている。
アルバイトのページと異なり、ヘッダー部分に各ページへ遷移できるメニューが一覧で表示されている。

## 管理者シフト作成イメージGIF
![シフト作成イメージ](https://user-images.githubusercontent.com/88124490/136313281-193b75ac-6742-4a01-8229-1774b9378d2a.gif)  
管理者のシフト作成ページでは表の上部にいつまでのシフトが作成されているかと、日付選択フォームが表示されており、日付を選択すると【保存】ボタンとアルバイトユーザーが提出しているその日のシフト希望が一覧表示され、表にも反映される(昨日以前の日付を選択しても何も表示されない)。表のセル部分をクリックすると、色がついていないセルはグレーで色付けされ、色がついているセルは色が消える(一覧表示されているシフト希望は変わらない)。このように30分単位でシフトを作成し、【保存】ボタンをクリックすると、「保存されました！」のポップアップが表示され、その日の全員分の確定シフトが保存、表上部の「作成済み」の日付が更新される。

## 管理者シフト編集イメージGIF
![edit-shift](https://user-images.githubusercontent.com/88124490/136317982-326dc7f0-9a40-4539-baa2-fc67bbbe783b.gif)  
管理者のシフト編集ページでは表の上部に日付選択フォームが表示されており、日付を選択すると【変更保存】ボタンと確定シフトが一覧表示され、表にも反映される(昨日の日付まで表示・編集可能)。「休みにする」のチェックボックスにチェックをいれると、そのアルバイトのシフトが非表示になりボタンが「休みを取り消す」に変化、表の表示も消える。「休みを取り消す」のチェックを外すと、再度シフトと表の色付けが表示される。表のセル部分をクリックすると、色がついていないセルはグレーで色付けされ、色がついているセルは色が消える(一覧表示されている確定シフトも連動して変わる)。「休み」状態のユーザーの表をクリックして色付けた場合、下のシフト部分も連動して変わり、相互での操作が可能。表左上部分の【残業モード】ボタンをクリックすると、ボタンがピンク色の【残業モード解除】に変わり、表をクリックした時の色付けがグレーからピンクに変わる。残業モード状態の時に表をクリックし、ピンク色に色付けすると、表下部のシフト部分は入・終時間ではなく、残業時間部分が変動される。【変更保存】ボタンをクリックすると、「変更を保存しました！」のポップアップが表示され、その日の全員分のシフト変更が保存される。保存されたあとは、シフト編集の元の画面に戻る。


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
- 特定のアルバイトの連続勤務日数がわかる
- 特定の時間帯に何人体制かがわかる
- 締め日・給料日などを設定
- アルバイトユーザー情報の管理
- ユーザー全員に対してメッセージを送信
- その日の就業データを元に日報を作成
- 日報データを元に月報を作成
- アルバイトが働いた時間帯によって深夜手当などを付与
- 給与明細の作成
- シフト交代希望や休み希望をメッセージで送信
- 全員分のシフトを日毎に確認
- 過去の自身の就業履歴を確認
- 月毎の給料暫定分を計算・確認


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