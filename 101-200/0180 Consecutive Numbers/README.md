---
comments: true
difficulty: Medium
tags:
  - Database
---

# 180. Consecutive Numbers

**[View Problem on LeetCode](https://leetcode.com/problems/consecutive-numbers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0180` (`180`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Logs` table with columns `id` (`int` primary key, autoincrementing from `1`) and `num` (`varchar`). Write a SQL query to find all distinct `num` values that appear **at least three times in a row** consecutively in the log sequence.

Return the matching numbers in a single column aliased as `ConsecutiveNums` in any order.

---

## Examples

### Example 1

```text
Input:
Logs table:
+----+-----+
| id | num |
+----+-----+
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
| 6  | 2   |
| 7  | 2   |
+----+-----+
Output:
+-----------------+
| ConsecutiveNums |
+-----------------+
| 1               |
+-----------------+
Explanation: 1 is the only number that appears consecutively for at least three times.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Triplet Neighborhood View:** A number appears at least `3` times consecutively if and only if there is at least one "middle" row whose `num` equals both its immediately preceding row's `num` and its immediately following row's `num`.
- **Deduplication (`DISTINCT`):** If `'1'` appears `4` times consecutively (rows `1, 2, 3, 4`), both row `2` and row `3` qualify as middle rows—`SELECT DISTINCT` prevents reporting `'1'` multiple times.
- **Autoincrement vs. Explicit Ordering:** The problem specifies `id` is an autoincrement column starting from `1`. Window functions `LAG` and `LEAD` inspect adjacent rows in the partition stream.

---

## Approach

### Brute Force Approach

Joining three copies of `Logs` (`l1 JOIN l2 ON l1.id + 1 = l2.id JOIN l3 ON l2.id + 1 = l3.id WHERE l1.num = l2.num AND l2.num = l3.num`) works when `id` has no gaps, but requires three table scans/index probes and fails if deleted rows ever create gaps in `id`.

### Optimized Approach

Use a **Common Table Expression (`WITH T AS ...`) and SQL Window Functions (`LAG` and `LEAD`)** to attach the previous row's `num` (`a`) and next row's `num` (`b`) to every row in a single pass, then select `DISTINCT num` where `a = num AND b = num`.

### Step-by-Step Thinking Process

1. Define CTE `T` over `Logs` that computes `LAG(num) OVER () AS a` (previous row's value) and `LEAD(num) OVER () AS b` (next row's value).
2. For the very first row, `LAG(num)` evaluates to `NULL`; for the very last row, `LEAD(num)` evaluates to `NULL`.
3. Filter `T` in the outer query with `WHERE a = num AND b = num`. In SQL three-valued logic, `NULL = num` evaluates to `UNKNOWN` (falsy), cleanly excluding boundary rows.
4. Apply `SELECT DISTINCT num AS ConsecutiveNums` so runs of length `>= 4` or separate streaks of the same number only emit that `num` once.

### Algorithm / Intuition

Instead of self-joining `Logs` three times, window functions `LAG` and `LEAD` slide a 3-row window `(prev, curr, next)` across `Logs` in one sequential pass. Whenever a streak of `k >= 3` identical values occurs, the interior `k - 2` rows see `a = num` and `b = num`. Note a practical SQL detail in this exact query: `OVER ()` omits `ORDER BY id`, which works here because InnoDB stores `Logs` clustered by primary key `id`, so a full scan reads rows in `id` order—though writing `OVER (ORDER BY id)` is recommended in production SQL to guarantee deterministic ordering.

---

## Dry Run

Trace on **Example 1** (`Logs` with `id = 1..7`, `num = ['1','1','1','2','1','2','2']`):

| `id` | `num` | `a = LAG(num)` | `b = LEAD(num)` | `a = num AND b = num`? |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `'1'` | `NULL` | `'1'` | False (`UNKNOWN`) |
| `2` | `'1'` | `'1'` | `'1'` | **True** |
| `3` | `'1'` | `'1'` | `'2'` | False |
| `4` | `'2'` | `'1'` | `'1'` | False |
| `5` | `'1'` | `'2'` | `'2'` | False |
| `6` | `'2'` | `'1'` | `'2'` | False |
| `7` | `'2'` | `'2'` | `NULL` | False (`UNKNOWN`) |

Only `id = 2` passes `WHERE a = num AND b = num`, so `SELECT DISTINCT` returns `ConsecutiveNums = '1'`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` to `O(n log n)` — Evaluating `LAG` and `LEAD` over `OVER ()` scans `n` rows in `O(n)` time, followed by `DISTINCT` deduplication (`O(n)` hash temporary table or `O(n log n)` sort).
- **Space Complexity:** `O(n)` — Materializing/buffering CTE window results and tracking distinct qualifying `num` values.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [180consecutive-numbers.sql](./180consecutive-numbers.sql) |

---

## Key Learnings

- `LAG(col)` and `LEAD(col)` eliminate multi-way self-joins when comparing each row against its immediate neighbors—and gracefully handle gaps in `id` if rows are ordered!
- Always prefer explicit `OVER (ORDER BY id)` in real-world SQL queries rather than bare `OVER ()`, since SQL tables are unordered sets unless an `ORDER BY` clause is specified.
- Always pair streak-detection queries with `DISTINCT` because a run of length `L >= 3` triggers `L - 2` matching window positions.
