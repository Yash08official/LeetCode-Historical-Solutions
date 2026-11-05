---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1978. Employees Whose Manager Left the Company

**[View Problem on LeetCode](https://leetcode.com/problems/employees-whose-manager-left-the-company/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1978` (`1978`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given an `Employees` table with columns `employee_id` (primary key), `name`, `manager_id`, and `salary`. Top-level employees who report to nobody have `manager_id = NULL`. Whenever a manager leaves the company, their own row is deleted from `Employees`, while any direct reports keep their `manager_id` pointing to that departed manager's ID.

Write a SQL query to find the `employee_id` of every employee whose `salary` is strictly below `30000` (i.e., under `\$30,000`) and whose manager has left the company. Return the output sorted by `employee_id` in ascending order.

---

## Examples

### Example 1

```text
Input:
Employees table:
+-------------+-----------+------------+--------+
| employee_id | name      | manager_id | salary |
+-------------+-----------+------------+--------+
| 3           | Mila      | 9          | 60301  |
| 12          | Antonella | null       | 31000  |
| 13          | Emery     | null       | 67084  |
| 1           | Kalel     | 11         | 21241  |
| 9           | Mikaela   | null       | 50937  |
| 11          | Joziah    | 6          | 28485  |
+-------------+-----------+------------+--------+
Output:
+-------------+
| employee_id |
+-------------+
| 11          |
+-------------+

Explanation:
The employees with a salary less than $30000 are 1 (Kalel) and 11 (Joziah).
Kalel's manager is employee 11, who is still in the company (Joziah).
Joziah's manager is employee 6, who left the company because there is no row for employee 6 as it was deleted.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Three conditions must **all** hold simultaneously for an employee `e1`:
  1. `e1.salary < 30000` (strictly less than `30,000`).
  2. `e1.manager_id IS NOT NULL` (an employee with `manager_id = NULL` never had a manager—their manager did **not** leave!).
  3. `e1.manager_id` does not exist as an `employee_id` anywhere in `Employees`.
- Results must be sorted ascending by `employee_id`.

---

## Approach

### Brute Force Approach

A common baseline uses `WHERE salary < 30000 AND manager_id NOT IN (SELECT employee_id FROM Employees)`. While valid here because `employee_id` is a non-null primary key, `NOT IN` in SQL is a notorious footgun: if the subquery ever returns even a single `NULL` value, `NOT IN` evaluates to `UNKNOWN` for every non-matching row and returns an **empty table**!

### Optimized Approach

Perform a **self anti-join** (`Employees AS e1 LEFT JOIN Employees AS e2 ON e1.manager_id = e2.employee_id`), filter with `WHERE e1.salary < 30000 AND e1.manager_id IS NOT NULL AND e2.employee_id IS NULL`, and sort with `ORDER BY 1`.

### Step-by-Step Thinking Process

1. Alias `Employees` as `e1` for candidate employees and `LEFT JOIN` a second reference `Employees AS e2` representing each employee's manager via `ON e1.manager_id = e2.employee_id`.
2. Notice what happens to `e2.employee_id` after the `LEFT JOIN`: if the manager is still at the company, `e2.employee_id` matches `e1.manager_id`; if `e1.manager_id` is `NULL` OR the manager's row was deleted, `e2.employee_id` is `NULL`.
3. Distinguish 'manager left' from 'never had a manager' by requiring **both** `e1.manager_id IS NOT NULL` and `e2.employee_id IS NULL`.
4. Add the salary filter `e1.salary < 30000` and sort ascending by the first selected column (`ORDER BY 1`).

### Algorithm / Intuition

The self `LEFT JOIN` pairs each employee row `e1` with their manager's row `e2` when present. Checking `e2.employee_id IS NULL` implements a classic **Left Anti-Join** (finding rows in `e1` whose join key has no match in `e2`). Because an unmatched `LEFT JOIN` also occurs when `e1.manager_id` itself is `NULL`, the explicit guard `e1.manager_id IS NOT NULL` ensures we only keep orphaned reports whose manager actually existed and was deleted. Finally, `ORDER BY 1` orders the output by `e1.employee_id`.

---

## Dry Run

Tracing Example 1 on `Employees`:

| `e1.employee_id` (`name`) | `e1.salary` | `e1.manager_id` | Joined `e2.employee_id` | Passes `salary < 30000 AND manager_id IS NOT NULL AND e2.id IS NULL`? |
| :--- | :--- | :--- | :--- | :--- |
| `3` (`Mila`) | `60301` | `9` | `9` | No (`salary >= 30000`, manager present) |
| `12` (`Antonella`) | `31000` | `NULL` | `NULL` | No (`salary >= 30000`, `manager_id IS NULL`) |
| `13` (`Emery`) | `67084` | `NULL` | `NULL` | No (`salary >= 30000`, `manager_id IS NULL`) |
| `1` (`Kalel`) | `21241` | `11` | `11` | No (`e2.employee_id = 11` is not `NULL`) |
| `9` (`Mikaela`) | `50937` | `NULL` | `NULL` | No (`salary >= 30000`, `manager_id IS NULL`) |
| `11` (`Joziah`) | `28485` | `6` | `NULL` | **Yes!** (`28485 < 30000`, `6 IS NOT NULL`, `6` missing from `Employees`) |

Sorted output: `employee_id = 11`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — With `employee_id` indexed as the primary key, probing `e2` per row of `e1` takes `O(n)` (or `O(n log n)`), and `ORDER BY 1` sorts at most `n` matching IDs in `O(n log n)`.
- **Space Complexity:** `O(n)` — Temporary buffer used by the join and output sort.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1978employees-whose-manager-left-the-company.sql](./1978employees-whose-manager-left-the-company.sql) |

---

## Key Learnings

- Prefer **`LEFT JOIN ... WHERE right_pk IS NULL`** (or `NOT EXISTS`) over `NOT IN (subquery)` in production SQL to avoid silent `NULL` traps.
- When performing an anti-join on a nullable foreign key (`manager_id`), always explicitly filter `manager_id IS NOT NULL` unless `NULL` foreign keys are meant to be included!
