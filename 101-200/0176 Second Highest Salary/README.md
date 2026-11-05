---
comments: true
difficulty: Medium
tags:
  - Database
---

# 176. Second Highest Salary

**[View Problem on LeetCode](https://leetcode.com/problems/second-highest-salary/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0176` (`176`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given an `Employee` table with columns `id` (primary key, `int`) and `salary` (`int`). Write a SQL query to report the **second highest distinct salary** across all employees as a single column named `SecondHighestSalary`.

If the table has fewer than two distinct salary values (for example, only one employee or all employees earn the exact same salary), the query must still return **one row containing `null`**.

---

## Examples

### Example 1

```text
Input:
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
Output:
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
```

### Example 2

```text
Input:
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
Output:
+---------------------+
| SecondHighestSalary |
+---------------------+
| null                |
+---------------------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Distinct Salaries Required:** If two employees tie for the top salary (e.g., `300, 300, 200`), the second highest *distinct* salary is `200`, not `300`—so deduplication (`DISTINCT`) is mandatory before offsetting.
- **Empty Result vs. `NULL` Scalar Pitfall:** A plain `SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1, 1` returns **zero rows** (`Empty set`) when no second distinct salary exists, which fails LeetCode's expected single-row `[null]` output!
- **Scalar Subquery Trick:** Wrapping a query inside `SELECT ( ... ) AS SecondHighestSalary;` turns it into a scalar subquery expression that automatically evaluates to `NULL` whenever the inner query returns zero rows.

---

## Approach

### Brute Force Approach

A naive query without `DISTINCT` fails on duplicate top salaries, and a bare `LIMIT 1 OFFSET 1` without an outer scalar `SELECT` (or `IFNULL`/`MAX` aggregation) fails Example 2 by returning an empty result set instead of a `null` row.

### Optimized Approach

Use an **Outer Scalar `SELECT` Wrapping a `DISTINCT ... ORDER BY ... LIMIT 1, 1` Subquery**. The inner query sorts unique salaries descending, skips the highest `1` row, takes the next `1` row, and the outer `SELECT` guarantees `null` if fewer than 2 distinct salaries exist.

### Step-by-Step Thinking Process

1. Extract unique salary values from `Employee` using `SELECT DISTINCT salary`.
2. Sort those unique salaries from highest to lowest with `ORDER BY salary DESC`.
3. Use MySQL's two-argument `LIMIT 1, 1` syntax (equivalent to `LIMIT 1 OFFSET 1`) to skip index `0` (highest salary) and fetch index `1` (second highest salary).
4. Wrap the entire query inside `SELECT ( ... ) AS SecondHighestSalary;` so MySQL always emits exactly one row, substituting `NULL` if the inner subquery returns 0 rows.

### Algorithm / Intuition

In MySQL, `LIMIT offset, row_count` uses a `0`-based offset: `LIMIT 1, 1` skips the `1`st row (highest distinct salary) and returns at most `1` row (the second highest). Because a scalar subquery in the `SELECT` list with no outer `FROM` clause always produces a 1-row result table, an empty inner result cleanly coerces to `NULL` under the alias `SecondHighestSalary`.

---

## Dry Run

Trace on **Example 1** (`Employee = [(1, 100), (2, 200), (3, 300)]`) and **Example 2** (`Employee = [(1, 100)]`):

- **Example 1:**
  1. `SELECT DISTINCT salary FROM Employee` -> `{100, 200, 300}`.
  2. `ORDER BY salary DESC` -> `[300, 200, 100]`.
  3. `LIMIT 1, 1` skips `300` (offset `1`) and selects `200` (count `1`).
  4. Outer `SELECT (...) AS SecondHighestSalary` outputs `200`.
- **Example 2:**
  1. `DISTINCT` + `ORDER BY salary DESC` -> `[100]`.
  2. `LIMIT 1, 1` skips `100` and finds no second row (empty result).
  3. Outer scalar `SELECT (...) AS SecondHighestSalary` outputs `null`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Without an index on `salary`, MySQL scans `n` rows and sorts/deduplicates them in `O(n log n)` time (or `O(n)` if scanning a descending B-tree index on `salary` until the 2nd distinct value).
- **Space Complexity:** `O(n)` — Temporary sort/hash table storage for `DISTINCT` salaries in the worst case.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [176second-highest-salary.sql](./176second-highest-salary.sql) |

---

## Key Learnings

- Wrapping a `LIMIT` query inside `SELECT (subquery) AS alias;` is the cleanest SQL idiom to convert an empty `0`-row result into a `1`-row `NULL` result.
- In MySQL, `LIMIT a, b` means `OFFSET a` and `LIMIT b`—writing `LIMIT 1 OFFSET 1` is ANSI-friendly and avoids mixing up argument order for larger offsets like `N`-th highest salary.
- An alternative `O(n)` two-pass aggregation without sorting is `SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);`, where `MAX` over zero rows also naturally returns `NULL`.
