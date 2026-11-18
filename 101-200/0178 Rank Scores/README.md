---
comments: true
difficulty: Medium
tags:
  - Database
---

# 178. Rank Scores

**[View Problem on LeetCode](https://leetcode.com/problems/rank-scores/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0178` (`178`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Scores`

```text
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains the score of a game. Score is a floating point value with two decimal places.
```

 

Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:

	
- The scores should be ranked from the highest to the lowest.
	
- If there is a tie between two scores, both should have the same ranking.
	
- After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.

Return the result table ordered by `score` in descending order.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
Scores table:
+----+-------+
| id | score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
**Output:** 
+-------+------+
| score | rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Rank scores from `Scores` table such that:
  - Highest score has rank 1.
  - Ties receive the same rank.
  - No holes/gaps in rank sequence after ties (dense ranking).

---

## Approach

### Optimized Approach (DENSE_RANK() Window Function)

1. Use MySQL 8.0 window function `DENSE_RANK() OVER (ORDER BY score DESC) AS \`rank\``.
2. Select `score` and the dense rank alias.
3. Order final output by `score DESC`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ — Sorting scores to evaluate the window function.
- **Space Complexity:** $O(N)$ — For output result set.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [178rank-scores.sql](./178rank-scores.sql) |

---

## Key Learnings

- `DENSE_RANK()` assigns consecutive integer ranks without gaps when tied values occur, unlike `RANK()` which leaves gaps.
