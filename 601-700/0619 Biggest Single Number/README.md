---
comments: true
difficulty: Easy
tags:
  - Database
---

# 619. Biggest Single Number

**[View Problem on LeetCode](https://leetcode.com/problems/biggest-single-number/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0619` (`619`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `MyNumbers` table containing a single integer column `num`. Because the table has no primary key, numbers may appear multiple times.

A **single number** is defined as an integer that appears **exactly once** in `MyNumbers`. Write a SQL query to return the largest single number under column `num`, or `null` if no single number exists.

---

## Examples

### Example 1

```text
Input:
MyNumbers table:
+-----+
| num |
+-----+
| 8   |
| 8   |
| 3   |
| 3   |
| 1   |
| 4   |
| 5   |
| 6   |
+-----+
Output:
+-----+
| num |
+-----+
| 6   |
+-----+
Explanation: The single numbers are 1, 4, 5, and 6.
Since 6 is the largest single number, we return it.
```

### Example 2

```text
Input:
MyNumbers table:
+-----+
| num |
+-----+
| 8   |
| 8   |
| 7   |
| 7   |
| 3   |
| 3   |
| 3   |
+-----+
Output:
+------+
| num  |
+------+
| null |
+------+
Explanation: There are no single numbers in the input table so we return null.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Filtering Multiplicities:** We first need to isolate numbers with frequency `COUNT(*) = 1`.
- **Empty Set Trap (`null` requirement):** If every number in `MyNumbers` is a duplicate (as in Example 2), the set of single numbers is empty. Using `ORDER BY num DESC LIMIT 1` alone on an empty result returns **zero rows** (`Empty set`), whereas the problem requires **one row containing `null`**!

---

## Approach

### Brute Force Approach

A naive query uses a correlated count `SELECT MAX(num) AS num FROM MyNumbers m1 WHERE (SELECT COUNT(*) FROM MyNumbers m2 WHERE m2.num = m1.num) = 1`, which scans `MyNumbers` repeatedly for every row (`O(N^2)` time without an index).

### Optimized Approach

Find all numbers occurring once via `GROUP BY num HAVING COUNT(1) = 1` in a derived table `t`, then apply `SELECT MAX(num) AS num` in the outer query to get the maximum (or `NULL` when `t` is empty).

### Step-by-Step Thinking Process

1. Group `MyNumbers` by `num` (`GROUP BY 1`) and retain only values that appear once using `HAVING COUNT(1) = 1`.
2. Wrap this query as a derived table `t`.
3. Apply `SELECT MAX(num) AS num FROM (...) AS t` in the outer query.
4. Verify the edge case: in SQL, an ungrouped aggregate like `MAX(num)` over `0` rows always produces `1` row with value `NULL`, satisfying Example 2 automatically.

### Algorithm / Intuition

The inner subquery `t` (`SELECT num FROM MyNumbers GROUP BY 1 HAVING COUNT(1) = 1`) computes frequency counts in one pass and emits only unique numbers.

In the outer query, `SELECT MAX(num) AS num FROM t` scans those surviving single numbers to pick the largest one. Crucially, SQL aggregate functions (`MAX`, `MIN`, `SUM`, `AVG`) without a `GROUP BY` clause always return a single summary row — returning `NULL` when the input relation `t` has zero rows.

---

## Dry Run

Tracing both examples:

- **Example 1 (`[8, 8, 3, 3, 1, 4, 5, 6]`):**
  - Counts: `8 -> 2`, `3 -> 2`, `1 -> 1`, `4 -> 1`, `5 -> 1`, `6 -> 1`.
  - Subquery `t` (`COUNT(1) = 1`) outputs: `1, 4, 5, 6`.
  - Outer `MAX(num)` returns `6`.
- **Example 2 (`[8, 8, 7, 7, 3, 3, 3]`):**
  - Counts: `8 -> 2`, `7 -> 2`, `3 -> 3`.
  - Subquery `t` outputs `0` rows.
  - Outer `MAX(num)` over `0` rows returns a single row: `null`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Grouping `N` rows via hash aggregation and scanning the unique survivors for `MAX(num)` both run in linear time.
- **Space Complexity:** `O(U)` — Hash aggregation stores one entry per distinct number (`U <= N`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [619biggest-single-number.sql](./619biggest-single-number.sql) |

---

## Key Learnings

- An ungrouped aggregate query (`SELECT MAX(col) FROM ...`) always returns exactly one row — yielding `NULL` when the underlying subquery is empty.
- By contrast, `ORDER BY col DESC LIMIT 1` returns zero rows on an empty set unless wrapped inside a scalar subquery `SELECT (SELECT ... LIMIT 1) AS num`.
- Computing `MAX` over filtered groups requires two levels (subquery + outer `MAX`) because SQL does not allow nesting `MAX(num)` directly with `HAVING COUNT(1) = 1` across multiple groups.
