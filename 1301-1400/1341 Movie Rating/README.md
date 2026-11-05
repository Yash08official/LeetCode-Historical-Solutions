---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1341. Movie Rating

**[View Problem on LeetCode](https://leetcode.com/problems/movie-rating/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1341` (`1341`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given three tables:
- `Movies(movie_id, title)` where `movie_id` is the primary key and every `title` is unique.
- `Users(user_id, name)` where `user_id` is the primary key and every `name` is unique.
- `MovieRating(movie_id, user_id, rating, created_at)` where `(movie_id, user_id)` is the primary key, storing each user's rating and review date `created_at`.

Write a SQL query returning a single-column table (`results`) with two rows:
1. The `name` of the user who has rated the **most movies** overall (breaking ties by lexicographically smaller `name`).
2. The `title` of the movie with the **highest average rating** in **February 2020** (breaking ties by lexicographically smaller `title`).

---

## Examples

### Example 1

```text
Input:
Movies table:
+-------------+--------------+
| movie_id    |  title       |
+-------------+--------------+
| 1           | Avengers     |
| 2           | Frozen 2     |
| 3           | Joker        |
+-------------+--------------+
Users table:
+-------------+--------------+
| user_id     |  name        |
+-------------+--------------+
| 1           | Daniel       |
| 2           | Monica       |
| 3           | Maria        |
| 4           | James        |
+-------------+--------------+
MovieRating table:
+-------------+--------------+--------------+-------------+
| movie_id    | user_id      | rating       | created_at  |
+-------------+--------------+--------------+-------------+
| 1           | 1            | 3            | 2020-01-12  |
| 1           | 2            | 4            | 2020-02-11  |
| 1           | 3            | 2            | 2020-02-12  |
| 1           | 4            | 1            | 2020-01-01  |
| 2           | 1            | 5            | 2020-02-17  |
| 2           | 2            | 2            | 2020-02-01  |
| 2           | 3            | 2            | 2020-03-01  |
| 3           | 1            | 3            | 2020-02-22  |
| 3           | 2            | 4            | 2020-02-25  |
+-------------+--------------+--------------+-------------+
Output:
+--------------+
| results      |
+--------------+
| Daniel       |
| Frozen 2     |
+--------------+
Explanation:
Daniel and Monica have rated 3 movies ("Avengers", "Frozen 2" and "Joker") but Daniel is smaller lexicographically.
Frozen 2 and Joker have a rating average of 3.5 in February but Frozen 2 is smaller lexicographically.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Because `(movie_id, user_id)` is the primary key of `MovieRating`, a user can rate each movie at most once—so `COUNT(1)` per `user_id` directly counts distinct movies rated by that user.
- Only the **second** sub-problem filters `created_at` to February 2020; the **first** sub-problem counts ratings across **all** dates!
- Crucially, a user's `name` could theoretically equal a movie's `title` (for example, a user named `'Rebecca'` and a movie titled `'Rebecca'`). Combining the two rows with `UNION` would deduplicate them into a single row—we **must** use `UNION ALL`.

---

## Approach

### Brute Force Approach

Using CTEs with `RANK()` or `ROW_NUMBER()` window functions over aggregated counts and averages and then filtering `WHERE rnk = 1` works, but requires extra subquery layers compared to sorting by `(metric DESC, name_or_title ASC)` with `LIMIT 1` inside parenthesized `UNION ALL` branches.

### Optimized Approach

Combine two independent parenthesized `SELECT ... ORDER BY ... LIMIT 1` queries via `UNION ALL`: the first groups `Users JOIN MovieRating` by `user_id` ordered by `COUNT(1) DESC, name ASC`, and the second filters `MovieRating JOIN Movies` to February 2020 grouped by `movie_id` ordered by `AVG(rating) DESC, title ASC`.

### Step-by-Step Thinking Process

1. Split the two independent questions into two `SELECT` subqueries wrapped in parentheses so each can have its own `ORDER BY` and `LIMIT 1`.
2. Subquery 1: join `Users` and `MovieRating USING (user_id)`, `GROUP BY user_id`, sort by `COUNT(1) DESC, name` (ascending by default for lexicographical tie-breaking), take `LIMIT 1`, and alias the column `AS results`.
3. Subquery 2: join `MovieRating` and `Movies USING (movie_id)`, filter `WHERE DATE_FORMAT(created_at, '%Y-%m') = '2020-02'`, `GROUP BY movie_id`, sort by `AVG(rating) DESC, title`, and take `LIMIT 1`.
4. Combine both 1-row outputs vertically with `UNION ALL` so identical user/movie strings are never collapsed.

### Algorithm / Intuition

In SQL, `UNION ALL` takes the column name (`results`) from the **first** `SELECT` statement and appends the rows of the second `SELECT` statement without duplicate elimination. Wrapping each branch in `(...)` is required in MySQL whenever individual `UNION` branches contain their own `ORDER BY ... LIMIT 1` clauses; otherwise a trailing `ORDER BY` applies to the combined union result. Tie-breaking works cleanly because `ORDER BY metric DESC, string_col` sorts descending on the aggregate metric first and ascending (lexicographically) on `name` or `title` second.

---

## Dry Run

Tracing **Example 1**:

1. **Branch 1 (Most active user across all dates):**
   - `user_id = 1` (`Daniel`): `3` ratings (`movie 1, 2, 3`)
   - `user_id = 2` (`Monica`): `3` ratings (`movie 1, 2, 3`)
   - `user_id = 3` (`Maria`): `2` ratings
   - `user_id = 4` (`James`): `1` rating
   - Tie at `COUNT(1) = 3` between `'Daniel'` and `'Monica'`; `'Daniel' < 'Monica'` lexicographically -> `LIMIT 1` selects `'Daniel'`.
2. **Branch 2 (Highest average rating in `'2020-02'`):**
   - Filter `MovieRating` to `'2020-02'`: `movie 1` (`Avengers`) has `[4, 2]` -> `AVG = 3.0`; `movie 2` (`Frozen 2`) has `[5, 2]` (`03-01` excluded!) -> `AVG = 3.5`; `movie 3` (`Joker`) has `[3, 4]` -> `AVG = 3.5`.
   - Tie at `AVG(rating) = 3.5` between `'Frozen 2'` and `'Joker'`; `'Frozen 2' < 'Joker'` -> `LIMIT 1` selects `'Frozen 2'`.
3. **`UNION ALL`** outputs two rows under `results`: `'Daniel'` and `'Frozen 2'`.

---

## Complexity Analysis

- **Time Complexity:** `O(R + U log U + M log M)` — Let `R`, `U`, and `M` be row counts of `MovieRating`, `Users`, and `Movies`. Scanning and joining `MovieRating` twice takes `O(R)`, while sorting user groups and movie groups (or maintaining top-1) takes at most `O(U log U + M log M)`.
- **Space Complexity:** `O(U + M)` — Grouping by `user_id` and by `movie_id` stores at most `U` user aggregates and `M` movie aggregates.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1341movie-rating.sql](./1341movie-rating.sql) |

---

## Key Learnings

- Always use `UNION ALL` instead of `UNION` when stacking unrelated entities into a single report column—`UNION` silently drops the second row if a user's name matches a movie's title!
- In MySQL, wrap each `SELECT` in parentheses `(...)` when applying `ORDER BY ... LIMIT 1` to individual branches of a `UNION ALL`.
- Read date filters carefully per requirement: here `'February 2020'` applies **only** to the movie average rating, not to the user rating count.
