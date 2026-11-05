---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1068. Product Sales Analysis I

**[View Problem on LeetCode](https://leetcode.com/problems/product-sales-analysis-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1068` (`1068`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two SQL tables:
- `Sales(sale_id, product_id, year, quantity, price)`: Primary key `(sale_id, year)`, with foreign key `product_id` referencing `Product(product_id)`. Each row records a product sale in a given year at a per-unit `price`.
- `Product(product_id, product_name)`: Primary key `product_id`, mapping each product ID to its `product_name`.

Write a query to report the `product_name`, `year`, and `price` for every row in the `Sales` table, in any order.

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
Product table:
+------------+--------------+
| product_id | product_name |
+------------+--------------+
| 100        | Nokia        |
| 200        | Apple        |
| 300        | Samsung      |
+------------+--------------+
Output:
+--------------+-------+-------+
| product_name | year  | price |
+--------------+-------+-------+
| Nokia        | 2008  | 5000  |
| Nokia        | 2009  | 5000  |
| Apple        | 2011  | 9000  |
+--------------+-------+-------+
Explanation:
From sale_id = 1, we can conclude that Nokia was sold for 5000 in the year 2008.
From sale_id = 2, we can conclude that Nokia was sold for 5000 in the year 2009.
From sale_id = 7, we can conclude that Apple was sold for 9000 in the year 2011.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Grain of the Output:** Every row in `Sales` must appear in the output with its `year` and `price`, enriched with `product_name` looked up from `Product`.
- **Unmatched Products Excluded:** Products in `Product` that have never been sold (such as `Samsung` with `product_id = 300` in Example 1) should **not** appear in the output.
- **One-to-Many Relationship:** Because `Product.product_id` is the primary key of `Product`, joining `Sales` to `Product` on `product_id` matches at most one `Product` row per `Sales` row—no accidental row multiplication occurs.

---

## Approach

### Brute Force Approach

Using a correlated subquery inside `SELECT` (e.g., `SELECT (SELECT product_name FROM Product p WHERE p.product_id = s.product_id), year, price FROM Sales s`) conceptually expresses a row-by-row lookup instead of a declarative relational join, and without an index on `product_id` would scan `Product` repeatedly (`O(S * P)`).

### Optimized Approach

Perform a **`LEFT JOIN`** from `Sales s` to `Product p` on `s.product_id = p.product_id` and project `p.product_name, s.year, s.price`.

### Step-by-Step Thinking Process

1. Start `FROM Sales s` as the driving (left) table because we want one output row per sale record.
2. Join `Product p` using `LEFT JOIN Product p ON s.product_id = p.product_id` so every sale row is preserved while attaching its matching `product_name` (and excluding unsold products).
3. Select the exact requested columns in order: `p.product_name, s.year, s.price`.

### Algorithm / Intuition

In the query:
```sql
SELECT p.product_name, s.year, s.price
FROM Sales s LEFT JOIN Product p ON
    s.product_id = p.product_id
```
`Sales s` is the left table, so all rows in `Sales` are retained, while products like `Samsung` (`product_id = 300`) that have no matching rows in `Sales` are naturally omitted.

Note that because `s.product_id` is a foreign key referencing `Product(product_id)`, an `INNER JOIN` produces the exact same output whenever `s.product_id` is non-`NULL`; using `LEFT JOIN` additionally safeguards against dropping a sale row if `s.product_id` could ever be `NULL`.

---

## Dry Run

Trace on **Example 1**:
- `Sales`: `(1, 100, 2008, 10, 5000)`, `(2, 100, 2009, 12, 5000)`, `(7, 200, 2011, 15, 9000)`
- `Product`: `(100 -> 'Nokia')`, `(200 -> 'Apple')`, `(300 -> 'Samsung')`

| `Sales` Row (`sale_id`, `product_id`) | Matched `Product` Row | Projected `(product_name, year, price)` |
| :--- | :--- | :--- |
| `(1, 100)` | `(100, 'Nokia')` | `('Nokia', 2008, 5000)` |
| `(2, 100)` | `(100, 'Nokia')` | `('Nokia', 2009, 5000)` |
| `(7, 200)` | `(200, 'Apple')` | `('Apple', 2011, 9000)` |

- `product_id = 300` (`'Samsung'`) has no row in `Sales`, so it is not emitted.

---

## Complexity Analysis

- **Time Complexity:** `O(S + P)` — Where `S` is the row count of `Sales` and `P` is the row count of `Product`, executed via primary-key index lookup on `Product.product_id` or a hash join.
- **Space Complexity:** `O(P)` — Hash join builds an in-memory hash table over the `P` rows of `Product` (or `O(1)` auxiliary memory if the engine uses `Product`'s clustered primary-key index).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1068product-sales-analysis-i.sql](./1068product-sales-analysis-i.sql) |

---

## Key Learnings

- Choose the `FROM` / left side of a `LEFT JOIN` to match the entity whose rows define the output grain (`Sales`, not `Product`).
- Joining onto a table's **primary key** (`Product.product_id`) guarantees a `many-to-1` match that never duplicates rows from the driving table.
