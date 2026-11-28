---
comments: true
difficulty: Easy
tags:
  - Database
---

# 511. Game Play Analysis I

**[View Problem on LeetCode](https://leetcode.com/problems/game-play-analysis-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0511` (`511`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Activity`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
(player_id, event_date) is the primary key (combination of columns with unique values) of this table.
This table shows the activity of players of some games.
Each row is a record of a player who logged in and played a number of games (possibly 0) before logging out on someday using some device.
```

 

Write a solution to find the **first login date** for each player.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

### Example 1

```
Input: 
Activity table:
+-----------+-----------+------------+--------------+
| player_id | device_id | event_date | games_played |
+-----------+-----------+------------+--------------+
| 1         | 2         | 2016-03-01 | 5            |
| 1         | 2         | 2016-05-02 | 6            |
| 2         | 3         | 2017-06-25 | 1            |
| 3         | 1         | 2016-03-02 | 0            |
| 3         | 4         | 2018-07-03 | 5            |
+-----------+-----------+------------+--------------+
Output: 
+-----------+-------------+
| player_id | first_login |
+-----------+-------------+
| 1         | 2016-03-01  |
| 2         | 2017-06-25  |
| 3         | 2016-03-02  |
+-----------+-------------+
```

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Find the first login date for each player from the `Activity` table.

---

## Approach

### Optimized Approach (SQL Aggregation with `MIN`)
1. Group records by `player_id`.
2. Compute `MIN(event_date)` as `first_login` for each player group.
3. Select `player_id, MIN(event_date) AS first_login`.

---

## Complexity Analysis

- **Time Complexity:** $O(R \log P)$ or $O(R)$ where $R$ is row count and $P$ is distinct players depending on index presence.
- **Space Complexity:** $O(P)$ for grouping hash table/temporary table.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [511game-play-analysis-i.sql](./511game-play-analysis-i.sql) |

---

## Key Learnings

- Grouping by a primary entity key and selecting an extremum (`MIN`) is the standard pattern for finding earliest chronological events per entity in SQL.
