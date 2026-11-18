---
comments: true
difficulty: Medium
tags:
  - Database
---

# 602. Friend Requests II: Who Has the Most Friends

**[View Problem on LeetCode](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0602` (`602`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `RequestAccepted`

```text
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| requester_id   | int     |
| accepter_id    | int     |
| accept_date    | date    |
+----------------+---------+
(requester_id, accepter_id) is the primary key (combination of columns with unique values) for this table.
This table contains the ID of the user who sent the request, the ID of the user who received the request, and the date when the request was accepted.
```

 

Write a solution to find the people who have the most friends and the most friends number.

The test cases are generated so that only one person has the most friends.

The result format is in the following example.

---

## Examples

### Example 1

```text
**Input:** 
RequestAccepted table:
+--------------+-------------+-------------+
| requester_id | accepter_id | accept_date |
+--------------+-------------+-------------+
| 1            | 2           | 2016/06/03  |
| 1            | 3           | 2016/06/08  |
| 2            | 3           | 2016/06/08  |
| 3            | 4           | 2016/06/09  |
+--------------+-------------+-------------+
**Output:** 
+----+-----+
| id | num |
+----+-----+
| 3  | 3   |
+----+-----+
**Explanation:** 
The person with id 3 is a friend of people 1, 2, and 4, so he has three friends in total, which is the most number than any others.
```

 

**Follow up:** In the real world, multiple people could have the same most number of friends. Could you find all these people in this case?

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Find the person who has the most friends and the most friends number.
- Friendship is mutual: a person is friends whether they are `requester_id` or `accepter_id`.

---

## Approach

### Optimized Approach (UNION ALL + GROUP BY & Aggregation)

1. Symmetrize the friendship table using `UNION ALL`:
   - Select `requester_id, accepter_id` from `RequestAccepted`
   - Union with `accepter_id, requester_id` from `RequestAccepted`.
2. In outer query, group by person id (`requester_id AS id`).
3. Count total friends (`COUNT(1) AS num`), order descending (`ORDER BY 2 DESC`), and take the top record (`LIMIT 1`).

---

## Complexity Analysis

- **Time Complexity:** $O(R \log R)$ — Where $R$ is total friendship records for sorting aggregated results.
- **Space Complexity:** $O(R)$ for temporary union table.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [602friend-requests-ii-who-has-the-most-friends.sql](./602friend-requests-ii-who-has-the-most-friends.sql) |

---

## Key Learnings

- `UNION ALL` preserves duplicate counts while bidirectionalizing undirected graph relationships in relational SQL.
