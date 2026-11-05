---
comments: true
difficulty: Hard
tags:
  - Database
---

# 185. Department Top Three Salaries

**[View Problem on LeetCode](https://leetcode.com/problems/department-top-three-salaries/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0185` (`185`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two relational tables:
- `Employee(id, name, salary, departmentId)` where `id` is the primary key and `departmentId` references `Department.id`.
- `Department(id, name)` where `id` is the primary key.

A **high earner** in a department is any employee whose salary falls within the **top three distinct salaries** of their own department. Write a SQL query to return `Department`, `Employee`, and `Salary` for every high earner across all departments in any order.

---

## Examples

### Example 1

```text
Input:
Employee table:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 85000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
| 7  | Will  | 70000  | 1            |
+----+-------+--------+--------------+
Department table:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
Output:
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| IT         | Joe      | 85000  |
| IT         | Randy    | 85000  |
| IT         | Will     | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |
+------------+----------+--------+
Explanation:
In the IT department:
- Max earns the highest unique salary
- Both Randy and Joe earn the second-highest unique salary
- Will earns the third-highest unique salary

In the Sales department:
- Henry earns the highest salary
- Sam earns the second-highest salary
- There is no third-highest salary as there are only two employees
```

---

## Constraints

- There are no employees with the **exact** same name, salary *and* department.

---

## Problem Understanding

- **Top 3 *Unique* Salaries (`DENSE_RANK` vs. `RANK` / `ROW_NUMBER`):** In Example 1's IT department (`90000, 85000, 85000, 70000, 69000`), `85000` is tied between Joe and Randy. Both Joe and Randy must be included (`2`nd highest unique salary), AND Will (`70000`) must *still* be included as the `3`rd highest unique salary!
  - `ROW_NUMBER()` would arbitrarily assign ranks `1, 2, 3, 4` and wrongly drop Will.
  - `RANK()` would assign `1, 2, 2, 4` (skipping `3`) and also wrongly drop Will!
  - `DENSE_RANK()` assigns `1, 2, 2, 3, 4` with **no gaps**, capturing exact unique salary tiers.
- **Fewer Than 3 Employees:** Departments with fewer than 3 unique salaries (like Sales with `80000` and `60000`) simply have all employees receive `rk <= 2 <= 3` and get included automatically.

---

## Approach

### Brute Force Approach

A correlated subquery approach (`WHERE (SELECT COUNT(DISTINCT e2.salary) FROM Employee e2 WHERE e2.departmentId = e1.departmentId AND e2.salary > e1.salary) < 3`) re-scans each department for every employee row, degrading to `O(n^2)` time on large departments.

### Optimized Approach

Use a **CTE (`T`) with `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)`** to compute each employee's unique-salary tier `rk` within their department, `JOIN` with `Department`, and filter `WHERE rk <= 3`.

### Step-by-Step Thinking Process

1. Partition `Employee` rows by `departmentId` and sort each partition by `salary DESC` inside a `DENSE_RANK()` window function aliased as `rk`.
2. Wrap that windowed query in CTE `T` because SQL does not allow referencing window function aliases directly in the same `SELECT` block's `WHERE` clause.
3. Inner-join `T AS t` with `Department AS d` on `t.departmentId = d.id` to resolve each department's human-readable name.
4. Filter `WHERE rk <= 3` and project `d.name AS Department, t.name AS Employee, salary AS Salary`.

### Algorithm / Intuition

`PARTITION BY departmentId` resets ranking independently for each department, while `ORDER BY salary DESC` places the highest earners at rank `1`. Because `DENSE_RANK()` increments by `1` only when `salary` strictly decreases, `rk` equals the exact `1`-based ordinal of each employee's salary among **distinct** salaries in that department. Filtering `rk <= 3` after joining `Department` keeps all employees tied across the top 3 salary tiers.

---

## Dry Run

Trace on **Example 1**:

1. **CTE `T` computes `DENSE_RANK()` per `departmentId`:**
   - Partition `departmentId = 1` (IT), ordered by `salary DESC`:
     - Max (`90000`) -> `rk = 1`
     - Joe (`85000`), Randy (`85000`) -> `rk = 2` (tie!)
     - Will (`70000`) -> `rk = 3` (no gap after tie)
     - Janet (`69000`) -> `rk = 4`
   - Partition `departmentId = 2` (Sales), ordered by `salary DESC`:
     - Henry (`80000`) -> `rk = 1`
     - Sam (`60000`) -> `rk = 2`
2. **`JOIN Department` & `WHERE rk <= 3`:**
   - Excludes Janet (`rk = 4`), keeping Max, Joe, Randy, Will (`IT`) and Henry, Sam (`Sales`).

---

## Complexity Analysis

- **Time Complexity:** `O(n log n + m)` — Sorting `n` `Employee` rows by `(departmentId, salary DESC)` for `DENSE_RANK()` takes `O(n log n)` time, and joining against `m` `Department` rows via primary key `d.id` takes `O(n + m)`.
- **Space Complexity:** `O(n)` — Temporary storage to partition/sort `Employee` rows and hold CTE `T`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [185department-top-three-salaries.sql](./185department-top-three-salaries.sql) |

---

## Key Learnings

- Memorize the triad of SQL ranking functions: `ROW_NUMBER()` (`1, 2, 3, 4` — arbitrary tie-break), `RANK()` (`1, 2, 2, 4` — olympic podium with gaps), `DENSE_RANK()` (`1, 2, 2, 3` — top-N distinct values without gaps).
- Because SQL evaluates `WHERE` *before* `SELECT` window functions, always wrap `DENSE_RANK()` inside a CTE or subquery before filtering `WHERE rk <= 3`.
- Filtering `WHERE rk <= 3` inside or before the `JOIN` (which modern SQL optimizers push down automatically) reduces join work when `k` is small relative to department size.
