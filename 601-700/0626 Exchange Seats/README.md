---
comments: true
difficulty: Medium
tags:
  - Database
---

# 626. Exchange Seats

**[View Problem on LeetCode](https://leetcode.com/problems/exchange-seats/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0626` (`626`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Seat` table with columns `id` (primary key) and `student`. Seat IDs start at `1` and increment continuously without gaps (`1, 2, 3, ..., n`).

Write a SQL query to swap the seat `id` of every adjacent pair of students `(1 <-> 2, 3 <-> 4, ...)`. If the total number of students is odd, the last student's `id` stays unchanged. Return the result ordered by the new `id` in **ascending order**.

---

## Examples

### Example 1

```text
Input:
Seat table:
+----+---------+
| id | student |
+----+---------+
| 1  | Abbot   |
| 2  | Doris   |
| 3  | Emerson |
| 4  | Green   |
| 5  | Jeames  |
+----+---------+
Output:
+----+---------+
| id | student |
+----+---------+
| 1  | Doris   |
| 2  | Abbot   |
| 3  | Green   |
| 4  | Emerson |
| 5  | Jeames  |
+----+---------+
Explanation:
Note that if the number of students is odd, there is no need to change the last one's seat.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Re-labeling vs. Self-Joining:** Swapping students between seats `1` and `2` is equivalent to keeping each `student` name on its current row and re-computing its `id`:
  - Every **even** `id` (`2, 4, 6, ...`) always moves to `id - 1`.
  - Every **odd** `id` (`1, 3, 5, ...`) moves to `id + 1`, **except** when it is the very last row of an odd-sized table, in which case it remains `id`.
- **Final Ordering:** Because re-computing `id` turns `(1, 2)` into `(2, 1)`, we must explicitly sort by the newly computed `id` ascending at the end.

---

## Approach

### Brute Force Approach

A `LEFT JOIN` self-join approach joins `Seat s1` with `Seat s2` using a conditional join predicate (`ON (s1.id % 2 = 1 AND s2.id = s1.id + 1) OR (s1.id % 2 = 0 AND s2.id = s1.id - 1)`). Disjunctive `OR` conditions in `ON` clauses often defeat equi-join optimizations and fall back to `O(N^2)` nested-loop evaluation.

### Optimized Approach

Compute the swapped `id` directly in `SELECT` using a `CASE` expression combining bitwise parity (`id & 1 = 0`) with window functions `ROW_NUMBER() OVER (ORDER BY id)` and `COUNT(id) OVER ()` to detect the final odd seat, then `ORDER BY 1`.

### Step-by-Step Thinking Process

1. Check if `id` is even via `WHEN id & 1 = 0 THEN id - 1`; an even seat always has a preceding odd partner because IDs start at `1`.
2. Otherwise (`id` is odd), check whether this row is *not* the last row in the table using `WHEN ROW_NUMBER() OVER (ORDER BY id) != COUNT(id) OVER () THEN id + 1`.
3. If it is both odd and the last row (`ELSE`), leave `id` unchanged.
4. Alias the computed expression `AS id`, select `student`, and sort with `ORDER BY 1`.

### Algorithm / Intuition

Instead of moving `student` strings across rows via joins, the query mutates each row's `id` label:
- `id & 1 = 0`: maps `2 -> 1`, `4 -> 3`, etc.
- `ROW_NUMBER() OVER (ORDER BY id)` assigns `1..N` in seat order, while `COUNT(id) OVER ()` attaches the total student count `N` to every row without collapsing the table. When `ROW_NUMBER() != N`, an odd seat has a partner right after it, so `1 -> 2`, `3 -> 4`.
- When `ROW_NUMBER() == N` on an odd `id` (like `id = 5` out of `5`), `ELSE id` keeps `5 -> 5`.

Finally, `ORDER BY 1` sorts the output by the new `id` column.

---

## Dry Run

Tracing Example 1 (`N = 5` rows in `Seat`):

| Orig `id` | `student` | `id & 1 = 0` | `ROW_NUMBER()` | `COUNT() OVER ()` | New `id` | After `ORDER BY 1` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `Abbot` | `FALSE` | `1` | `5` | `1 + 1 = 2` | `(1, Doris)` |
| `2` | `Doris` | `TRUE` | `2` | `5` | `2 - 1 = 1` | `(2, Abbot)` |
| `3` | `Emerson` | `FALSE` | `3` | `5` | `3 + 1 = 4` | `(3, Green)` |
| `4` | `Green` | `TRUE` | `4` | `5` | `4 - 1 = 3` | `(4, Emerson)` |
| `5` | `Jeames` | `FALSE` | `5` | `5` | `ELSE -> 5` | `(5, Jeames)` |

---

## Complexity Analysis

- **Time Complexity:** `O(N log N)` — Evaluating the window functions over `id` (primary key) is `O(N)`, and sorting the resulting rows by the newly swapped `id` (`ORDER BY 1`) takes `O(N log N)`.
- **Space Complexity:** `O(N)` — Window buffering (`COUNT(id) OVER ()`) and sorting the `N` output rows use `O(N)` temporary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [626exchange-seats.sql](./626exchange-seats.sql) |

---

## Key Learnings

- Transforming row IDs and re-sorting is often much cleaner and faster than self-joining rows to swap payload columns.
- Comparing `ROW_NUMBER() OVER (ORDER BY id)` with `COUNT(*) OVER ()` works even if IDs ever had gaps (as long as consecutive rows swap IDs +/- 1); since IDs are contiguous `1..N` here, `id != COUNT(*) OVER ()` also works.
- In SQL `ORDER BY 1`, `1` refers to the first output column in `SELECT` (the *new* `id`), not the original `Seat.id`.
