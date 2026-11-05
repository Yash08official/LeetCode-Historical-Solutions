---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1789. Primary Department for Each Employee

**[View Problem on LeetCode](https://leetcode.com/problems/primary-department-for-each-employee/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1789` (`1789`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

We are given an `Employee` table with three columns: `employee_id` (int), `department_id` (int), and `primary_flag` (`ENUM('Y', 'N')`). The composite pair `(employee_id, department_id)` is the primary key.

An employee can belong to several departments, in which case they designate their main department with `primary_flag = 'Y'` and all other departments with `'N'`. However, when an employee belongs to **only one** department, their `primary_flag` for that lone department is stored as `'N'`.

Write a SQL query to report every employee along with their primary `department_id` (or their single `department_id` if they belong to just one department). The output can be in any order.

---

## Examples

### Example 1

```text
Input:
Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
| 1           | 1             | N            |
| 2           | 1             | Y            |
| 2           | 2             | N            |
| 3           | 3             | N            |
| 4           | 2             | N            |
| 4           | 3             | Y            |
| 4           | 4             | N            |
+-------------+---------------+--------------+
Output:
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
| 1           | 1             |
| 2           | 1             |
| 3           | 3             |
| 4           | 3             |
+-------------+---------------+
Explanation:
- The Primary department for employee 1 is 1.
- The Primary department for employee 2 is 1.
- The Primary department for employee 3 is 3.
- The Primary department for employee 4 is 3.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Two Disjoint Cases:** An employee's primary department row is identified either by:
  1. Explicitly having `primary_flag = 'Y'` (for multi-department employees), OR
  2. Being the **only** row for that `employee_id` in the entire table (`COUNT(*) = 1`, where `primary_flag` is `'N'`).
- **Composite Key:** `(employee_id, department_id)` is unique, and each employee has at most one primary department.

---

## Approach

### Brute Force Approach

A more complex query might compute `COUNT(*) OVER (PARTITION BY employee_id) AS cnt` in a subquery and filter `WHERE primary_flag = 'Y' OR cnt = 1`, or join `Employee` against a grouped count subquery. While window functions work in MySQL 8+, older SQL engines or simpler relational setups can express the two cases directly with `UNION`.

### Optimized Approach

Combine two straightforward queries using `UNION`: one selecting rows where `primary_flag = 'Y'`, and another grouping by `employee_id` with `HAVING COUNT(1) = 1` to capture single-department employees.

### Step-by-Step Thinking Process

1. First branch: fetch `(employee_id, department_id)` for all employees who explicitly marked their primary department (`WHERE primary_flag = 'Y'`).
2. Second branch: group `Employee` by `employee_id` (`GROUP BY 1`) and retain only groups containing a single row (`HAVING COUNT(1) = 1`).
3. Combine both result sets with `UNION`, which merges the two cases (and deduplicates if a single-department employee ever had `'Y'`).

### Algorithm / Intuition

Splitting the problem into its two business rules makes the SQL immediately readable. The first `SELECT` scans for `primary_flag = 'Y'`. The second `SELECT` groups rows by `employee_id` (`GROUP BY 1`) and filters `HAVING COUNT(1) = 1`; because those groups have exactly one row, `department_id` has only one possible value per group. `UNION` merges both sets of `(employee_id, department_id)` pairs into the final output.

---

## Dry Run

Using **Example 1**:

`Employee` rows: `(1,1,'N')`, `(2,1,'Y')`, `(2,2,'N')`, `(3,3,'N')`, `(4,2,'N')`, `(4,3,'Y')`, `(4,4,'N')`.

- **Query 1 (`WHERE primary_flag = 'Y'`):**
  - Returns `(2, 1)` and `(4, 3)`.
- **Query 2 (`GROUP BY employee_id HAVING COUNT(1) = 1`):**
  - Counts per `employee_id`: `1 -> 1`, `2 -> 2`, `3 -> 1`, `4 -> 3`.
  - Groups with count `1`: returns `(1, 1)` and `(3, 3)`.
- **`UNION` Result:** `(1, 1)`, `(2, 1)`, `(3, 3)`, `(4, 3)`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Grouping `n` rows and performing `UNION` deduplication takes `O(n log n)` (or `O(n)` with hash aggregation).
- **Space Complexity:** `O(n)` — Intermediate grouping and `UNION` buffers store up to `n` employee records.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1789primary-department-for-each-employee.sql](./1789primary-department-for-each-employee.sql) |

---

## Key Learnings

- Breaking disjunctive (`OR`) row-level vs. group-level conditions into two `UNION` branches often avoids nested subqueries.
- Note on SQL strictness: under strict `ONLY_FULL_GROUP_BY` SQL modes, writing `MAX(department_id)` in the `HAVING COUNT(1) = 1` branch ensures standard SQL compliance across all RDBMS engines.
