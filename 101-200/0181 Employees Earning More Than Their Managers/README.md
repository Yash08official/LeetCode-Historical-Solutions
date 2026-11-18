---
comments: true
difficulty: Easy
tags:
  - Database
---

# 181. Employees Earning More Than Their Managers

**[View Problem on LeetCode](https://leetcode.com/problems/employees-earning-more-than-their-managers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0181` (`181`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Employee`

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table indicates the ID of an employee, their name, salary, and the ID of their manager.
```

 

Write a solution to find the employees who earn more than their managers.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
Employee table:
+----+-------+--------+-----------+
| id | name  | salary | managerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | Null      |
| 4  | Max   | 90000  | Null      |
+----+-------+--------+-----------+
**Output:** 
+----------+
| Employee |
+----------+
| Joe      |
+----------+
**Explanation:** Joe is the only employee who earns more than his manager.
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Find employees who earn more than their direct managers.

---

## Approach

### Optimized Approach (Self-Join on managerId)

1. Self-join `Employee` table as `e1` (employee) with `Employee` as `e2` (manager) on condition `e1.managerId = e2.id`.
2. Filter rows where `e1.salary > e2.salary`.
3. Select `e1.name AS Employee`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ with an index on `id` and `managerId`.
- **Space Complexity:** $O(1)$ auxiliary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [181employees-earning-more-than-their-managers.sql](./181employees-earning-more-than-their-managers.sql) |

---

## Key Learnings

- Self-joins allow modeling recursive hierarchical relationships (employee-manager) within a single relational table.
