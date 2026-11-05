---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1193. Monthly Transactions I

**[View Problem on LeetCode](https://leetcode.com/problems/monthly-transactions-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1193` (`1193`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Transactions` table with columns `id` (primary key), `country`, `state` (`'approved'` or `'declined'`), `amount`, and `trans_date`.

For each `(month, country)` pair—where `month` is formatted as `'YYYY-MM'`—report:
- `trans_count`: total number of transactions,
- `approved_count`: number of approved transactions,
- `trans_total_amount`: sum of `amount` across all transactions,
- `approved_total_amount`: sum of `amount` across approved transactions.

Return the result table in any order.

---

## Examples

### Example 1

```text
Input:
Transactions table:
+------+---------+----------+--------+------------+
| id   | country | state    | amount | trans_date |
+------+---------+----------+--------+------------+
| 121  | US      | approved | 1000   | 2018-12-18 |
| 122  | US      | declined | 2000   | 2018-12-19 |
| 123  | US      | approved | 2000   | 2019-01-01 |
| 124  | DE      | approved | 2000   | 2019-01-07 |
+------+---------+----------+--------+------------+
Output:
+----------+---------+-------------+----------------+--------------------+-----------------------+
| month    | country | trans_count | approved_count | trans_total_amount | approved_total_amount |
+----------+---------+-------------+----------------+--------------------+-----------------------+
| 2018-12  | US      | 2           | 1              | 3000               | 1000                  |
| 2019-01  | US      | 1           | 1              | 2000               | 2000                  |
| 2019-01  | DE      | 1           | 1              | 2000               | 2000                  |
+----------+---------+-------------+----------------+--------------------+-----------------------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Month Extraction:** `trans_date` is a full `DATE` (`YYYY-MM-DD`), so we must truncate/format it to `'YYYY-MM'` before grouping.
- **Zero-Approved & `NULL`-Country Edge Cases:** A `(month, country)` group may contain **only** `'declined'` transactions (requiring `approved_count = 0` and `approved_total_amount = 0`, not `NULL` or omitted rows!), and `country` itself can be `NULL` in test cases.
- **Single-Pass Conditional Aggregation:** Computing both overall totals and approved totals inside a single `GROUP BY` avoids lossy joins and handles `NULL` countries seamlessly.

---

## Approach

### Brute Force Approach

Aggregating all transactions in one subquery and approved transactions (`WHERE state = 'approved'`) in a second subquery, then joining them on `month` and `country`, scans `Transactions` twice and subtly fails on `NULL` countries if joined with `=` instead of null-safe `<=>` (and drops declined-only groups if `INNER JOIN` is used).

### Optimized Approach

Format `trans_date` with `DATE_FORMAT(trans_date, '%Y-%m')`, `GROUP BY` `month` and `country` (`GROUP BY 1, 2`), and compute all four metrics in one pass using `COUNT(1)`, `SUM(state = 'approved')`, `SUM(amount)`, and `SUM(IF(state = 'approved', amount, 0))`.

### Step-by-Step Thinking Process

1. Extract `'YYYY-MM'` from `trans_date` using `DATE_FORMAT(trans_date, '%Y-%m') AS month`.
2. Group by `month` and `country` (`GROUP BY 1, 2`), which automatically places `NULL` countries into their own valid group per month.
3. Count all rows in each group with `COUNT(1)` and sum all amounts with `SUM(amount)`.
4. Count approved rows using `SUM(state = 'approved')` (`1` if approved, `0` if declined) and sum approved amounts using `SUM(IF(state = 'approved', amount, 0))` so groups with zero approved transactions yield `0` rather than `NULL`.

### Algorithm / Intuition

Every row in a `(month, country)` group contributes to the four aggregates simultaneously:

- `COUNT(1)` counts every transaction in the bucket.
- `SUM(state = 'approved')` adds `1` when `state = 'approved'` and `0` when `state = 'declined'`.
- `SUM(amount)` totals all transaction amounts.
- `SUM(IF(state = 'approved', amount, 0))` conditionally adds `amount` for approved rows and `0` for declined rows. Supplying `0` (instead of `NULL`) as the third argument to `IF(...)` guarantees `approved_total_amount` evaluates to `0` even when every transaction in that month and country was declined.

---

## Dry Run

Using **Example 1**:

1. **Bucket `('2018-12', 'US')`** — rows `(id=121, approved, 1000)` and `(id=122, declined, 2000)`:
   - `trans_count = 2`
   - `approved_count = 1 + 0 = 1`
   - `trans_total_amount = 1000 + 2000 = 3000`
   - `approved_total_amount = 1000 + 0 = 1000`
2. **Bucket `('2019-01', 'US')`** — row `(id=123, approved, 2000)`:
   - `trans_count = 1`, `approved_count = 1`, `trans_total_amount = 2000`, `approved_total_amount = 2000`.
3. **Bucket `('2019-01', 'DE')`** — row `(id=124, approved, 2000)`:
   - `trans_count = 1`, `approved_count = 1`, `trans_total_amount = 2000`, `approved_total_amount = 2000`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — The `Transactions` table (`n` rows) is scanned once and aggregated via hash grouping.
- **Space Complexity:** `O(g)` — Hash aggregation maintains state for `g` distinct `(month, country)` groups (`g <= n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1193monthly-transactions-i.sql](./1193monthly-transactions-i.sql) |

---

## Key Learnings

- Conditional aggregation (`SUM(cond)` and `SUM(IF(cond, val, 0))`) computes filtered and unfiltered metrics in a single table scan.
- SQL `GROUP BY` treats `NULL` values as equal to each other (putting `country IS NULL` into its own bucket), whereas `JOIN ... ON a.country = b.country` drops `NULL` matches unless `<=>` is used.
- `DATE_FORMAT(date_col, '%Y-%m')` (or `LEFT(trans_date, 7)`) cleanly formats dates into `'YYYY-MM'` month buckets.
