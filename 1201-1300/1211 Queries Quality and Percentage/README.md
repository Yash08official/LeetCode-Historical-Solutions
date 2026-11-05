---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1211. Queries Quality and Percentage

**[View Problem on LeetCode](https://leetcode.com/problems/queries-quality-and-percentage/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1211` (`1211`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Queries` table with columns `query_name`, `result`, `position` (`1` to `500`), and `rating` (`1` to `5`). The table has no primary key and may contain duplicate rows.

For each `query_name`, calculate:
- `quality`: the average of `rating / position`, rounded to **2 decimal places**.
- `poor_query_percentage`: the percentage of rows for that `query_name` with `rating < 3`, rounded to **2 decimal places**.

Return the result table in any order.

---

## Examples

### Example 1

```text
Input:
Queries table:
+------------+-------------------+----------+--------+
| query_name | result            | position | rating |
+------------+-------------------+----------+--------+
| Dog        | Golden Retriever  | 1        | 5      |
| Dog        | German Shepherd   | 2        | 5      |
| Dog        | Mule              | 200      | 1      |
| Cat        | Shirazi           | 5        | 2      |
| Cat        | Siamese           | 3        | 3      |
| Cat        | Sphynx            | 7        | 4      |
+------------+-------------------+----------+--------+
Output:
+------------+---------+-----------------------+
| query_name | quality | poor_query_percentage |
+------------+---------+-----------------------+
| Dog        | 2.50    | 33.33                 |
| Cat        | 0.66    | 33.33                 |
+------------+---------+-----------------------+
Explanation:
Dog queries quality is ((5 / 1) + (5 / 2) + (1 / 200)) / 3 = 2.50
Dog queries poor_ query_percentage is (1 / 3) * 100 = 33.33

Cat queries quality equals ((2 / 5) + (3 / 3) + (4 / 7)) / 3 = 0.66
Cat queries poor_ query_percentage is (1 / 3) * 100 = 33.33
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Duplicate Rows Matter:** Because `Queries` has no primary key, duplicate rows represent genuine repeated query evaluations and must **not** be deduplicated—every row contributes to `AVG`.
- **Null `query_name` Guard:** Filtering `WHERE query_name IS NOT NULL` ensures stray unlabelled rows are excluded.
- **Boolean Indicator Percentage:** A query row is "poor" when `rating < 3`. In MySQL, `rating < 3` evaluates to `1` (poor) or `0` (not poor), so `AVG(rating < 3) * 100` directly yields the poor query percentage.

---

## Approach

### Brute Force Approach

Computing `quality` in one grouped query and counting `rating < 3` in a separate filtered subquery joined back on `query_name` requires two passes over `Queries` and a `LEFT JOIN` + `IFNULL` to avoid dropping query names that have zero poor ratings.

### Optimized Approach

Filter `WHERE query_name IS NOT NULL`, group once by `query_name` (`GROUP BY 1`), and compute `ROUND(AVG(rating / position), 2) AS quality` alongside `ROUND(AVG(rating < 3) * 100, 2) AS poor_query_percentage`.

### Step-by-Step Thinking Process

1. Exclude null query names via `WHERE query_name IS NOT NULL`.
2. Group records by `query_name` (`GROUP BY 1`).
3. Compute `quality` as `ROUND(AVG(rating / position), 2)`.
4. Compute `poor_query_percentage` using MySQL's `0`/`1` boolean arithmetic: `ROUND(AVG(rating < 3) * 100, 2)`.

### Algorithm / Intuition

In MySQL, dividing two `INT` columns (`rating / position`) uses exact `DECIMAL` arithmetic rather than truncating integer division, and `AVG(...)` preserves decimal precision. Applying `ROUND(..., 2)` on a `DECIMAL` value in MySQL rounds halfway cases away from zero (`0.125 -> 0.13`), matching the problem's exact rounding specification.

Likewise, `rating < 3` produces integer `1` or `0` for every non-null `rating`, so `AVG(rating < 3) * 100` cleanly computes `(poor_count / total_count) * 100` even when `poor_count = 0`.

---

## Dry Run

Using **Example 1**:

1. **Group `'Dog'`** (`(pos=1, rat=5)`, `(pos=2, rat=5)`, `(pos=200, rat=1)`):
   - Ratios `rating / position`: `5/1 = 5.0000`, `5/2 = 2.5000`, `1/200 = 0.0050`.
   - `AVG` = `7.5050 / 3 = 2.50166...` -> `ROUND(..., 2)` = **`2.50`**.
   - Indicators `rating < 3`: `[0, 0, 1]` -> `AVG * 100 = 33.3333...` -> `ROUND(..., 2)` = **`33.33`**.
2. **Group `'Cat'`** (`(pos=5, rat=2)`, `(pos=3, rat=3)`, `(pos=7, rat=4)`):
   - Ratios: `2/5 = 0.4000`, `3/3 = 1.0000`, `4/7 = 0.5714...`.
   - `AVG` = `1.9714... / 3 = 0.6571...` -> `ROUND(..., 2)` = **`0.66`**.
   - Indicators `rating < 3`: `[1, 0, 0]` -> `AVG * 100 = 33.3333...` -> `ROUND(..., 2)` = **`33.33`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Single table scan over `n` rows in `Queries` with hash-based `GROUP BY` aggregation.
- **Space Complexity:** `O(q)` — Hash aggregation stores accumulators for `q` distinct non-null `query_name` values (`q <= n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1211queries-quality-and-percentage.sql](./1211queries-quality-and-percentage.sql) |

---

## Key Learnings

- MySQL's `/` operator performs `DECIMAL` division even on integer operands (unlike PostgreSQL or Java/C++ where `/` truncates integers); use `DIV` in MySQL only when integer truncation is desired.
- MySQL `ROUND(decimal_expr, d)` implements round-half-away-from-zero (`0.125 -> 0.13`), whereas `ROUND(float_expr, d)` uses IEEE 754 round-half-to-even.
- `AVG(boolean_condition) * 100` calculates conditional percentages cleanly in one pass.
