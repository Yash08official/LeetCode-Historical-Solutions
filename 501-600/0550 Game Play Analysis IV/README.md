---
comments: true
difficulty: Medium
tags:
  - Database
---

# 550. Game Play Analysis IV

**[View Problem on LeetCode](https://leetcode.com/problems/game-play-analysis-iv/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0550` (`550`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Activity` table with columns `player_id`, `device_id`, `event_date`, and `games_played`, where `(player_id, event_date)` is the composite primary key. Each row logs a player's activity on a specific date.

Write a SQL query to calculate the **fraction** of all distinct players who logged back in on the exact calendar day immediately following their **first-ever** login date. Round the resulting fraction to **2 decimal places** under the column alias `fraction`.

---

## Examples

### Example 1

```text
Input:
Activity table:
+-----------+-----------+------------+--------------+
| player_id | device_id | event_date | games_played |
+-----------+-----------+------------+--------------+
| 1         | 2         | 2016-03-01 | 5            |
| 1         | 2         | 2016-03-02 | 6            |
| 2         | 3         | 2017-06-25 | 1            |
| 3         | 1         | 2016-03-02 | 0            |
| 3         | 4         | 2018-07-03 | 5            |
+-----------+-----------+------------+--------------+
Output:
+-----------+
| fraction  |
+-----------+
| 0.33      |
+-----------+
Explanation:
Only the player with id 1 logged back in after the first day he had logged in so the answer is 1/3 = 0.33
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Initial Login Only:** A player logging in on two consecutive days later in their history does *not* count unless those two days are `first_login_date` and `first_login_date + 1 day`.
- **Uniqueness Guarantee:** Because `(player_id, event_date)` is the primary key, a player can have at most one record on `first_login_date + 1 day`. Joining a per-player summary back to `Activity` on that exact date will never duplicate player rows.
- **Denominator:** The denominator is the total number of distinct players in `Activity`, including those who never logged in a second time.

---

## Approach

### Brute Force Approach

A cumbersome baseline writes multiple separate subqueries: one subquery with `COUNT(DISTINCT player_id)` for the denominator, and another correlated subquery checking `WHERE (player_id, DATE_ADD(event_date, INTERVAL 1 DAY)) IN (...)` filtered against a third subquery finding `MIN(event_date)` per player. This scans the `Activity` table three times instead of twice.

### Optimized Approach

Aggregate `Activity` once by `player_id` to find each player's `MIN(event_date)`, `LEFT JOIN` back to `Activity` matching the next day via `DATEDIFF`, and compute the retention ratio directly using `ROUND(AVG(b.event_date IS NOT NULL), 2)`.

### Step-by-Step Thinking Process

1. Group `Activity` by `player_id` and select `MIN(event_date)` as subquery `a`; this produces exactly one row per unique player.
2. Perform a `LEFT JOIN` from `a` to `Activity AS b` on the same `player_id` and the next-day condition `DATEDIFF(a.event_date, b.event_date) = -1`.
3. Observe that in MySQL, `DATEDIFF(d1, d2)` computes `d1 - d2` in days, so `a.event_date - b.event_date = -1` holds if and only if `b.event_date` is one day after `a.event_date`.
4. For players who returned the next day, `b.event_date` is non-null (`b.event_date IS NOT NULL` evaluates to `1`); for everyone else, the `LEFT JOIN` fills `b.event_date` with `NULL` (evaluating to `0`).
5. Taking `AVG(b.event_date IS NOT NULL)` sums the `1`s and divides by the total row count of `a` (total distinct players), and `ROUND(..., 2)` formats the output.

### Algorithm / Intuition

Subquery `a` (`SELECT player_id, MIN(event_date) AS event_date FROM Activity GROUP BY 1`) establishes both each player's Day-0 baseline and the exact set of distinct players (one row per `player_id`).

When we `LEFT JOIN Activity AS b` using `a.player_id = b.player_id AND DATEDIFF(a.event_date, b.event_date) = -1`, the composite primary key `(player_id, event_date)` on `Activity` guarantees at most one matching row in `b` for each row in `a`. Consequently, the joined result still has one row per player. MySQL treats boolean expressions numerically (`TRUE = 1`, `FALSE = 0`), so `AVG(b.event_date IS NOT NULL)` cleanly computes `(retained players) / (total players)` without needing a separate `COUNT(DISTINCT player_id)` query.

---

## Dry Run

Tracing Example 1 on `Activity`:

1. **Subquery `a` (`MIN(event_date)` per `player_id`):**

| `a.player_id` | `a.event_date` |
| :--- | :--- |
| `1` | `2016-03-01` |
| `2` | `2017-06-25` |
| `3` | `2016-03-02` |

2. **`LEFT JOIN Activity AS b` (`DATEDIFF(a.event_date, b.event_date) = -1`):**

| `a.player_id` | `a.event_date` | `b.event_date` | `b.event_date IS NOT NULL` |
| :--- | :--- | :--- | :--- |
| `1` | `2016-03-01` | `2016-03-02` | `1` |
| `2` | `2017-06-25` | `NULL` | `0` |
| `3` | `2016-03-02` | `NULL` (`2018-07-03` has diff `-853`) | `0` |

3. **Aggregation:** `AVG(1, 0, 0) = 1 / 3 = 0.3333...` -> `ROUND(..., 2)` returns `0.33`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Finding `MIN(event_date)` per player scans the `N` rows of `Activity`, and joining back on the composite primary key `(player_id, event_date)` (or hash joining) runs in linear time.
- **Space Complexity:** `O(P)` — Temporary grouping state stores one `(player_id, event_date)` pair for each of the `P` distinct players.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [550game-play-analysis-iv.sql](./550game-play-analysis-iv.sql) |

---

## Key Learnings

- In MySQL, `AVG(condition)` is an idiomatic shorthand for `SUM(condition) / COUNT(*)` when computing ratios and retention rates.
- Note argument order in MySQL's `DATEDIFF(expr1, expr2)`: it returns `expr1 - expr2`, so `DATEDIFF(first_day, next_day)` equals `-1` (alternatively, `b.event_date = DATE_ADD(a.event_date, INTERVAL 1 DAY)` allows better index usage on `b.event_date`).
- Primary key constraints (`(player_id, event_date)`) are critical when using `AVG` after a `LEFT JOIN`, as duplicate matches in `b` would otherwise skew the denominator.
