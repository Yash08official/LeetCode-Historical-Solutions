---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1731. The Number of Employees Which Report to Each Employee

**[View Problem on LeetCode](https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1731` (`1731`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

We are given a single `Employees` table containing four columns: `employee_id` (unique integer identifier), `name` (varchar), `reports_to` (integer referencing a manager's `employee_id`, or `NULL` if the employee has no manager), and `age` (integer).

In this problem, a **manager** is defined as any employee who has at least one other employee reporting directly to them.

Write a SQL query to retrieve each manager's `employee_id` and `name`, the count of employees who report **directly** to them (`reports_count`), and the average age of those direct reports rounded to the nearest integer (`average_age`). The output must be sorted by `employee_id` in ascending order.

---

## Examples

### Example 1

```text
Input:
Employees table:
+-------------+---------+------------+-----+
| employee_id | name    | reports_to | age |
+-------------+---------+------------+-----+
| 9           | Hercy   | null       | 43  |
| 6           | Alice   | 9          | 41  |
| 4           | Bob     | 9          | 36  |
| 2           | Winston | null       | 37  |
+-------------+---------+------------+-----+
Output:
+-------------+-------+---------------+-------------+
| employee_id | name  | reports_count | average_age |
+-------------+-------+---------------+-------------+
| 9           | Hercy | 2             | 39          |
+-------------+-------+---------------+-------------+
Explanation: Hercy has 2 people report directly to him, Alice and Bob. Their average age is (41+36)/2 = 38.5, which is 39 after rounding it to the nearest integer.
```

### Example 2

```text
Input:
Employees table:
+-------------+---------+------------+-----+
| employee_id | name    | reports_to | age |
|-------------|---------|------------|-----|
| 1           | Michael | null       | 45  |
| 2           | Alice   | 1          | 38  |
| 3           | Bob     | 1          | 42  |
| 4           | Charlie | 2          | 34  |
| 5           | David   | 2          | 40  |
| 6           | Eve     | 3          | 37  |
| 7           | Frank   | null       | 50  |
| 8           | Grace   | null       | 48  |
+-------------+---------+------------+-----+
Output:
+-------------+---------+---------------+-------------+
| employee_id | name    | reports_count | average_age |
| ----------- | ------- | ------------- | ----------- |
| 1           | Michael | 2             | 40          |
| 2           | Alice   | 2             | 37          |
| 3           | Bob     | 1             | 37          |
+-------------+---------+---------------+-------------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Self-Referential Relationship:** Both managers and subordinates live in the same `Employees` table, linked by `subordinate.reports_to = manager.employee_id`.
- **Direct Reports Only:** Transitive reports (employees reporting to a subordinate manager) are not counted toward an upper-level manager's `reports_count` or `average_age`.
- **Filtering Non-Managers:** Employees with zero direct reports must be excluded, and rows with `reports_to IS NULL` do not contribute to any manager.
- **Rounding Behavior:** `ROUND(AVG(age))` rounds the average age of direct reports to the nearest integer (e.g., `38.5` rounds to `39`).

---

## Approach

### Brute Force Approach

A less direct baseline approach would first aggregate `reports_to`, `COUNT(*)`, and `ROUND(AVG(age))` in a subquery or Common Table Expression (CTE) filtering `WHERE reports_to IS NOT NULL GROUP BY reports_to`, and then join that derived table back to `Employees` to fetch each manager's `name`. While valid, materializing or Nesting an extra subquery adds unnecessary query verbosity when a single self-join handles filtering and lookup simultaneously.

### Optimized Approach

Perform an inner self-join on the `Employees` table matching each subordinate (`e1.reports_to`) to their manager (`e2.employee_id`), then group by the manager's ID to compute `COUNT(1)` and `ROUND(AVG(e1.age))`, ordered by `employee_id`.

### Step-by-Step Thinking Process

1. Alias two instances of `Employees`: `e1` representing direct reports (subordinates) and `e2` representing managers.
2. Use an `INNER JOIN` on `e1.reports_to = e2.employee_id`. This naturally excludes top-level rows where `e1.reports_to IS NULL` as well as any employee `e2` to whom nobody reports.
3. Group the joined rows by `e2.employee_id` (`GROUP BY 1`). Because `employee_id` is unique in `Employees`, `e2.name` is functionally dependent on `e2.employee_id`.
4. Calculate `COUNT(1) AS reports_count` for the number of direct reports and `ROUND(AVG(e1.age)) AS average_age` for their rounded mean age (making sure to average `e1.age`, not `e2.age`).
5. Sort the final rows by `e2.employee_id` using `ORDER BY 1`.

### Algorithm / Intuition

In the SQL query, `Employees AS e1` acts as the child (report) side and `Employees AS e2` acts as the parent (manager) side. Joining on `e1.reports_to = e2.employee_id` pairs every subordinate row `e1` with its direct manager's row `e2`. Grouping by the first selected column (`GROUP BY 1`, i.e., `e2.employee_id`) collapses all direct reports of a manager into one group. Inside each group, `COUNT(1)` counts the subordinate rows, and `ROUND(AVG(e1.age))` computes the exact `DECIMAL` average of the subordinates' ages and rounds half-way values to the nearest integer. Finally, `ORDER BY 1` sorts the managers in ascending order of `employee_id`.

---

## Dry Run

Using **Example 1**:

`Employees` rows: `(9, 'Hercy', null, 43)`, `(6, 'Alice', 9, 41)`, `(4, 'Bob', 9, 36)`, `(2, 'Winston', null, 37)`.

| `e1` (Subordinate) | `e1.reports_to` | `e1.age` | Matched `e2` (Manager) |
| :--- | :--- | :--- | :--- |
| `(9, 'Hercy')` | `null` | `43` | _No match (`INNER JOIN` drops)_ |
| `(6, 'Alice')` | `9` | `41` | `(9, 'Hercy')` |
| `(4, 'Bob')` | `9` | `36` | `(9, 'Hercy')` |
| `(2, 'Winston')` | `null` | `37` | _No match (`INNER JOIN` drops)_ |

- **Group `e2.employee_id = 9` (`'Hercy'`):**
  - `reports_count = COUNT(1) = 2`
  - `AVG(e1.age) = (41 + 36) / 2 = 38.5` -> `ROUND(38.5) = 39`
- **Ordered Output:** `(9, 'Hercy', 2, 39)`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Joining on the indexed unique key `employee_id`, grouping, and sorting up to `n` employee rows takes `O(n log n)` time in the worst case.
- **Space Complexity:** `O(n)` — Temporary hash/sort buffers for grouping and ordering hold at most `n` manager groups.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1731the-number-of-employees-which-report-to-each-employee.sql](./1731the-number-of-employees-which-report-to-each-employee.sql) |

---

## Key Learnings

- An `INNER JOIN` on `e1.reports_to = e2.employee_id` simultaneously drops `NULL` manager references and filters out employees with zero direct reports.
- Always verify which table alias is aggregated in self-joins: `AVG(e1.age)` averages the subordinates' ages, whereas `AVG(e2.age)` would mistakenly return the manager's own age.
- In MySQL, `GROUP BY` on a unique/primary key (`e2.employee_id`) validly allows selecting non-aggregated columns from the same table (`e2.name`) due to functional dependency.
