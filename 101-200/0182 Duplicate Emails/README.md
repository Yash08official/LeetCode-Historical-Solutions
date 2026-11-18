---
comments: true
difficulty: Easy
tags:
  - Database
---

# 182. Duplicate Emails

**[View Problem on LeetCode](https://leetcode.com/problems/duplicate-emails/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0182` (`182`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Person`

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains an email. The emails will not contain uppercase letters.
```

 

Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not NULL.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
Person table:
+----+---------+
| id | email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
**Output:** 
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
**Explanation:** a@b.com is repeated two times.
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Report all duplicate emails from table `Person`.

---

## Approach

### Optimized Approach (Self-Join / Cartesian Filter)

1. Query distinct emails from Cartesian / self-join of `person AS p1` and `person AS p2`.
2. Filter condition: `p1.id != p2.id AND p1.email = p2.email`.
3. Select `DISTINCT p1.email`.

---

## Complexity Analysis

- **Time Complexity:** $O(N^2)$ worst case for nested join, or $O(N)$ with indexing.
- **Space Complexity:** $O(N)$ for distinct output.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [182duplicate-emails.sql](./182duplicate-emails.sql) |

---

## Key Learnings

- Identifying duplicate records can be performed either via `GROUP BY email HAVING COUNT(*) > 1` or via self-join on unequal primary keys.
