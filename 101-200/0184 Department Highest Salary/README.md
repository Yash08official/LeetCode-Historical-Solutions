---
comments: true
difficulty: Medium
tags:
  - Database
---

# 184. Department Highest Salary

**[View Problem on LeetCode](https://leetcode.com/problems/department-highest-salary/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0184` (`184`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Employee`

```text
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
id is the primary key (column with unique values) for this table.
departmentId is a foreign key (reference columns) of the ID from the `Department `table.
Each row of this table indicates the ID, name, and salary of an employee. It also contains the ID of their department.
```

 

Table: `Department`

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. It is guaranteed that department name is not `NULL.`
Each row of this table indicates the ID of a department and its name.
```

 

Write a solution to find employees who have the highest salary in each of the departments.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
Employee table:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
Department table:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
**Output:** 
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Jim      | 90000  |
| Sales      | Henry    | 80000  |
| IT         | Max      | 90000  |
+------------+----------+--------+
**Explanation:** Max and Jim both have the highest salary in the IT department and Henry has the highest salary in the Sales department.
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Find employees who have the highest salary in each of the departments.

---

## Approach

### Optimized Approach (CTE with Window Function RANK() OVER PARTITION BY)

1. Define a Common Table Expression (CTE) `T`:
   - Join `Employee` with `Department` on `e.departmentId = d.id`.
   - Calculate departmental rank using `RANK() OVER (PARTITION BY d.name ORDER BY salary DESC) AS rk`.
2. In the outer query, filter rows where `rk = 1`.
3. Select `department`, `employee`, and `salary`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ — Sorting employees within each department partition.
- **Space Complexity:** $O(N)$ — For CTE buffering.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [184department-highest-salary.sql](./184department-highest-salary.sql) |

---

## Key Learnings

- Window functions with `PARTITION BY` and `RANK()` handle ties for the maximum salary naturally without complex correlated subqueries.
