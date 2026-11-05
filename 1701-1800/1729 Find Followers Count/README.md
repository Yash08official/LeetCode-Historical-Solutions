---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1729. Find Followers Count

**[View Problem on LeetCode](https://leetcode.com/problems/find-followers-count/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1729` (`1729`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Followers` table in a social media app with columns `user_id` (`int`) and `follower_id` (`int`), where `(user_id, follower_id)` is the composite primary key indicating that `follower_id` follows `user_id`. Write a SQL query to return each `user_id` along with their total `followers_count`, ordered by `user_id` in ascending order.

---

## Examples

### Example 1

```text
Input:
Followers table:
+---------+-------------+
| user_id | follower_id |
+---------+-------------+
| 0       | 1           |
| 1       | 0           |
| 2       | 0           |
| 2       | 1           |
+---------+-------------+
Output:
+---------+----------------+
| user_id | followers_count|
+---------+----------------+
| 0       | 1              |
| 1       | 1              |
| 2       | 2              |
+---------+----------------+
Explanation:
The followers of 0 are {1}
The followers of 1 are {0}
The followers of 2 are {0,1}
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Because `(user_id, follower_id)` is the primary key, duplicate follow edges cannot exist in `Followers`.
- Every row with a given `user_id` represents one distinct follower of that user.
- Grouping by `user_id` and counting rows per group directly produces `followers_count`.

---

## Approach

### Brute Force Approach

Running `COUNT(DISTINCT follower_id)` works, but performs redundant deduplication work inside each group since the composite primary key `(user_id, follower_id)` already enforces uniqueness.

### Optimized Approach

Group `Followers` by `user_id` (`GROUP BY 1`), count rows per user with `COUNT(1) AS followers_count`, and sort ascending by `user_id` (`ORDER BY 1`).

### Step-by-Step Thinking Process

1. Select `user_id` and `COUNT(1) AS followers_count` from `Followers`.
2. Group records by `user_id` (`GROUP BY 1`).
3. Sort output rows in ascending order of `user_id` (`ORDER BY 1`).

### Algorithm / Intuition

In MySQL, `GROUP BY 1` and `ORDER BY 1` reference the 1st column in the `SELECT` list (`user_id`). Moreover, since `user_id` is the leading column of the composite primary key `(user_id, follower_id)`, an index scan on the primary key visits rows already grouped and sorted by `user_id`!

---

## Dry Run

Tracing Example 1 (`Followers`):

| `user_id` | Follower rows (`follower_id`) | `COUNT(1) AS followers_count` |
| :--- | :--- | :--- |
| `0` | `{1}` | `1` |
| `1` | `{0}` | `1` |
| `2` | `{0, 1}` | `2` |

Ordered ascending by `user_id`: `(0, 1)`, `(1, 1)`, `(2, 2)`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` with a primary-key index scan on `(user_id, follower_id)` (or `O(N log N)` if sorting unindexed rows).
- **Space Complexity:** `O(U)` — Aggregation output holds one summary row for each of the `U` distinct users.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1729find-followers-count.sql](./1729find-followers-count.sql) |

---

## Key Learnings

- When grouping and ordering by the leading column (`user_id`) of a composite B-tree primary key `(user_id, follower_id)`, the database can stream groups in sorted order without an extra sort pass.
- Note a real-world schema nuance: since there is no separate `Users` table here, only users with at least 1 follower appear in `Followers` (`LEFT JOIN` from a `Users` table would be needed if 0-follower users had to be reported).
