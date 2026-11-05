---
comments: true
difficulty: Medium
tags:
  - Database
---

# 585. Investments in 2016

**[View Problem on LeetCode](https://leetcode.com/problems/investments-in-2016/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0585` (`585`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Insurance` table (`pid` primary key, `tiv_2015`, `tiv_2016`, `lat`, `lon`), where `lat` and `lon` are guaranteed to be non-null.

Write a SQL query to compute the sum of `tiv_2016` across all policyholders who satisfy **both** conditions:
1. Their `tiv_2015` value matches at least one other policyholder's `tiv_2015`.
2. Their `(lat, lon)` city coordinates are unique across the entire table (shared with no other policyholder).

Round the resulting sum to **2 decimal places** and alias it as `tiv_2016`.

---

## Examples

### Example 1

```text
Input:
Insurance table:
+-----+----------+----------+-----+-----+
| pid | tiv_2015 | tiv_2016 | lat | lon |
+-----+----------+----------+-----+-----+
| 1   | 10       | 5        | 10  | 10  |
| 2   | 20       | 20       | 20  | 20  |
| 3   | 10       | 30       | 20  | 20  |
| 4   | 10       | 40       | 40  | 40  |
+-----+----------+----------+-----+-----+
Output:
+----------+
| tiv_2016 |
+----------+
| 45.00    |
+----------+
Explanation:
The first record in the table, like the last record, meets both of the two criteria.
The tiv_2015 value 10 is the same as the third and fourth records, and its location is unique.

The second record does not meet any of the two criteria. Its tiv_2015 is not like any other policyholders and its location is the same as the third record, which makes the third record fail, too.
So, the result is the sum of tiv_2016 of the first and last record, which is 45.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Two Independent Group Multiplicities:** Each row needs to know the size of its `tiv_2015` partition (must be `> 1`) and the size of its `(lat, lon)` partition (must be `= 1`).
- **Why Window Functions Shine:** A standard `GROUP BY` collapses rows along a single grouping key, forcing separate subqueries if you need counts across two unrelated grouping keys. Window functions (`COUNT(1) OVER (PARTITION BY ...)`) attach both partition counts directly to every row without collapsing rows!

---

## Approach

### Brute Force Approach

A subquery-based approach writes two `IN` / `NOT IN` subqueries (`WHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1)`), requiring three separate scans of the `Insurance` table (or `O(N^2)` if written with correlated `EXISTS` subqueries).

### Optimized Approach

Use a Common Table Expression (CTE) `T` with two `COUNT(1) OVER (PARTITION BY ...)` window functions to annotate each row with its `tiv_2015` frequency (`cnt1`) and `(lat, lon)` frequency (`cnt2`), then filter `cnt1 > 1 AND cnt2 = 1` and sum `tiv_2016`.

### Step-by-Step Thinking Process

1. Define a CTE `T` over `Insurance` selecting `tiv_2016` along with two window counts.
2. Compute `cnt1 = COUNT(1) OVER (PARTITION BY tiv_2015)` to count how many policies share the current row's 2015 investment value.
3. Compute `cnt2 = COUNT(1) OVER (PARTITION BY lat, lon)` to count how many policies sit at the exact same `(lat, lon)` pair.
4. In the outer query, filter rows from `T` with `WHERE cnt1 > 1 AND cnt2 = 1`.
5. Aggregate the surviving rows using `ROUND(SUM(tiv_2016), 2) AS tiv_2016`.

### Algorithm / Intuition

Inside CTE `T`, the database evaluates two window partitions over the rows of `Insurance`:
- `cnt1` groups rows having identical `tiv_2015` values; `cnt1 > 1` means at least one other policyholder shares this `tiv_2015`.
- `cnt2` groups rows having identical `(lat, lon)` pairs; `cnt2 = 1` means no other policyholder is located in the same city.

Because window functions preserve individual policy rows alongside their `tiv_2016` amounts, the outer query simply filters `WHERE cnt1 > 1 AND cnt2 = 1` and sums `tiv_2016` rounded to two decimal places.

---

## Dry Run

Tracing Example 1 on `Insurance`:

1. **CTE `T` evaluation:**

| `pid` | `tiv_2015` | `tiv_2016` | `(lat, lon)` | `cnt1` (`tiv_2015`) | `cnt2` (`lat, lon`) | `cnt1 > 1 AND cnt2 = 1` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `10` | `5` | `(10, 10)` | `3` (`pids 1,3,4`) | `1` | **Yes** |
| `2` | `20` | `20` | `(20, 20)` | `1` (`pid 2`) | `2` (`pids 2,3`) | No |
| `3` | `10` | `30` | `(20, 20)` | `3` (`pids 1,3,4`) | `2` (`pids 2,3`) | No |
| `4` | `10` | `40` | `(40, 40)` | `3` (`pids 1,3,4`) | `1` | **Yes** |

2. **Outer `SUM` & `ROUND`:**
   - Qualifying `tiv_2016` values: `5` (`pid = 1`) and `40` (`pid = 4`).
   - `ROUND(5 + 40, 2)` = `45.00`.

---

## Complexity Analysis

- **Time Complexity:** `O(N log N)` — Computing two `OVER (PARTITION BY ...)` window functions on `N` rows typically requires sorting the dataset twice by the partition keys (`O(N log N)`).
- **Space Complexity:** `O(N)` — Materializing the window partitions and CTE intermediate rows uses `O(N)` temporary memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [585investments-in-2016.sql](./585investments-in-2016.sql) |

---

## Key Learnings

- `COUNT(*) OVER (PARTITION BY ...)` lets you inspect group sizes across multiple orthogonal dimensions on the same row without `SELF JOIN`s or repeated table scans.
- CTEs (`WITH T AS (...)`) are necessary when filtering on window function outputs in MySQL because `WHERE` executes before `SELECT` window expressions.
- Partitioning on `(lat, lon)` as two separate columns avoids string-concatenation bugs (like `(1, 23)` colliding with `(12, 3)` under `CONCAT(lat, lon)`).
