---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1251. Average Selling Price

**[View Problem on LeetCode](https://leetcode.com/problems/average-selling-price/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1251` (`1251`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two tables:
- `Prices` (`product_id`, `start_date`, `end_date`, `price`), where `(product_id, start_date, end_date)` is the primary key and date intervals for the same `product_id` never overlap.
- `UnitsSold` (`product_id`, `purchase_date`, `units`), which may contain duplicate rows.

Calculate the **weighted average selling price** (`total revenue / total units sold`) for every `product_id`, rounded to **2 decimal places** as `average_price`. If a product has **no** sold units, report `0`. Return the result in any order.

---

## Examples

### Example 1

```text
Input:
Prices table:
+------------+------------+------------+--------+
| product_id | start_date | end_date   | price  |
+------------+------------+------------+--------+
| 1          | 2019-02-17 | 2019-02-28 | 5      |
| 1          | 2019-03-01 | 2019-03-22 | 20     |
| 2          | 2019-02-01 | 2019-02-20 | 15     |
| 2          | 2019-02-21 | 2019-03-31 | 30     |
+------------+------------+------------+--------+
UnitsSold table:
+------------+---------------+-------+
| product_id | purchase_date | units |
+------------+---------------+-------+
| 1          | 2019-02-25    | 100   |
| 1          | 2019-03-01    | 15    |
| 2          | 2019-02-10    | 200   |
| 2          | 2019-03-22    | 30    |
+------------+---------------+-------+
Output:
+------------+---------------+
| product_id | average_price |
+------------+---------------+
| 1          | 6.96          |
| 2          | 16.96         |
+------------+---------------+
Explanation:
Average selling price = Total Price of Product / Number of products sold.
Average selling price for product 1 = ((100 * 5) + (15 * 20)) / 115 = 6.96
Average selling price for product 2 = ((200 * 15) + (30 * 30)) / 230 = 16.96
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Weighted Average vs Simple Average:** Selling `100` units at `5` and `15` units at `20` yields `(100 * 5 + 15 * 20) / (100 + 15)`, **not** `AVG(price)`!
- **Zero-Sales Products:** A `product_id` present in `Prices` might have zero rows in `UnitsSold`. Using `INNER JOIN` would lose that product; we must start from `Prices` and `LEFT JOIN` `UnitsSold`.
- **Join Condition Placement:** The date check `purchase_date BETWEEN start_date AND end_date` **must** live inside the `LEFT JOIN ... ON` clause—placing it in `WHERE` would filter out `NULL` `purchase_date`s and silently turn the `LEFT JOIN` into an `INNER JOIN`!

---

## Approach

### Brute Force Approach

Joining `UnitsSold` and `Prices` with an `INNER JOIN` to compute averages for sold products, and then writing a `UNION` query with `NOT IN` to append `0` for unsold products from `Prices`, duplicates scanning and complicates the query.

### Optimized Approach

`LEFT JOIN` `Prices AS p` to `UnitsSold AS u` on matching `product_id` and `purchase_date BETWEEN start_date AND end_date`, group by `p.product_id`, and compute `IFNULL(ROUND(SUM(price * units) / SUM(units), 2), 0)`.

### Step-by-Step Thinking Process

1. Use `Prices AS p` as the left table and `LEFT JOIN UnitsSold AS u` so every `product_id` in `Prices` is preserved even when it has zero sales.
2. Match each sale to its unique non-overlapping price window via `ON p.product_id = u.product_id AND purchase_date BETWEEN start_date AND end_date`.
3. Group by `p.product_id` (`GROUP BY 1`) and calculate weighted average revenue per unit: `ROUND(SUM(price * units) / SUM(units), 2)`.
4. Wrap the expression in `IFNULL(..., 0)` so unsold products (where `u.units` is `NULL`, making `SUM(units)` `NULL`) return `0`.

### Algorithm / Intuition

Because price periods for a given `product_id` are guaranteed non-overlapping, every row in `UnitsSold` joins to at most one row in `Prices`—meaning `SUM(units)` never double-counts sold units. Conversely, a price period with no sales during `[start_date, end_date]` produces a single row with `u.units = NULL`, which SQL `SUM` ignores when other periods have sales, or turns the entire product's `SUM(units)` into `NULL` if **no** period had sales. Wrapping `ROUND(SUM(price * units) / SUM(units), 2)` inside `IFNULL(..., 0)` cleanly handles that zero-sales case.

---

## Dry Run

Using **Example 1**:

1. **Range `LEFT JOIN`:**
   - `product_id = 1`, `[02-17..02-28]` (`price=5`) matches `02-25` (`units=100`) -> `5 * 100 = 500`.
   - `product_id = 1`, `[03-01..03-22]` (`price=20`) matches `03-01` (`units=15`) -> `20 * 15 = 300`.
   - `product_id = 2`, `[02-01..02-20]` (`price=15`) matches `02-10` (`units=200`) -> `15 * 200 = 3000`.
   - `product_id = 2`, `[02-21..03-31]` (`price=30`) matches `03-22` (`units=30`) -> `30 * 30 = 900`.
2. **Group & Aggregate:**
   - `product_id = 1`: `ROUND((500 + 300) / (100 + 15), 2)` = `ROUND(800 / 115, 2)` = **`6.96`**.
   - `product_id = 2`: `ROUND((3000 + 900) / (200 + 30), 2)` = `ROUND(3900 / 230, 2)` = **`16.96`**.

---

## Complexity Analysis

- **Time Complexity:** `O(P * U)` worst-case (`O((P + U) log P)` with index) — Matching `U` sales rows against `P` price intervals per product, followed by hash grouping over the joined rows.
- **Space Complexity:** `O(K)` — Hash aggregation stores running sums for `K` distinct `product_id`s.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1251average-selling-price.sql](./1251average-selling-price.sql) |

---

## Key Learnings

- In a `LEFT JOIN`, predicates referencing the right table (`purchase_date BETWEEN start_date AND end_date`) must go in the `ON` clause rather than `WHERE` if unmatched left rows need to be preserved.
- Non-overlapping intervals in `Prices` ensure `LEFT JOIN` does not duplicate `UnitsSold` rows.
- Dividing by `NULL` in SQL yields `NULL` (not a division-by-zero error), allowing `IFNULL(..., 0)` to safely catch zero-unit products.
