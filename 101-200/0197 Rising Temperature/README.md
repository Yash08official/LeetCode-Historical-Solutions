---
comments: true
difficulty: Easy
tags:
  - Database
---

# 197. Rising Temperature

**[View Problem on LeetCode](https://leetcode.com/problems/rising-temperature/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0197` (`197`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Weather` table containing daily temperature measurements:

- `id` (`int`): Unique identifier for each row.
- `recordDate` (`date`): The calendar date of the observation (no two rows share the same `recordDate`).
- `temperature` (`int`): The recorded temperature on that date.

Write a SQL query to return the `id` of every row whose `temperature` is strictly greater than the temperature recorded on the immediately preceding calendar day (yesterday). The output rows may be returned in any order.

---

## Examples

### Example 1

```text
Input:
Weather table:
+----+------------+-------------+
| id | recordDate | temperature |
+----+------------+-------------+
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |
+----+------------+-------------+
Output:
+----+
| id |
+----+
| 2  |
| 4  |
+----+
Explanation:
In 2015-01-02, the temperature was higher than the previous day (10 -> 25).
In 2015-01-04, the temperature was higher than the previous day (20 -> 30).
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

A critical detail in this problem is that we must compare a date against its **previous calendar day** (exactly `1` day earlier), not merely the preceding row sorted by `id` or `recordDate`. If there is a gap in the dates (for instance, `2015-01-01` followed by `2015-01-03`), `2015-01-03` has no yesterday record in the table and must not be compared against `2015-01-01`. Additionally, the temperature must be strictly greater (`>`), so equal temperatures do not qualify.

---

## Approach

### Brute Force Approach

A naive attempt might order rows by `recordDate` and use a window function like `LAG(temperature) OVER (ORDER BY recordDate)` without checking the date gap. While straightforward, that pitfall produces wrong results whenever dates are non-consecutive. From an execution standpoint, taking the Cartesian product of `Weather` with itself (`Weather a, Weather b`) inspects all `n * n` row pairs and filters down to consecutive dates with rising temperatures.

### Optimized Approach

Perform a self-join on the `Weather` table using two aliases (`a` for today and `b` for yesterday), filtering pairs where `DATEDIFF(a.Recorddate, b.Recorddate) = 1` and `a.Temperature > b.Temperature`, and selecting `DISTINCT a.Id`.

### Step-by-Step Thinking Process

1. To compare two different days side by side in SQL, alias the `Weather` table twice: `a` representing the candidate day and `b` representing the previous day.
2. Enforce the calendar-yesterday relationship using MySQL's `DATEDIFF(a.Recorddate, b.Recorddate) = 1`, which evaluates `a.Recorddate - b.Recorddate` in days and handles month/year boundaries (including leap years) automatically.
3. Filter those consecutive-day pairs with `a.Temperature > b.Temperature` so only strictly warmer days remain.
4. Project `DISTINCT a.Id` so each qualifying record ID appears once in the result set.

### Algorithm / Intuition

In MySQL, listing `FROM Weather a, Weather b` performs an implicit cross join between every row `a` and every row `b`. The `WHERE` clause acts as the join predicate and filter:
- `DATEDIFF(a.Recorddate, b.Recorddate) = 1` isolates pairs where `a.Recorddate` is exactly one calendar day after `b.Recorddate`.
- `a.Temperature > b.Temperature` checks that today's temperature exceeds yesterday's.
- `SELECT DISTINCT a.Id` guarantees uniqueness of the returned IDs (a defensive safeguard even though the schema guarantees unique `recordDate` values).

---

## Dry Run

Using Example 1 (`Weather` rows: `(1, 2015-01-01, 10)`, `(2, 2015-01-02, 25)`, `(3, 2015-01-03, 20)`, `(4, 2015-01-04, 30)`), only pairs satisfying `DATEDIFF(a.Recorddate, b.Recorddate) = 1` survive the date check:

| `a.Id` | `a.Recorddate` | `a.Temperature` | `b.Id` | `b.Recorddate` | `b.Temperature` | `DATEDIFF` | `a.Temp > b.Temp` | Kept? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `2015-01-01` | `10` | — | *(no `2014-12-31`)* | — | — | — | No |
| `2` | `2015-01-02` | `25` | `1` | `2015-01-01` | `10` | `1` | `25 > 10` (True) | **Yes (`2`)** |
| `3` | `2015-01-03` | `20` | `2` | `2015-01-02` | `25` | `1` | `20 > 25` (False) | No |
| `4` | `2015-01-04` | `30` | `3` | `2015-01-03` | `20` | `1` | `30 > 20` (True) | **Yes (`4`)** |

Result returned: `id` values `2` and `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — Because `DATEDIFF(a.Recorddate, b.Recorddate) = 1` applies a function across both columns, MySQL cannot use a standard B-tree index range scan and evaluates the nested-loop Cartesian product across `n` rows.
- **Space Complexity:** `O(n)` — Temporary buffer space used by the SQL engine to materialize the self-join intermediate buffer and apply `DISTINCT`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [197rising-temperature.sql](./197rising-temperature.sql) |

---

## Key Learnings

- Always verify calendar-day continuity (`DATEDIFF = 1`) rather than assuming adjacent rows in a table represent consecutive dates.
- MySQL's `DATEDIFF(date1, date2)` returns `date1 - date2` in days, so argument order matters (`today` first, `yesterday` second).
- In production databases with indexes on `recordDate`, rewriting the predicate as `a.recordDate = DATE_ADD(b.recordDate, INTERVAL 1 DAY)` makes the condition sargable so the optimizer can perform `O(n log n)` index lookups instead of an `O(n^2)` scan.
