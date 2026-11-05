---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1934. Confirmation Rate

**[View Problem on LeetCode](https://leetcode.com/problems/confirmation-rate/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1934` (`1934`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two database tables:

- `Signups(user_id, time_stamp)`: stores each registered user's unique `user_id` and signup timestamp.
- `Confirmations(user_id, time_stamp, action)`: logs every confirmation message requested by `user_id`, where `action` is an `ENUM('confirmed', 'timeout')`.

A user's **confirmation rate** is defined as the number of `'confirmed'` actions divided by that user's total confirmation requests, rounded to **2 decimal places**. Users in `Signups` who have never requested any confirmation message have a confirmation rate of `0.00`.

Write a SQL query to return `user_id` and `confirmation_rate` for every user in `Signups` in any order.

---

## Examples

### Example 1

```text
Input:
Signups table:
+---------+---------------------+
| user_id | time_stamp          |
+---------+---------------------+
| 3       | 2020-03-21 10:16:13 |
| 7       | 2020-01-04 13:57:59 |
| 2       | 2020-07-29 23:09:44 |
| 6       | 2020-12-09 10:39:37 |
+---------+---------------------+
Confirmations table:
+---------+---------------------+-----------+
| user_id | time_stamp          | action    |
+---------+---------------------+-----------+
| 3       | 2021-01-06 03:30:46 | timeout   |
| 3       | 2021-07-14 14:00:00 | timeout   |
| 7       | 2021-06-12 11:57:29 | confirmed |
| 7       | 2021-06-13 12:58:28 | confirmed |
| 7       | 2021-06-14 13:59:27 | confirmed |
| 2       | 2021-01-22 00:00:00 | confirmed |
| 2       | 2021-02-28 23:59:59 | timeout   |
+---------+---------------------+-----------+
Output:
+---------+-------------------+
| user_id | confirmation_rate |
+---------+-------------------+
| 6       | 0.00              |
| 3       | 0.00              |
| 7       | 1.00              |
| 2       | 0.50              |
+---------+-------------------+
Explanation:
User 6 did not request any confirmation messages. The confirmation rate is 0.
User 3 made 2 requests and both timed out. The confirmation rate is 0.
User 7 made 3 requests and all were confirmed. The confirmation rate is 1.
User 2 made 2 requests where one was confirmed and the other timed out. The confirmation rate is 1 / 2 = 0.5.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Every user from `Signups` **must** appear in the output, even if they have zero rows in `Confirmations`. Using an `INNER JOIN` or querying only `Confirmations` would silently drop users like User `6`.
- For users with zero confirmation requests, joining `Signups` to `Confirmations` produces a single row where `Confirmations.action` is `NULL`, which must evaluate to `0.00` rather than `NULL`.
- Ratios must be rounded to 2 decimal places using `ROUND(..., 2)`.

---

## Approach

### Brute Force Approach

A verbose baseline uses multiple CTEs or correlated subqueries: one subquery counting `action = 'confirmed'` per user, a second subquery counting total rows in `Confirmations` per user, and a `CASE WHEN total = 0 THEN 0 ELSE confirmed / total END` joined back onto `Signups`. Scanning `Confirmations` repeatedly is unnecessary when conditional aggregation can compute everything in one grouped pass.

### Optimized Approach

Perform a `LEFT JOIN` from `SignUps` to `Confirmations` using `user_id`, `GROUP BY` `user_id`, and compute the rate in a single pass with `ROUND(IFNULL(SUM(action = 'confirmed') / COUNT(1), 0), 2)`.

### Step-by-Step Thinking Process

1. Start from `SignUps` and `LEFT JOIN Confirmations USING (user_id)` so every registered user is preserved, with unmatched users receiving `action = NULL`.
2. Group the joined rows by `user_id` (`GROUP BY 1`).
3. Use MySQL's boolean-to-integer evaluation `action = 'confirmed'`, which evaluates to `1` when `'confirmed'`, `0` when `'timeout'`, and `NULL` when `action` is `NULL` (unmatched user).
4. Divide `SUM(action = 'confirmed')` by `COUNT(1)`: for users with requests, `COUNT(1)` equals their total request count; for users with no requests, `SUM(NULL)` is `NULL`, so `NULL / 1` yields `NULL`, which `IFNULL(..., 0)` cleanly converts to `0`.
5. Wrap the result in `ROUND(..., 2)` and alias it as `confirmation_rate`.

### Algorithm / Intuition

In MySQL, table names are case-insensitive (`SignUps`), and `USING (user_id)` merges the join key into column position `1` (`GROUP BY 1`). For any user with `k >= 1` rows in `Confirmations`, `COUNT(1)` is `k` and `SUM(action = 'confirmed')` counts how many of those `k` rows had `'confirmed'`. Notice the subtle edge case for a user with **zero** rows in `Confirmations`: the `LEFT JOIN` emits 1 row with `action = NULL`. Here `COUNT(1)` is `1`, NOT `0`—yet `action = 'confirmed'` evaluates to `NULL = 'confirmed'`, which is `NULL` in SQL three-valued logic! Consequently, `SUM(NULL)` is `NULL`, `NULL / 1` is `NULL`, and `IFNULL(..., 0)` turns it into `0` before `ROUND(..., 2)` formats it to `0.00`.

---

## Dry Run

Tracing Example 1 after `SignUps LEFT JOIN Confirmations USING (user_id)` and `GROUP BY user_id`:

| `user_id` | Joined `action` Values | `SUM(action = 'confirmed')` | `COUNT(1)` | `IFNULL(SUM / COUNT, 0)` | `ROUND(..., 2)` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `6` | `[NULL]` | `NULL` | `1` | `0` | `0.00` |
| `3` | `['timeout', 'timeout']` | `0` | `2` | `0.0000` | `0.00` |
| `7` | `['confirmed', 'confirmed', 'confirmed']` | `3` | `3` | `1.0000` | `1.00` |
| `2` | `['confirmed', 'timeout']` | `1` | `2` | `0.5000` | `0.50` |

---

## Complexity Analysis

- **Time Complexity:** `O(S + C)` average (or `O(S log S + C log C)` depending on execution plan) — Joins and aggregates `S` rows in `Signups` with `C` rows in `Confirmations` in a single grouped pass.
- **Space Complexity:** `O(S)` — Maintains aggregation accumulators for each distinct `user_id` in `Signups`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1934confirmation-rate.sql](./1934confirmation-rate.sql) |

---

## Key Learnings

- Always anchor user-level reporting queries on the parent entity table (`Signups`) with a `LEFT JOIN` so users with zero activity rows are never lost.
- In MySQL, `AVG(action = 'confirmed')` or `SUM(action = 'confirmed') / COUNT(1)` paired with `IFNULL(..., 0)` replaces verbose `CASE WHEN` subqueries; remember that `NULL = 'confirmed'` evaluates to `NULL` (not `0`), which makes `IFNULL` essential.
- Be careful with `COUNT(1)` vs `COUNT(action)` after a `LEFT JOIN`: `COUNT(1)` counts `1` for an unmatched row, whereas `SUM(action = 'confirmed')` becomes `NULL` and triggers `IFNULL`.
