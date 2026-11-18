---
comments: true
difficulty: Easy
tags:
  - Database
---

# 183. Customers Who Never Order

**[View Problem on LeetCode](https://leetcode.com/problems/customers-who-never-order/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0183` (`183`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Customers`

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table indicates the ID and name of a customer.
```

 

Table: `Orders`

```text
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| customerId  | int  |
+-------------+------+
id is the primary key (column with unique values) for this table.
customerId is a foreign key (reference columns) of the ID from the Customers table.
Each row of this table indicates the ID of an order and the ID of the customer who ordered it.
```

 

Write a solution to find all customers who never order anything.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
Customers table:
+----+-------+
| id | name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
Orders table:
+----+------------+
| id | customerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
**Output:** 
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Find all customers who never ordered anything from tables `Customers` and `Orders`.

---

## Approach

### Optimized Approach (LEFT JOIN with IS NULL Filter)

1. Perform `LEFT JOIN` from `Customers AS c` to `Orders AS o` on `c.id = o.customerId`.
2. Filter where `o.id IS NULL` (anti-join pattern).
3. Select `c.name AS Customers`.

---

## Complexity Analysis

- **Time Complexity:** $O(C + O)$ with indexing on foreign keys.
- **Space Complexity:** $O(1)$ auxiliary space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [183customers-who-never-order.sql](./183customers-who-never-order.sql) |

---

## Key Learnings

- The `LEFT JOIN ... WHERE right.id IS NULL` anti-join pattern is often faster and more optimizer-friendly than `NOT IN` (which can struggle with NULLs) or `NOT EXISTS`.
