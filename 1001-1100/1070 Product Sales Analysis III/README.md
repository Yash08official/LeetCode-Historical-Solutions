---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1070. Product Sales Analysis III

**[View Problem on LeetCode](https://leetcode.com/problems/product-sales-analysis-iii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1070` (`1070`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Sales` table with columns `sale_id`, `product_id`, `year`, `quantity`, and `price`, where `(sale_id, year)` forms the composite primary key. Each row logs a sale transaction for a product during a particular year, and the same product can have multiple sale transactions within the same year.

Your task is to retrieve **every** sale transaction that took place during the **earliest year** each product was ever sold. The output table must contain `product_id`, `first_year` (aliased from `year`), `quantity`, and `price`, returned in any order.

---

## Examples

### Example 1

```text
Input:
Sales table:
+---------+------------+------+----------+-------+
| sale_id | product_id | year | quantity | price |
+---------+------------+------+----------+-------+
| 1       | 100        | 2008 | 10       | 5000  |
| 2       | 100        | 2009 | 12       | 5000  |
| 7       | 200        | 2011 | 15       | 9000  |
+---------+------------+------+----------+-------+

Output:
+------------+------------+----------+-------+
| product_id | first_year | quantity | price |
+------------+------------+----------+-------+
| 100        | 2008       | 10       | 5000  |
| 200        | 2011       | 15       | 9000  |
+------------+------------+----------+-------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Multiple Sales in the First Year:** Because `(sale_id, year)` is the primary key rather than `(product_id, year)`, a single `product_id` may appear multiple times in its debut year with different `sale_id`, `quantity`, or `price` values. Every one of those rows must be preserved.
- **Pitfall of Direct `GROUP BY`:** Writing `SELECT product_id, MIN(year), quantity, price FROM Sales GROUP BY product_id` is invalid in strict SQL (and produces arbitrary `quantity`/`price` values in permissive MySQL modes) while collapsing multiple first-year sales into a single row.
- **Two-Stage Identification:** First find the minimum `year` per `product_id`, then filter the original `Sales` rows whose `(product_id, year)` pair matches one of those earliest `(product_id, first_year)` pairs.

---

## Approach

### Brute Force Approach

A correlated subquery approach checks every row `s1` in `Sales` by running `WHERE s1.year = (SELECT MIN(s2.year) FROM Sales s2 WHERE s2.product_id = s1.product_id)`. Without query-optimizer decorrelation or an index on `(product_id, year)`, logically re-evaluating the inner minimum scan per outer row leads to `O(n^2)` row comparisons.

### Optimized Approach

Compute `(product_id, MIN(year))` once across all products in an uncorrelated `GROUP BY` subquery, then filter the outer `Sales` table using tuple membership `(product_id, year) IN (...)`.

### Step-by-Step Thinking Process

1. Identify what defines a product's debut year: for each `product_id`, it is `MIN(year)` across all rows in `Sales`.
2. Aggregate `Sales` with `GROUP BY product_id` in a subquery to obtain each product's `(product_id, MIN(year))` pair.
3. Filter the full `Sales` table in the outer query using `WHERE (product_id, year) IN (...)` so that all individual sales rows occurring in that earliest year are retained.
4. Project `product_id`, `year AS first_year`, `quantity`, and `price` to match the required output schema.

### Algorithm / Intuition

The query separates **aggregation** from **row retrieval**. The inner query:

```sql
SELECT product_id, MIN(year) AS year
FROM Sales
GROUP BY product_id
```

produces a compact lookup set containing exactly one `(product_id, earliest_year)` tuple per product. The outer `SELECT` scans `Sales` and checks `(product_id, year) IN (...)`. Because MySQL evaluates multi-column `IN` against an uncorrelated subquery as a hash semi-join (or materialized lookup), all matching transactions from each product's first year—including ties in the same year—are returned cleanly with `year` aliased as `first_year`.

---

## Dry Run

Using **Example 1**:

1. **Inner Subquery (`GROUP BY product_id`):**
   - `product_id = 100`: years are `[2008, 2009]` -> `MIN(year) = 2008` -> emits `(100, 2008)`.
   - `product_id = 200`: years are `[2011]` -> `MIN(year) = 2011` -> emits `(200, 2011)`.
   - Subquery tuple set: `{(100, 2008), (200, 2011)}`.
2. **Outer Query Filtering (`(product_id, year) IN (...)`):**
   - Row `(sale_id=1, product_id=100, year=2008, qty=10, price=5000)`: `(100, 2008)` matches -> **kept**.
   - Row `(sale_id=2, product_id=100, year=2009, qty=12, price=5000)`: `(100, 2009)` does not match -> **filtered out**.
   - Row `(sale_id=7, product_id=200, year=2011, qty=15, price=9000)`: `(200, 2011)` matches -> **kept**.
3. **Final Result:** Returns `(100, 2008, 10, 5000)` and `(200, 2011, 15, 9000)`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` average — Scanning `Sales` (`n` rows) to compute `MIN(year)` per product with hash aggregation takes `O(n)` time, and probing the materialized `(product_id, year)` set for each row in `Sales` also takes `O(n)` average time (or `O(n log n)` if sort-based execution is chosen).
- **Space Complexity:** `O(p)` — The materialized subquery stores one `(product_id, year)` pair for each of the `p` distinct products (`p <= n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1070product-sales-analysis-iii.sql](./1070product-sales-analysis-iii.sql) |

---

## Key Learnings

- Multi-column tuple comparison `(col1, col2) IN (SELECT ...)` in MySQL is a clean idiom for filtering rows that match per-group extrema (`MIN` or `MAX`) while keeping all non-aggregated columns intact.
- Never select non-aggregated columns directly alongside `GROUP BY` unless they are functionally dependent on the grouping key, as multiple rows can share the same minimum year.
- Window functions like `RANK() OVER (PARTITION BY product_id ORDER BY year ASC)` offer an equivalent alternative in MySQL 8.0+.
