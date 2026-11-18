---
comments: true
difficulty: Medium
tags:
  - Database
---

# 177. Nth Highest Salary

**[View Problem on LeetCode](https://leetcode.com/problems/nth-highest-salary/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0177` (`177`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Employee`

```text
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key (column with unique values) for this table.
Each row of this table contains information about the salary of an employee.
```

 

Write a solution to find the `n^th` highest **distinct** salary from the `Employee` table. If there are less than `n` distinct salaries, return `null`.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
n = 2
**Output:** 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+
```

### Example 2

```text
**Input:** 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
+----+--------+
n = 2
**Output:** 
+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| null                   |
+------------------------+
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Create a SQL function `getNthHighestSalary(N)` that returns the $N$-th highest distinct salary from `Employee`, or `null` if fewer than $N$ distinct salaries exist.

---

## Approach

### Optimized Approach (LIMIT with Variable Offset)

1. In MySQL function body, declare integer variable `offsetValue`.
2. Compute zero-based offset: `SET offsetValue = N - 1`.
3. If $N \le 0$, negative offset naturally yields `NULL`.
4. Query distinct salaries ordered descending:
   `SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT offsetValue, 1`.
5. Return the query scalar result.

---

## Complexity Analysis

- **Time Complexity:** $O(E \log E)$ — For sorting distinct employee salaries.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [177nth-highest-salary.sql](./177nth-highest-salary.sql) |

---

## Key Learnings

- In MySQL stored functions, setting `offset = N - 1` before invoking `LIMIT offset, 1` provides clean, parameter-driven ranking without requiring window functions.
