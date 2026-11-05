---
comments: true
difficulty: Easy
tags:
  - Database
---

# 620. Not Boring Movies

**[View Problem on LeetCode](https://leetcode.com/problems/not-boring-movies/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0620` (`620`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Cinema` table with columns `id` (primary key), `movie`, `description`, and `rating` (a float in `[0, 10]`).

Write a SQL query to retrieve all columns for movies that have an **odd-numbered `id`** and whose `description` is **not `'boring'`**. Return the result sorted by `rating` in **descending order**.

---

## Examples

### Example 1

```text
Input:
Cinema table:
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 1  | War        | great 3D    | 8.9    |
| 2  | Science    | fiction     | 8.5    |
| 3  | irish      | boring      | 6.2    |
| 4  | Ice song   | Fantacy     | 8.6    |
| 5  | House card | Interesting | 9.1    |
+----+------------+-------------+--------+
Output:
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 5  | House card | Interesting | 9.1    |
| 1  | War        | great 3D    | 8.9    |
+----+------------+-------------+--------+
Explanation:
We have three movies with odd-numbered IDs: 1, 3, and 5. The movie with ID = 3 is boring so we do not include it in the answer.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Odd ID Check:** An integer `id` is odd if its least significant binary bit is `1` (`id & 1 = 1`), or equivalently `id % 2 = 1` / `MOD(id, 2) = 1`.
- **String Exclusion:** `description != 'boring'` filters out boring movies (note that if `description` could be `NULL`, `IS NULL` would need consideration, though genre descriptions here are populated strings).
- **Ordering:** Results must be ordered from highest `rating` to lowest (`ORDER BY rating DESC`, or `ORDER BY 4 DESC` since `rating` is the 4th column).

---

## Approach

### Brute Force Approach

Any valid solution must inspect the rows of `Cinema` and sort the matching movies by `rating`. A suboptimal variation would sort the *entire* `Cinema` table before filtering, whereas SQL's `WHERE` clause naturally filters rows prior to sorting.

### Optimized Approach

Filter `Cinema` in a single pass using `WHERE description != 'boring' AND id & 1 = 1`, then sort only the qualifying rows by `rating` descending (`ORDER BY 4 DESC`).

### Step-by-Step Thinking Process

1. Select all four columns with `SELECT * FROM Cinema`.
2. Filter out boring movies with `description != 'boring'`.
3. Check for odd `id` values using bitwise AND: `id & 1 = 1`.
4. Sort the surviving rows by the 4th column (`rating`) in descending order using `ORDER BY 4 DESC`.

### Algorithm / Intuition

In binary representation, odd positive integers end in bit `1` while even integers end in bit `0`. Therefore `id & 1 = 1` tests parity in a single bitwise operation. Combining `description != 'boring' AND id & 1 = 1` in `WHERE` discards non-matching rows immediately so the `ORDER BY 4 DESC` step only sorts the `K` matching movies.

---

## Dry Run

Tracing Example 1 on `Cinema`:

| `id` | `movie` | `description` | `rating` | `id & 1 = 1` | `!= 'boring'` | Kept? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `War` | `great 3D` | `8.9` | `TRUE` | `TRUE` | **Yes** |
| `2` | `Science` | `fiction` | `8.5` | `FALSE` | `TRUE` | No |
| `3` | `irish` | `boring` | `6.2` | `TRUE` | `FALSE` | No |
| `4` | `Ice song` | `Fantacy` | `8.6` | `FALSE` | `TRUE` | No |
| `5` | `House card` | `Interesting` | `9.1` | `TRUE` | `TRUE` | **Yes** |

Sorting kept rows by column `4` (`rating`) `DESC` yields `(5, House card, Interesting, 9.1)` followed by `(1, War, great 3D, 8.9)`.

---

## Complexity Analysis

- **Time Complexity:** `O(N + K log K)` — Scanning `N` rows takes `O(N)` time, and sorting the `K` qualifying rows (`K <= N`) by `rating` takes `O(K log K)` time.
- **Space Complexity:** `O(K)` — The sort buffer holds the `K` filtered rows.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [620not-boring-movies.sql](./620not-boring-movies.sql) |

---

## Key Learnings

- Bitwise `id & 1 = 1` is a fast, clean parity check in SQL (and works identically for negative two's-complement odd integers, unlike `% 2` in languages where `-3 % 2 == -1`).
- Filtering selective predicates in `WHERE` shrinks the dataset before `ORDER BY` executes, minimizing sort memory and CPU work.
- In production schemas where column order might evolve, `ORDER BY rating DESC` is safer than positional `ORDER BY 4 DESC`, though `ORDER BY 4 DESC` is valid shorthand in ad-hoc queries.
