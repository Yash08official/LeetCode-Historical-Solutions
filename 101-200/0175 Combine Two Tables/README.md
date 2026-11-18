---
comments: true
difficulty: Easy
tags:
  - Database
---

# 175. Combine Two Tables

**[View Problem on LeetCode](https://leetcode.com/problems/combine-two-tables/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0175` (`175`) |
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
| personId    | int     |
| lastName    | varchar |
| firstName   | varchar |
+-------------+---------+
personId is the primary key (column with unique values) for this table.
This table contains information about the ID of some persons and their first and last names.
```

 

Table: `Address`

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| addressId   | int     |
| personId    | int     |
| city        | varchar |
| state       | varchar |
+-------------+---------+
addressId is the primary key (column with unique values) for this table.
Each row of this table contains information about the city and state of one person with ID = PersonId.
```

 

Write a solution to report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report `null` instead.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
Person table:
+----------+----------+-----------+
| personId | lastName | firstName |
+----------+----------+-----------+
| 1        | Wang     | Allen     |
| 2        | Alice    | Bob       |
+----------+----------+-----------+
Address table:
+-----------+----------+---------------+------------+
| addressId | personId | city          | state      |
+-----------+----------+---------------+------------+
| 1         | 2        | New York City | New York   |
| 2         | 3        | Leetcode      | California |
+-----------+----------+---------------+------------+
**Output:** 
+-----------+----------+---------------+----------+
| firstName | lastName | city          | state    |
+-----------+----------+---------------+----------+
| Allen     | Wang     | Null          | Null     |
| Bob       | Alice    | New York City | New York |
+-----------+----------+---------------+----------+
**Explanation:** 
There is no address in the address table for the personId = 1 so we return null in their city and state.
addressId = 1 contains information about the address of personId = 2.
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Combine `Person` and `Address` tables to report `firstName`, `lastName`, `city`, and `state` for each person.
- If a person has no address, report `null` for `city` and `state`.

---

## Approach

### Optimized Approach (LEFT JOIN on personId)

1. Perform a `LEFT JOIN` between `Person` as `p` and `Address` as `a` on condition `p.personId = a.personId`.
2. Select columns `p.firstName`, `p.lastName`, `a.city`, and `a.state`.
3. The `LEFT JOIN` guarantees all rows from `Person` are preserved regardless of whether an address record exists.

---

## Complexity Analysis

- **Time Complexity:** $O(N + M)$ — Where $N$ and $M$ are rows in `Person` and `Address` using hash or index join.
- **Space Complexity:** $O(N)$ for query output.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [175combine-two-tables.sql](./175combine-two-tables.sql) |

---

## Key Learnings

- `LEFT JOIN` is the canonical relational technique to preserve all records from the primary entity table while populating optional attributes from a secondary table.
