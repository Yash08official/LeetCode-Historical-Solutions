---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1141. User Activity for the Past 30 Days I

**[View Problem on LeetCode](https://leetcode.com/problems/user-activity-for-the-past-30-days-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1141` (`1141`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given an `Activity` table with columns `user_id`, `session_id`, `activity_date`, and `activity_type` (`'open_session'`, `'end_session'`, `'scroll_down'`, or `'send_message'`). The table has no primary key and may contain duplicate rows.

Find the **daily active user count** for each day within the **30-day period ending on `'2019-07-27'` inclusively** (i.e., from `'2019-06-28'` through `'2019-07-27'`). A user counts as active on a day if they performed at least one activity on that date. Only output dates that have at least one active user, with columns `day` and `active_users` in any order.

---

## Examples

### Example 1

```text
Input:
Activity table:
+---------+------------+---------------+---------------+
| user_id | session_id | activity_date | activity_type |
+---------+------------+---------------+---------------+
| 1       | 1          | 2019-07-20    | open_session  |
| 1       | 1          | 2019-07-20    | scroll_down   |
| 1       | 1          | 2019-07-20    | end_session   |
| 2       | 4          | 2019-07-20    | open_session  |
| 2       | 4          | 2019-07-21    | send_message  |
| 2       | 4          | 2019-07-21    | end_session   |
| 3       | 2          | 2019-07-21    | open_session  |
| 3       | 2          | 2019-07-21    | send_message  |
| 3       | 2          | 2019-07-21    | end_session   |
| 4       | 3          | 2019-06-25    | open_session  |
| 4       | 3          | 2019-06-25    | end_session   |
+---------+------------+---------------+---------------+
Output:
+------------+--------------+
| day        | active_users |
+------------+--------------+
| 2019-07-20 | 2            |
| 2019-07-21 | 2            |
+------------+--------------+
Explanation: Note that we do not care about days with zero active users.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Exact 30-Day Inclusive Window:** Ending on `'2019-07-27'` inclusively for `30` days means `DATEDIFF('2019-07-27', activity_date)` must be in `{0, 1, 2, ..., 29}` (`< 30` and `>= 0`).
- **Future Date Trap:** Checking `DATEDIFF('2019-07-27', activity_date) < 30` **alone** is a classic bug! For a future date like `'2019-08-05'`, `DATEDIFF('2019-07-27', '2019-08-05')` is `-9`, which satisfies `< 30`! Pairing it with `activity_date <= '2019-07-27'` prevents future rows from leaking in.
- **User Deduplication:** A user typically logs multiple activities (`open_session`, `scroll_down`, `end_session`) on the same day, and duplicate rows may exist, so we must count `DISTINCT user_id`.

---

## Approach

### Brute Force Approach

Selecting distinct `(activity_date, user_id)` in a derived table first without pushing the date-range filter into the `WHERE` clause forces the engine to deduplicate the entire historical `Activity` table before discarding out-of-window dates.

### Optimized Approach

Filter rows directly in the `WHERE` clause using `activity_date <= '2019-07-27' AND DATEDIFF('2019-07-27', activity_date) < 30`, group by `activity_date`, and count `COUNT(DISTINCT user_id)`.

### Step-by-Step Thinking Process

1. Bound the upper end of the date window with `activity_date <= '2019-07-27'` so post-July-27 rows are excluded.
2. Bound the lower end using `DATEDIFF('2019-07-27', activity_date) < 30`, which retains differences `0` (`2019-07-27`) through `29` (`2019-06-28`)—exactly `30` inclusive days.
3. Group the filtered records by `activity_date` (`GROUP BY 1`), which naturally omits days with zero activity.
4. Use `COUNT(DISTINCT user_id)` to count each active user once per day regardless of how many events they triggered.

### Algorithm / Intuition

In MySQL, `DATEDIFF(expr1, expr2)` computes `expr1 - expr2` in days. Combining `activity_date <= '2019-07-27'` (meaning `DATEDIFF >= 0`) with `DATEDIFF('2019-07-27', activity_date) < 30` isolates the exact closed interval `['2019-06-28', '2019-07-27']` without manually calculating June's day count.

`GROUP BY 1` groups matching rows by `activity_date AS day`, and `COUNT(DISTINCT user_id) AS active_users` counts unique users within each date bucket.

---

## Dry Run

Using **Example 1**:

1. **Filter by Date (`<= '2019-07-27'` and `DATEDIFF < 30`):**
   - `'2019-07-20'` rows (users `1, 1, 1, 2`): `DATEDIFF('2019-07-27', '2019-07-20') = 7 < 30` -> **kept**.
   - `'2019-07-21'` rows (users `2, 2, 3, 3, 3`): `DATEDIFF('2019-07-27', '2019-07-21') = 6 < 30` -> **kept**.
   - `'2019-06-25'` rows (users `4, 4`): `DATEDIFF('2019-07-27', '2019-06-25') = 32` (not `< 30`) -> **filtered out**.
2. **Group & Count Distinct Users:**
   - `'2019-07-20'`: distinct `user_id`s in `{1, 1, 1, 2}` -> `{1, 2}` -> `active_users = 2`.
   - `'2019-07-21'`: distinct `user_id`s in `{2, 2, 3, 3, 3}` -> `{2, 3}` -> `active_users = 2`.
3. **Output:** `('2019-07-20', 2)` and `('2019-07-21', 2)`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Scanning `n` rows in `Activity` and hash-grouping `(activity_date, user_id)` pairs takes `O(n)` average time.
- **Space Complexity:** `O(u)` — Hash aggregation tracks up to `u` distinct `(day, user_id)` pairs within the 30-day window (`u <= n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1141user-activity-for-the-past-30-days-i.sql](./1141user-activity-for-the-past-30-days-i.sql) |

---

## Key Learnings

- Always pair `DATEDIFF(end_date, col) < K` with `col <= end_date` (or use `col BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27'`) so negative date differences from future rows are rejected.
- An inclusive `30`-day period ending on day `D` spans `DATEDIFF` values `0` through `29` (`29` days subtracted, not `30`).
- `BETWEEN DATE_SUB(...) AND ...` is also sargable (can utilize an index on `activity_date` directly) in production databases.
