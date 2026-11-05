---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1045. Customers Who Bought All Products

**[View Problem on LeetCode](https://leetcode.com/problems/customers-who-bought-all-products/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1045` (`1045`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two SQL tables:
- `Customer(customer_id, product_key)`: Records product purchases made by customers. Duplicate rows **may** exist, `customer_id` is never `NULL`, and `product_key` is a foreign key referencing `Product(product_key)`.
- `Product(product_key)`: Lists all available products, where `product_key` is the primary key.

Write a query to return every `customer_id` from `Customer` who has purchased **all** products listed in the `Product` table, in any order.

---

## Examples

### Example 1

```text
Input:
Customer table:
+-------------+-------------+
| customer_id | product_key |
+-------------+-------------+
| 1           | 5           |
| 2           | 6           |
| 3           | 5           |
| 3           | 6           |
| 1           | 6           |
+-------------+-------------+
Product table:
+-------------+
| product_key |
+-------------+
| 5           |
| 6           |
+-------------+
Output:
+-------------+
| customer_id |
+-------------+
| 1           |
| 3           |
+-------------+
Explanation:
The customers who bought all the products (5 and 6) are customers with IDs 1 and 3.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Duplicate Purchases:** A customer can buy the same product multiple times (duplicate `(customer_id, product_key)` rows). Counting raw rows `COUNT(product_key)` would falsely inflate their count—we must use `COUNT(DISTINCT product_key)`.
- **Foreign Key Guarantee:** Because `Customer.product_key` is a foreign key into `Product`, every distinct `product_key` bought by a customer is guaranteed to belong to `Product`. Thus, a customer bought every product if and only if their distinct product count equals the total row count of `Product`.
- **Primary Key on `Product`:** `Product.product_key` has unique values, so `(SELECT COUNT(1) FROM Product)` equals the exact number of distinct products.

---

## Approach

### Brute Force Approach

Cross-joining distinct `customer_id`s with `Product` to materialize all `(customer_id, product_key)` combinations, left-joining `Customer`, and filtering out customers with any `NULL` match materializes `O(|Customers| * |Product|)` intermediate rows unnecessarily.

### Optimized Approach

Perform **Relational Division via `GROUP BY` and `HAVING`**: group `Customer` by `customer_id` (`GROUP BY 1`) and filter groups where `COUNT(DISTINCT product_key)` equals the scalar subquery `(SELECT COUNT(1) FROM Product)`.

### Step-by-Step Thinking Process

1. Group rows of `Customer` by `customer_id` (written concisely as `GROUP BY 1`, referencing the first column in `SELECT customer_id`).
2. For each customer group, compute the number of unique products purchased using `COUNT(DISTINCT product_key)`.
3. Compute the total catalog size once via the uncorrelated scalar subquery `(SELECT COUNT(1) FROM Product)`.
4. Keep only customer groups satisfying `HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(1) FROM Product)`.

### Algorithm / Intuition

This query implements the classic SQL **relational division** pattern (`Customer DIVIDEBY Product`).

Because `product_key` in `Customer` has a foreign-key constraint referencing `Product`, a customer's set of distinct `product_key`s is always a subset of `Product`. Two finite sets `A subseteq B` are equal if and only if `|A| = |B|`! `COUNT(DISTINCT product_key)` computes `|A|` per customer (deduplicating repeat purchases), while `(SELECT COUNT(1) FROM Product)` computes `|B|`, and `HAVING` retains only exact matches.

---

## Dry Run

Trace on **Example 1**:
- `Product`: `{5, 6}` -> `(SELECT COUNT(1) FROM Product)` evaluates to `2`.
- Group `Customer` by `customer_id`:

| `customer_id` | Purchased `product_key` Rows | `COUNT(DISTINCT product_key)` | Equals `2`? | Included? |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `[5, 6]` | `2` (`{5, 6}`) | Yes | **Yes** |
| `2` | `[6]` | `1` (`{6}`) | No | No |
| `3` | `[5, 6]` | `2` (`{5, 6}`) | Yes | **Yes** |

- **Result Table:** `customer_id` rows `1` and `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(C + P)` average (or `O(C log C + P)` with sort-based grouping) — Scans `P` rows of `Product` once for the scalar count and aggregates `C` rows of `Customer` by `customer_id` and distinct `product_key`.
- **Space Complexity:** `O(C)` — Hash/sort aggregation tracks distinct `(customer_id, product_key)` pairs across customers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1045customers-who-bought-all-products.sql](./1045customers-who-bought-all-products.sql) |

---

## Key Learnings

- Comparing `COUNT(DISTINCT fk_col) = (SELECT COUNT(1) FROM Target)` is only safe when a **foreign key constraint** guarantees `Customer` contains no orphan keys outside `Product` (otherwise an `INNER JOIN Product` is needed first).
- Always check whether transaction tables allow duplicate rows—omitting `DISTINCT` inside `COUNT(...)` is the most common bug in relational division queries.
- `GROUP BY 1` is MySQL/SQL shorthand for grouping by the `1`st expression in the `SELECT` list, though explicit `GROUP BY customer_id` is often preferred for readability in large queries.
