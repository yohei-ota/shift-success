# テーブル設計

## admins テーブル

| Column             | Type    | Options                   |
| ------------------ | ------- | ------------------------- |
| name               | string  | null: false               |
| email              | string  | null: false, unique: true |
| encrypted_password | string  | null: false               |
| group_name         | string  | null: false               |
| pay_day            | date    | default: null             |
| dead_line          | date    | default: null             |

### Association

- has_many :daily_reports
- has_many :messages, dependent: :destroy
- has_many :user_admin_rooms, dependent: :destroy
- has_many :rooms, through: :user_admin_rooms

## users テーブル

| Column             | Type    | Options                   |
| ------------------ | ------- | ------------------------- |
| name               | string  | null: false               |
| email              | string  | null: false, unique: true |
| encrypted_password | string  | null: false               |
| hourly_wage        | integer | default: null             |

### Association

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

### Association

- belongs_to :user
- belongs_to :admin
- belongs_to :room


## rooms テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :user_admin_rooms, dependent: :destroy
- has_many :user, through: :user_admin_rooms
- has_many :messages, dependent: :destroy


## messages テーブル

| Column   | Type      | Options                        |
| -------- | --------- | ------------------------------ |
| content  | text      | null: false                    |
| user_id  | reference | null: false, foreign_key: true |
| room_id  | reference | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user
- belongs_to :admin


## work_schedules テーブル

| Column       | Type      | Options                       |
| ------------ | --------- | ----------------------------- |
| datetime_in  | datetime  |                               |
| datetime_out | datetime  |                               |
| holiday      | boolean   | default: false                |
| user_id      | reference | nul: false, foreign_key: true |

### Association

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

### Association

- belongs_to :user
- belongs_to :daily_report


## daily_reports テーブル

| Column            | Type      | Options                           |
| ----------------- | --------- | --------------------------------- |
| sales             | float     |                                   |
| comments          | text      |                                   |
| admin_id          | reference | null: false, foreign_key: true    |
| monthly_report_id | reference | optional: true, foreign_key: true |

### Association

- has_many :actual_works
- belongs_to :admin
- belongs_to :monthly_report



## monthly_reports テーブル

| Column          | Type      | Options                        |
| --------------- | --------- | ------------------------------ |
| sales           | float     |                                |
| comments        | text      |                                |

### Association

- has_many :daily_reports