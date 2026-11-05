---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1164. Product Price at a Given Date

**[View Problem on LeetCode](https://leetcode.com/problems/product-price-at-a-given-date/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1164` (`1164`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Products` table with columns `product_id`, `new_price`, and `change_date`, where `(product_id, change_date)` is the composite primary key. Every product starts with a default initial price of `10` before any recorded price changes.

Write an SQL query to determine the active `price` of **every** distinct product in `Products` as of `'2019-08-16'`. Return the result with columns `product_id` and `price` in any order.

---

## Examples

### Example 1

```text
Input:
Products table:
+------------+-----------+-------------+
| product_id | new_price | change_date |
+------------+-----------+-------------+
| 1          | 20        | 2019-08-14  |
| 2          | 50        | 2019-08-14  |
| 1          | 30        | 2019-08-15  |
| 1          | 35        | 2019-08-16  |
| 2          | 65        | 2019-08-17  |
| 3          | 20        | 2019-08-18  |
+------------+-----------+-------------+
Output:
+------------+-------+
| product_id | price |
+------------+-------+
| 2          | 50    |
| 1          | 35    |
| 3          | 10    |
+------------+-------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Latest Effective Change:** For any product that had at least one price update on or before `'2019-08-16'`, its price on `'2019-08-16'` is the `new_price` from the row with `MAX(change_date)` among rows satisfying `change_date <= '2019-08-16'`.
- **Products With Only Future Changes:** A product (such as `product_id = 3` in Example 1, first changed on `'2019-08-18'`) might have **zero** rows on or before `'2019-08-16'`. Simply running `WHERE change_date <= '2019-08-16'` would erase that product from the output instead of reporting its initial price `10`!
- **Primary Key Uniqueness:** Since `(product_id, change_date)` is unique, matching `(product_id, MAX(change_date))` retrieves at most one row per product.

---

## Approach

### Brute Force Approach

For every distinct `product_id`, run a correlated scalar subquery `(SELECT new_price FROM Products p2 WHERE p2.product_id = p1.product_id AND p2.change_date <= '2019-08-16' ORDER BY change_date DESC LIMIT 1)` wrapped in `IFNULL(..., 10)`. Without a composite index on `(product_id, change_date)`, repeatedly filtering and sorting per product scales as `O(p * n)`.

### Optimized Approach

Define CTE `T` with all distinct `product_id`s and CTE `P` with the latest pre-cutoff price per product (via tuple matching on `MAX(change_date)` where `change_date <= '2019-08-16'`), then `LEFT JOIN` `T` to `P` and apply `IFNULL(price, 10)`.

### Step-by-Step Thinking Process

1. Build CTE `T` (`SELECT DISTINCT product_id FROM Products`) so every product in the catalog is guaranteed to appear in the final output.
2. Filter `Products` to `change_date <= '2019-08-16'` and group by `product_id` to find each product's most recent valid `MAX(change_date)`.
3. Build CTE `P` by selecting `(product_id, new_price AS price)` from `Products` where `(product_id, change_date)` belongs to that latest-date set.
4. `LEFT JOIN` `T` with `P` `USING (product_id)` and wrap `price` in `IFNULL(price, 10)` so products without any change on or before `'2019-08-16'` fall back to `10`.

### Algorithm / Intuition

Splitting the logic into two Common Table Expressions (`T` and `P`) keeps the query modular and bug-free:

- `T` captures the complete universe of products, regardless of when their prices changed.
- `P` isolates the effective price as of `'2019-08-16'` using `(product_id, change_date) IN (SELECT product_id, MAX(change_date) ... WHERE change_date <= '2019-08-16' GROUP BY 1)`.

Joining `T LEFT JOIN P USING (product_id)` pairs every product with its effective `price` if one exists in `P`, or `NULL` if all of its changes occurred after `'2019-08-16'`. Finally, `IFNULL(price, 10)` converts `NULL` into the initial price `10`.

---

## Dry Run

Using **Example 1** (target date `'2019-08-16'`):

1. **CTE `T` (`DISTINCT product_id`):** `{1, 2, 3}`.
2. **Inner Subquery (`change_date <= '2019-08-16'`, `MAX(change_date)`):**
   - `product_id = 1`: dates `['2019-08-14', '2019-08-15', '2019-08-16']` -> `MAX = '2019-08-16'`.
   - `product_id = 2`: date `['2019-08-14']` (`'2019-08-17'` excluded) -> `MAX = '2019-08-14'`.
   - `product_id = 3`: `'2019-08-18'` excluded -> not in subquery.
3. **CTE `P`:**
   - Matches `(1, '2019-08-16')` -> `(product_id=1, price=35)`.
   - Matches `(2, '2019-08-14')` -> `(product_id=2, price=50)`.
4. **`T LEFT JOIN P` + `IFNULL(price, 10)`:**
   - `product_id = 1` -> `35`.
   - `product_id = 2` -> `50`.
   - `product_id = 3` -> `IFNULL(NULL, 10)` = `10`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` average — Extracting distinct products, computing `MAX(change_date)` via hash aggregation, hash semi-joining `P`, and left-joining `T` with `P` each run in linear time over the `n` rows.
- **Space Complexity:** `O(p)` — CTEs `T`, `P`, and the grouping hash table each store at most one entry per distinct product (`p <= n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1164product-price-at-a-given-date.sql](./1164product-price-at-a-given-date.sql) |

---

## Key Learnings

- Whenever a cutoff filter (`WHERE date <= X`) can eliminate entire entities that still need a default value in the output, preserve the entity list first and `LEFT JOIN` the filtered results.
- `IFNULL(col, default_val)` (or standard SQL `COALESCE`) cleanly substitutes fallback values after an outer join.
- An alternative approach is `UNION ALL` between the `<= '2019-08-16'` latest-price rows and `SELECT product_id, 10 FROM Products GROUP BY product_id HAVING MIN(change_date) > '2019-08-16'`.
