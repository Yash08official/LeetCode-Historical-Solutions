---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1907. Count Salary Categories

**[View Problem on LeetCode](https://leetcode.com/problems/count-salary-categories/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1907` (`1907`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

We are given an `Accounts` table with two columns: `account_id` (integer primary key) and `income` (integer representing monthly income).

Write a SQL query to count the number of bank accounts falling into each of three fixed salary brackets:
- `"Low Salary"`: `income` strictly less than `\$20,000` (`income < 20000`).
- `"Average Salary"`: `income` in the inclusive range `[\$20,000, \$50,000]` (`20000 <= income <= 50000`).
- `"High Salary"`: `income` strictly greater than `\$50,000` (`income > 50000`).

The output table **must** include all three categories, reporting `0` if a category has no matching accounts. Any row ordering is accepted.

---

## Examples

### Example 1

```text
Input:
Accounts table:
+------------+--------+
| account_id | income |
+------------+--------+
| 3          | 108939 |
| 2          | 12747  |
| 8          | 87709  |
| 6          | 91796  |
+------------+--------+
Output:
+----------------+----------------+
| category       | accounts_count |
+----------------+----------------+
| Low Salary     | 1              |
| Average Salary | 0              |
| High Salary    | 3              |
+----------------+----------------+
Explanation:
Low Salary: Account 2.
Average Salary: No accounts.
High Salary: Accounts 3, 6, and 8.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Zero-Count Categories Must Appear:** This is the central trap of the problem! If you simply write `SELECT CASE ... END AS category, COUNT(*) FROM Accounts GROUP BY category`, any category with `0` matching rows (such as `"Average Salary"` in Example 1) vanishes completely from the result!
- **Empty Table Edge Case:** If `Accounts` has `0` rows altogether, `SUM(condition)` returns `NULL` rather than `0`, whereas `COUNT` or `IFNULL(SUM(...), 0)` safely yields `0`.

---

## Approach

### Brute Force Approach

A naive `CASE WHEN` + `GROUP BY` fails whenever a category has zero accounts unless you explicitly construct a 3-row derived category table (`SELECT 'Low Salary' UNION SELECT 'Average Salary' UNION SELECT 'High Salary'`) and `LEFT JOIN` the grouped results onto it.

### Optimized Approach

Write three separate `SELECT` statements — one hardcoded to each category label — using `IFNULL(SUM(<predicate>), 0)` to count matching rows, and combine them with `UNION`.

### Step-by-Step Thinking Process

1. Create one `SELECT` per required category (`'Low Salary'`, `'Average Salary'`, `'High Salary'`) so all three rows are unconditionally emitted.
2. Leverage MySQL boolean-to-integer evaluation inside `SUM(...)`: `income < 20000`, `income BETWEEN 20000 AND 50000`, and `income > 50000` each evaluate to `1` when true and `0` when false.
3. Wrap each `SUM(...)` in `IFNULL(..., 0)` so an empty `Accounts` table returns `0` instead of `NULL`.
4. Join the three single-row queries using `UNION`.

### Algorithm / Intuition

Each `SELECT` branch is an ungrouped aggregate query (`SUM(...)` without `GROUP BY`), which SQL guarantees will always return **exacty one row** — even if zero rows match the predicate or the table is completely empty! In MySQL, `SUM(income < 20000)` sums `1` for every low-income row and `0` otherwise, and `IFNULL(..., 0)` converts `NULL` (when `Accounts` is empty) to `0`.

---

## Dry Run

Using **Example 1**:

`Accounts` rows: `(3, 108939)`, `(2, 12747)`, `(8, 87709)`, `(6, 91796)`.

| Branch Category | Predicate Evaluated on `[108939, 12747, 87709, 91796]` | `IFNULL(SUM(...), 0)` |
| :--- | :--- | :--- |
| `'Low Salary'` | `0 + 1 + 0 + 0` | `1` |
| `'Average Salary'` | `0 + 0 + 0 + 0` | `0` |
| `'High Salary'` | `1 + 0 + 1 + 1` | `3` |

`UNION` returns all three rows: `('Low Salary', 1)`, `('Average Salary', 0)`, `('High Salary', 3)`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Scans the `n` rows of `Accounts` three times (once per `UNION` branch), totaling `3n` = `O(n)` row evaluations.
- **Space Complexity:** `O(1)` — Aggregates into three fixed output rows without building hash tables proportional to `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1907count-salary-categories.sql](./1907count-salary-categories.sql) |

---

## Key Learnings

- `GROUP BY` never invents rows for absent groups; to guarantee fixed categories with `0` counts, either `LEFT JOIN` from a dimension/CTE of categories or `UNION` fixed aggregate queries.
- Ungrouped `SUM(condition)` returns `NULL` on an empty table, whereas `COUNT(CASE WHEN condition THEN 1 END)` or `IFNULL(SUM(condition), 0)` safely returns `0`.
- Using `UNION ALL` instead of `UNION` here is also slightly faster in production since the three literal `category` strings are already distinct.
