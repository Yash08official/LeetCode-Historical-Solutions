---
comments: true
difficulty: Hard
tags:
  - Database
---

# 601. Human Traffic of Stadium

**[View Problem on LeetCode](https://leetcode.com/problems/human-traffic-of-stadium/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0601` (`601`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Stadium`

```text
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| visit_date    | date    |
| people        | int     |
+---------------+---------+
visit_date is the column with unique values for this table.
Each row of this table contains the visit date and visit id to the stadium with the number of people during the visit.
As the id increases, the date increases as well.
```

Write a solution to display the records with three or more rows with **consecutive** `id`'s, and the number of people is greater than or equal to 100 for each.

Return the result table ordered by `visit_date` in **ascending order**.

---

## Examples

### Example 1

```text
Input:
Stadium table:
+------+------------+-----------+
| id   | visit_date | people    |
+------+------------+-----------+
| 1    | 2017-01-01 | 10        |
| 2    | 2017-01-02 | 109       |
| 3    | 2017-01-03 | 150       |
| 4    | 2017-01-04 | 99        |
| 5    | 2017-01-05 | 145       |
| 6    | 2017-01-06 | 1455      |
| 7    | 2017-01-07 | 199       |
| 8    | 2017-01-09 | 188       |
+------+------------+-----------+
Output:
+------+------------+-----------+
| id   | visit_date | people    |
+------+------------+-----------+
| 5    | 2017-01-05 | 145       |
| 6    | 2017-01-06 | 1455      |
| 7    | 2017-01-07 | 199       |
| 8    | 2017-01-09 | 188       |
+------+------------+-----------+
Explanation:
The four rows with ids 5, 6, 7, and 8 have consecutive ids and each of them has >= 100 people attended.
The rows with ids 2 and 3 are not included because we need at least three consecutive ids.
```

---

## Problem Understanding

- Identify sequences of $\ge 3$ consecutive records (by `id`) where each row has `people >= 100`.
- If an unbroken sequence of qualifying records has length $\ge 3$, all rows in that streak must be returned.
- Output must be ordered by `visit_date ASC`.

---

## Approach

### Optimized Approach (Gaps-and-Islands via `ROW_NUMBER()`)

1. Filter the initial table for qualifying attendance: `WHERE people >= 100`.
2. Apply the classic **Gaps-and-Islands** technique:
   - Compute `id - ROW_NUMBER() OVER () AS id_diff`.
   - For consecutive IDs, both `id` and `ROW_NUMBER()` increase by $1$ on each subsequent row, meaning their difference `id_diff` remains **strictly constant** across an unbroken streak.
   - Any break in consecutive IDs shifts `id_diff` to a new distinct value.
3. Group by `id_diff` and filter for groups having `COUNT(*) >= 3` (`HAVING COUNT(*) > 2`).
4. Select all rows belonging to qualifying groups and sort by `visit_date ASC`.

### SQL Query Logic

```sql
WITH
    Consecutive AS (
        SELECT
            *,
            id - ROW_NUMBER() OVER () AS id_diff
        FROM Stadium
        WHERE people >= 100
    )
SELECT id, visit_date, people
FROM Consecutive
WHERE
    id_diff IN
        (
            SELECT id_diff
            FROM Consecutive
            GROUP BY id_diff
            HAVING COUNT(*) > 2
        )
ORDER BY visit_date;
```

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N)$ — Sorting for window function evaluation and the final order by `visit_date`.
- **Space Complexity:** $O(N)$ — Memory required for the Common Table Expression (CTE).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [601human-traffic-of-stadium.sql](./601human-traffic-of-stadium.sql) |

---

## Key Learnings

- `id - ROW_NUMBER() OVER ()` is the standard, canonical SQL idiom for identifying islands of consecutive values without self-joins.
- Filtering rows prior to computing the window function isolates the qualifying sequences directly.
