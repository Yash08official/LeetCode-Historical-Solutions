---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1075. Project Employees I

**[View Problem on LeetCode](https://leetcode.com/problems/project-employees-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1075` (`1075`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two tables: `Project` (with composite primary key `(project_id, employee_id)`) and `Employee` (with primary key `employee_id`, plus `name` and non-null `experience_years`). Each row in `Project` links an employee to a project they work on.

Write an SQL query to calculate the **average years of experience** of all employees assigned to each `project_id`, rounded to **2 decimal places** as `average_years`. Return the result in any order.

---

## Examples

### Example 1

```text
Input:
Project table:
+-------------+-------------+
| project_id  | employee_id |
+-------------+-------------+
| 1           | 1           |
| 1           | 2           |
| 1           | 3           |
| 2           | 1           |
| 2           | 4           |
+-------------+-------------+
Employee table:
+-------------+--------+------------------+
| employee_id | name   | experience_years |
+-------------+--------+------------------+
| 1           | Khaled | 3                |
| 2           | Ali    | 2                |
| 3           | John   | 1                |
| 4           | Doe    | 2                |
+-------------+--------+------------------+
Output:
+-------------+---------------+
| project_id  | average_years |
+-------------+---------------+
| 1           | 2.00          |
| 2           | 2.50          |
+-------------+---------------+
Explanation: The average experience years for the first project is (3 + 2 + 1) / 3 = 2.00 and for the second project is (3 + 2) / 2 = 2.50
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Relational Mapping:** `Project` only stores `employee_id`, whereas `experience_years` lives in `Employee`. Joining the two tables on `employee_id` brings each assigned worker's experience next to their `project_id`.
- **Guaranteed Referential & Non-Null Integrity:** Because `employee_id` in `Project` is a foreign key referencing `Employee` and `experience_years` is guaranteed `NOT NULL`, an inner `JOIN` preserves every project-employee assignment without losing any project or miscounting `AVG` denominators.
- **Precision Requirement:** `AVG(experience_years)` must be wrapped in `ROUND(..., 2)`.

---

## Approach

### Brute Force Approach

A naive approach might run a correlated subquery inside `SELECT` for each distinct project: `SELECT DISTINCT p.project_id, (SELECT ROUND(AVG(e.experience_years), 2) FROM Project p2 JOIN Employee e ... WHERE p2.project_id = p.project_id) FROM Project p`. Without decorrelation, repeating scans per project is needlessly expensive compared to a single join and group aggregation.

### Optimized Approach

Perform an inner `JOIN` between `Project` and `Employee` `USING (employee_id)`, group rows by `project_id`, and compute `ROUND(AVG(experience_years), 2) AS average_years`.

### Step-by-Step Thinking Process

1. Match each row in `Project` with its corresponding employee record in `Employee` via `JOIN Employee USING (employee_id)`.
2. Group the joined rows by `project_id` (`GROUP BY 1` refers to the first column in the `SELECT` list).
3. Compute the mean experience per group with `AVG(experience_years)` and format to two decimal places using `ROUND(..., 2)`.
4. Alias the calculated column as `average_years`.

### Algorithm / Intuition

The clause `Project JOIN Employee USING (employee_id)` joins both tables on the shared `employee_id` column without duplicating the join column in scope. `GROUP BY 1` groups rows by the first selected expression (`project_id`). Within each group, MySQL's `AVG(experience_years)` sums the integers and divides by the count of employees on that project using decimal arithmetic, and `ROUND(..., 2)` rounds the result to two fractional digits.

---

## Dry Run

Using **Example 1**:

1. **Join `Project` and `Employee` on `employee_id`:**
   - `(project_id=1, emp=1)` -> `experience_years = 3`
   - `(project_id=1, emp=2)` -> `experience_years = 2`
   - `(project_id=1, emp=3)` -> `experience_years = 1`
   - `(project_id=2, emp=1)` -> `experience_years = 3`
   - `(project_id=2, emp=4)` -> `experience_years = 2`
2. **Group by `project_id` and Aggregate:**
   - `project_id = 1`: `ROUND((3 + 2 + 1) / 3, 2)` = `ROUND(2.0000, 2)` = `2.00`.
   - `project_id = 2`: `ROUND((3 + 2) / 2, 2)` = `ROUND(2.5000, 2)` = `2.50`.
3. **Output:** `(1, 2.00)` and `(2, 2.50)`.

---

## Complexity Analysis

- **Time Complexity:** `O(P + E)` — Building a hash/primary-key lookup on `Employee` (`E` rows) and probing it for each row in `Project` (`P` rows) followed by hash aggregation takes linear time.
- **Space Complexity:** `O(K + E)` — Hash join and grouping require memory proportional to the `E` employee rows (if hashed) and `K` distinct `project_id` groups.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1075project-employees-i.sql](./1075project-employees-i.sql) |

---

## Key Learnings

- `JOIN ... USING (column_name)` is a concise SQL shorthand for `ON a.column_name = b.column_name` when both tables share the exact same join column name.
- When foreign-key constraints guarantee every child row has a matching parent row, `INNER JOIN` is both accurate and faster than `LEFT JOIN`.
- In MySQL, `AVG()` on integer columns automatically performs decimal division (unlike integer `/` in dialects such as SQL Server or PostgreSQL `AVG` formatting quirks), and `ROUND(val, 2)` enforces exact two-decimal rounding.
