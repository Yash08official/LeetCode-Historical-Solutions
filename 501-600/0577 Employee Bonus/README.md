---
comments: true
difficulty: Easy
tags:
  - Database
---

# 577. Employee Bonus

**[View Problem on LeetCode](https://leetcode.com/problems/employee-bonus/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0577` (`577`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two tables:
- `Employee` (`empId` unique key, `name`, `supervisor`, `salary`)
- `Bonus` (`empId` unique key referencing `Employee.empId`, `bonus`)

Write a SQL query to report the `name` and `bonus` amount of every employee who either received a bonus **strictly less than `1000`** or **did not receive any bonus at all** (shown as `null`). Return the rows in any order.

---

## Examples

### Example 1

```text
Input:
Employee table:
+-------+--------+------------+--------+
| empId | name   | supervisor | salary |
+-------+--------+------------+--------+
| 3     | Brad   | null       | 4000   |
| 1     | John   | 3          | 1000   |
| 2     | Dan    | 3          | 2000   |
| 4     | Thomas | 3          | 4000   |
+-------+--------+------------+--------+
Bonus table:
+-------+-------+
| empId | bonus |
+-------+-------+
| 2     | 500   |
| 4     | 2000  |
+-------+-------+
Output:
+------+-------+
| name | bonus |
+------+-------+
| Brad | null  |
| John | null  |
| Dan  | 500   |
+------+-------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Missing Rows vs. Zero Bonus:** Employees without a bonus have no record in the `Bonus` table. An `INNER JOIN` would drop these employees completely, so a `LEFT JOIN` from `Employee` to `Bonus` is mandatory.
- **`NULL` Pitfall in `WHERE`:** After a `LEFT JOIN`, employees with no bonus have `bonus = NULL`. Writing `WHERE bonus < 1000` alone fails to include them because `NULL < 1000` evaluates to `UNKNOWN` in SQL!

---

## Approach

### Brute Force Approach

A verbose baseline uses `UNION ALL` to combine two separate queries: one joining `Employee` and `Bonus` where `bonus < 1000`, and another selecting `name, NULL AS bonus` from `Employee WHERE empId NOT IN (SELECT empId FROM Bonus)`. This scans `Employee` and `Bonus` twice.

### Optimized Approach

Perform a single `LEFT JOIN` from `Employee` to `Bonus` `USING (empId)` and filter rows using `WHERE IFNULL(bonus, 0) < 1000`.

### Step-by-Step Thinking Process

1. Start from `Employee` and `LEFT JOIN Bonus USING (empId)` so every employee is retained, with unmatched rows getting `bonus = NULL`.
2. Observe that `empId` is unique in both tables, so the `LEFT JOIN` produces exactly one row per employee.
3. To accept both `bonus < 1000` and `bonus IS NULL` in one expression, wrap `bonus` in `IFNULL(bonus, 0)` inside the `WHERE` clause (assuming non-negative or `< 1000` replacement value `0`).
4. Keep `SELECT name, bonus` untouched so unmatched employees still display `null` in the output rather than `0`.

### Algorithm / Intuition

In `Employee LEFT JOIN Bonus USING (empId)`, every employee row from `Employee` is preserved. If a matching `empId` exists in `Bonus`, its `bonus` value is attached; otherwise, `bonus` is `NULL`.

In the filter `WHERE IFNULL(bonus, 0) < 1000`, `IFNULL(bonus, 0)` substitutes `0` whenever `bonus` is `NULL`. Since `0 < 1000` is `TRUE`, all unbonused employees pass the filter alongside employees whose actual `bonus` is `< 1000`. Crucially, `IFNULL` is only applied in `WHERE`, so `SELECT name, bonus` still outputs the raw `NULL` for unbonused employees as required.

---

## Dry Run

Tracing Example 1:

| `empId` | `name` | Joined `bonus` | `IFNULL(bonus, 0) < 1000` | Kept? |
| :--- | :--- | :--- | :--- | :--- |
| `3` | `Brad` | `NULL` | `0 < 1000` (`TRUE`) | Yes -> `(Brad, null)` |
| `1` | `John` | `NULL` | `0 < 1000` (`TRUE`) | Yes -> `(John, null)` |
| `2` | `Dan` | `500` | `500 < 1000` (`TRUE`) | Yes -> `(Dan, 500)` |
| `4` | `Thomas` | `2000` | `2000 < 1000` (`FALSE`) | No |

Output contains `(Brad, null)`, `(John, null)`, and `(Dan, 500)`.

---

## Complexity Analysis

- **Time Complexity:** `O(N + M)` — Scanning `Employee` (`N` rows) and probing `Bonus` (`M` rows) via primary/unique key index or hash join runs in linear time.
- **Space Complexity:** `O(M)` — If executed via hash outer join without an index scan, building the hash table on `Bonus` uses `O(M)` space (`O(1)` auxiliary space with an index lookup on `Bonus.empId`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [577employee-bonus.sql](./577employee-bonus.sql) |

---

## Key Learnings

- Filtering a right-table column in `WHERE` after a `LEFT JOIN` silently turns the join into an `INNER JOIN` unless `NULL` values are explicitly handled (`IS NULL` or `IFNULL`/`COALESCE`).
- Transforming a column inside `WHERE` (`IFNULL(bonus, 0)`) does not alter the raw `NULL` returned in `SELECT bonus`.
- Note: `WHERE bonus < 1000 OR bonus IS NULL` is an ANSI-standard equivalent that also allows index range usage if needed.
