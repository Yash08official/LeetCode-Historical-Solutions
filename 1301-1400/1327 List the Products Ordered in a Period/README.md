---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1327. List the Products Ordered in a Period

**[View Problem on LeetCode](https://leetcode.com/problems/list-the-products-ordered-in-a-period/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1327` (`1327`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two tables:
- `Products(product_id, product_name, product_category)` where `product_id` is the primary key.
- `Orders(product_id, order_date, unit)` which may contain duplicate rows and links to `Products` via foreign key `product_id`.

Write a SQL query to find the `product_name` and total `unit` ordered for every product that had **at least `100` units** ordered during **February 2020**. Return the result in any order.

---

## Examples

### Example 1

```text
Input:
Products table:
+-------------+-----------------------+------------------+
| product_id  | product_name          | product_category |
+-------------+-----------------------+------------------+
| 1           | Leetcode Solutions    | Book             |
| 2           | Jewels of Stringology | Book             |
| 3           | HP                    | Laptop           |
| 4           | Lenovo                | Laptop           |
| 5           | Leetcode Kit          | T-shirt          |
+-------------+-----------------------+------------------+
Orders table:
+--------------+--------------+----------+
| product_id   | order_date   | unit     |
+--------------+--------------+----------+
| 1            | 2020-02-05   | 60       |
| 1            | 2020-02-10   | 70       |
| 2            | 2020-01-18   | 30       |
| 2            | 2020-02-11   | 80       |
| 3            | 2020-02-17   | 2        |
| 3            | 2020-02-24   | 3        |
| 4            | 2020-03-01   | 20       |
| 4            | 2020-03-04   | 30       |
| 4            | 2020-03-04   | 60       |
| 5            | 2020-02-25   | 50       |
| 5            | 2020-02-27   | 50       |
| 5            | 2020-03-01   | 50       |
+--------------+--------------+----------+
Output:
+--------------------+---------+
| product_name       | unit    |
+--------------------+---------+
| Leetcode Solutions | 130     |
| Leetcode Kit       | 100     |
+--------------------+---------+
Explanation:
Products with product_id = 1 is ordered in February a total of (60 + 70) = 130.
Products with product_id = 2 is ordered in February a total of 80.
Products with product_id = 3 is ordered in February a total of (2 + 3) = 5.
Products with product_id = 4 was not ordered in February 2020.
Products with product_id = 5 is ordered in February a total of (50 + 50) = 100.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Orders outside February 2020 (e.g., January 2020 or March 2020) must be excluded **before** summing `unit` (`WHERE` clause).
- A single product can have multiple order rows in February 2020 (even on the same date), so we must `SUM(unit)` grouped by `product_id`.
- Filtering on the aggregated total `SUM(unit) >= 100` must happen **after** grouping (`HAVING` clause, not `WHERE`).
- Grouping by `o.product_id` (rather than only `product_name`) is good practice in case two distinct `product_id`s ever shared a name.

---

## Approach

### Brute Force Approach

Summing all orders per product in a subquery filtered by February 2020 and then joining the derived table back to `Products` with an outer `WHERE unit >= 100` works, but a single flat `JOIN ... WHERE ... GROUP BY ... HAVING` query expresses the exact same logic much more concisely.

### Optimized Approach

Join `Orders AS o` with `Products AS p` on `product_id`, filter February 2020 rows with `WHERE DATE_FORMAT(order_date, '%Y-%m') = '2020-02'`, group by `o.product_id`, and retain totals of at least `100` using `HAVING unit >= 100`.

### Step-by-Step Thinking Process

1. Join `Orders` (`o`) and `Products` (`p`) on `o.product_id = p.product_id` to access `product_name` alongside `order_date` and `unit`.
2. Restrict rows to February 2020 using `WHERE DATE_FORMAT(order_date, '%Y-%m') = '2020-02'`.
3. Collapse each product's February orders via `GROUP BY o.product_id` and compute `SUM(unit) AS unit`.
4. Filter groups whose total units reach at least `100` with `HAVING unit >= 100` (MySQL allows referencing the `SELECT` alias `unit` inside `HAVING`).

### Algorithm / Intuition

SQL's logical query execution order processes `FROM / JOIN` -> `WHERE` -> `GROUP BY` -> `SELECT` aggregations -> `HAVING`. First, `WHERE DATE_FORMAT(order_date, '%Y-%m') = '2020-02'` discards all January and March rows from `Orders`. Next, `GROUP BY o.product_id` buckets remaining February rows per product; because `p.product_id` is the primary key of `Products`, `p.product_name` is functionally dependent on `o.product_id`. Finally, `SUM(unit) AS unit` sums each bucket and `HAVING unit >= 100` keeps only qualifying products.

---

## Dry Run

Tracing **Example 1**:

1. **Filter `Orders` to `'2020-02'`:**
   - `product_id = 1` (`Leetcode Solutions`): `60` (`02-05`) + `70` (`02-10`)
   - `product_id = 2` (`Jewels of Stringology`): `80` (`02-11`; `01-18` row of `30` excluded!)
   - `product_id = 3` (`HP`): `2` (`02-17`) + `3` (`02-24`)
   - `product_id = 4` (`Lenovo`): all rows in `'2020-03'` -> excluded
   - `product_id = 5` (`Leetcode Kit`): `50` (`02-25`) + `50` (`02-27`; `03-01` row of `50` excluded!)
2. **`GROUP BY o.product_id` & `SUM(unit)`:**
   - `1` -> `130`, `2` -> `80`, `3` -> `5`, `5` -> `100`
3. **`HAVING unit >= 100`:**
   - Keeps `(Leetcode Solutions, 130)` and `(Leetcode Kit, 100)`.

---

## Complexity Analysis

- **Time Complexity:** `O(O + P)` (or `O(O log P)` depending on join strategy) — Scans `O` rows of `Orders`, formats dates, hashes/joins `product_id` against `Products` (`P` rows), and aggregates per product.
- **Space Complexity:** `O(P)` — Hash aggregation stores at most one accumulator per distinct `product_id` ordered in February 2020.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1327list-the-products-ordered-in-a-period.sql](./1327list-the-products-ordered-in-a-period.sql) |

---

## Key Learnings

- Remember `WHERE` filters individual rows **before** aggregation (e.g., `order_date` in Feb 2020), while `HAVING` filters groups **after** aggregation (`SUM(unit) >= 100`).
- For large indexed production tables, `WHERE order_date >= '2020-02-01' AND order_date < '2020-03-01'` is sargable (can use a B-Tree index on `order_date`), whereas `DATE_FORMAT(order_date, '%Y-%m')` evaluates a function on every row.
- Grouping by the primary key `o.product_id` rather than `product_name` prevents accidentally merging two different products that happen to have the same display name.
