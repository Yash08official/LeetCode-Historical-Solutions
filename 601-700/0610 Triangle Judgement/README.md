---
comments: true
difficulty: Easy
tags:
  - Database
---

# 610. Triangle Judgement

**[View Problem on LeetCode](https://leetcode.com/problems/triangle-judgement/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0610` (`610`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Triangle` table with integer columns `x`, `y`, and `z`, where `(x, y, z)` is the composite primary key. Each row gives the lengths of three line segments.

Write a SQL query to report every row (`x`, `y`, `z`) along with an additional column `triangle` containing `'Yes'` if the three segments can form a valid non-degenerate triangle, or `'No'` otherwise. Return the result in any order.

---

## Examples

### Example 1

```text
Input:
Triangle table:
+----+----+----+
| x  | y  | z  |
+----+----+----+
| 13 | 15 | 30 |
| 10 | 20 | 15 |
+----+----+----+
Output:
+----+----+----+----------+
| x  | y  | z  | triangle |
+----+----+----+----------+
| 13 | 15 | 30 | No       |
| 10 | 20 | 15 | Yes      |
+----+----+----+----------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Triangle Inequality Theorem:** Three line segments `x`, `y`, and `z` form a valid non-degenerate triangle if and only if the sum of every pair of sides is **strictly greater** than the remaining third side:
  - `x + y > z`
  - `x + z > y`
  - `y + z > x`
- **Degenerate & Non-Positive Cases:** If `x + y = z` (collinear segments, e.g., `1, 2, 3`), they do not form a triangle (`'No'`). Furthermore, if all three strict inequalities hold, adding any two inequalities proves every side is strictly positive (`2x > 0`, `2y > 0`, `2z > 0`), so zero or negative segment lengths are automatically rejected as `'No'`.

---

## Approach

### Brute Force Approach

A verbose alternative sorts the three values per row using nested `GREATEST` and `LEAST` expressions (`x + y + z - GREATEST(x, y, z) > GREATEST(x, y, z) AND LEAST(x, y, z) > 0`), which is harder to read and performs more function calls per row than checking the three pairwise sums directly.

### Optimized Approach

Evaluate the three strict triangle inequalities directly inside MySQL's conditional `IF(x + y > z AND x + z > y AND y + z > x, 'Yes', 'No')` expression in a single table scan.

### Step-by-Step Thinking Process

1. Keep all original columns using `SELECT *`.
2. Express the triangle validity rule as the conjunction `x + y > z AND x + z > y AND y + z > x`.
3. Wrap the condition in MySQL's `IF(condition, 'Yes', 'No')` (or ANSI `CASE WHEN ... THEN 'Yes' ELSE 'No' END`) and alias the computed column as `triangle`.

### Algorithm / Intuition

For each row in `Triangle`, `IF(x + y > z AND x + z > y AND y + z > x, 'Yes', 'No') AS triangle` checks all three pairwise sums. Thanks to short-circuit evaluation of `AND`, as soon as one pair fails to exceed the third side (such as `13 + 15 > 30` failing immediately), the expression returns `'No'`. Only when all three inequalities hold does it output `'Yes'`.

---

## Dry Run

Tracing Example 1 on `Triangle`:

| `x` | `y` | `z` | `x + y > z` | `x + z > y` | `y + z > x` | `triangle` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `13` | `15` | `30` | `28 > 30` (`FALSE`) | — | — | `'No'` |
| `10` | `20` | `15` | `30 > 15` (`TRUE`) | `25 > 20` (`TRUE`) | `35 > 10` (`TRUE`) | `'Yes'` |

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Scans all `N` rows of `Triangle` once, performing three `O(1)` arithmetic comparisons per row.
- **Space Complexity:** `O(1)` — Computes the `triangle` column inline as rows stream out, requiring no extra memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [610triangle-judgement.sql](./610triangle-judgement.sql) |

---

## Key Learnings

- The strict triangle inequality (`x + y > z AND x + z > y AND y + z > x`) naturally excludes both flat/degenerate triangles (`x + y = z`) and non-positive side lengths without extra checks.
- MySQL's `IF(cond, true_val, false_val)` is a concise shorthand for two-branch `CASE WHEN` expressions.
- If side lengths could approach `INT_MAX` (`2^31 - 1`), writing `x > z - y` (after checking `x, y, z > 0`) avoids 32-bit signed integer addition overflow in strict SQL modes.
