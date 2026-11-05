---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1174. Immediate Food Delivery II

**[View Problem on LeetCode](https://leetcode.com/problems/immediate-food-delivery-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1174` (`1174`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Delivery` table with columns `delivery_id` (unique key), `customer_id`, `order_date`, and `customer_pref_delivery_date`.

- An order is **immediate** if `order_date = customer_pref_delivery_date`; otherwise it is **scheduled**.
- A customer's **first order** is their order with the earliest `order_date` (guaranteed unique per customer).

Calculate the **percentage of immediate orders among the first orders of all customers**, rounded to **2 decimal places** as `immediate_percentage`.

---

## Examples

### Example 1

```text
Input:
Delivery table:
+-------------+-------------+------------+-----------------------------+
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
+-------------+-------------+------------+-----------------------------+
| 1           | 1           | 2019-08-01 | 2019-08-02                  |
| 2           | 2           | 2019-08-02 | 2019-08-02                  |
| 3           | 1           | 2019-08-11 | 2019-08-12                  |
| 4           | 3           | 2019-08-24 | 2019-08-24                  |
| 5           | 3           | 2019-08-21 | 2019-08-22                  |
| 6           | 2           | 2019-08-11 | 2019-08-13                  |
| 7           | 4           | 2019-08-09 | 2019-08-09                  |
+-------------+-------------+------------+-----------------------------+
Output:
+----------------------+
| immediate_percentage |
+----------------------+
| 50.00                |
+----------------------+
Explanation:
The customer id 1 has a first order with delivery id 1 and it is scheduled.
The customer id 2 has a first order with delivery id 2 and it is immediate.
The customer id 3 has a first order with delivery id 5 and it is scheduled.
The customer id 4 has a first order with delivery id 7 and it is immediate.
Hence, half the customers have immediate first orders.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Unique First Order Guarantee:** Each customer has strictly one earliest `order_date`, so filtering by `(customer_id, MIN(order_date))` yields exactly `1` row per distinct customer.
- **Percentage as Mean of Indicator:** Across `c` first orders, the percentage that satisfy `order_date = customer_pref_delivery_date` equals `(number of immediate first orders / c) * 100`, which is identical to `AVG(indicator) * 100` where `indicator` is `1` for immediate and `0` for scheduled.

---

## Approach

### Brute Force Approach

Joining `Delivery` to a subquery of first-order dates, then computing `(SELECT COUNT(*) ...) / (SELECT COUNT(DISTINCT customer_id) FROM Delivery) * 100` using separate numerator and denominator subqueries scans the table multiple extra times.

### Optimized Approach

Filter `Delivery` to only first orders via `(customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY 1)`, then compute `ROUND(AVG(order_date = customer_pref_delivery_date) * 100, 2)` in a single aggregation.

### Step-by-Step Thinking Process

1. Find each customer's debut order date in a subquery: `SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY 1`.
2. Filter the outer `Delivery` table with `WHERE (customer_id, order_date) IN (...)` to isolate the exact set of first orders (one row per customer).
3. Evaluate the boolean expression `order_date = customer_pref_delivery_date`, which yields `1` for immediate orders and `0` for scheduled orders in MySQL.
4. Take `AVG(...) * 100` and round to two decimal places with `ROUND(..., 2)`.

### Algorithm / Intuition

Because every customer is guaranteed to have a unique minimum `order_date`, the `WHERE (customer_id, order_date) IN (...)` filter leaves exactly one row per customer.

In MySQL, relational comparisons like `order_date = customer_pref_delivery_date` evaluate directly to `1` (true) or `0` (false) when neither operand is `NULL`. Averaging a column of `1`s and `0`s produces the exact proportion of `1`s (`sum / count`), so multiplying by `100` and wrapping with `ROUND(..., 2)` yields the immediate percentage concisely without manual `CASE WHEN` or division-by-count boilerplate.

---

## Dry Run

Using **Example 1**:

1. **Subquery (`MIN(order_date)` per `customer_id`):**
   - Customer `1`: `min('2019-08-01', '2019-08-11')` -> `(1, '2019-08-01')`
   - Customer `2`: `min('2019-08-02', '2019-08-11')` -> `(2, '2019-08-02')`
   - Customer `3`: `min('2019-08-24', '2019-08-21')` -> `(3, '2019-08-21')`
   - Customer `4`: `min('2019-08-09')` -> `(4, '2019-08-09')`
2. **Filtered Outer Rows & Boolean Evaluation (`order_date = customer_pref_delivery_date`):**
   - `delivery_id = 1` (Cust `1`, `'2019-08-01'` vs `'2019-08-02'`) -> `0` (scheduled)
   - `delivery_id = 2` (Cust `2`, `'2019-08-02'` vs `'2019-08-02'`) -> `1` (immediate)
   - `delivery_id = 5` (Cust `3`, `'2019-08-21'` vs `'2019-08-22'`) -> `0` (scheduled)
   - `delivery_id = 7` (Cust `4`, `'2019-08-09'` vs `'2019-08-09'`) -> `1` (immediate)
3. **Aggregate:**
   - `AVG([0, 1, 0, 1]) * 100` = `0.5000 * 100` = `50.0000` -> `ROUND(..., 2)` = **`50.00`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` average — Scanning `n` delivery rows to group by `customer_id` and probing the `(customer_id, order_date)` hash set both take linear average time.
- **Space Complexity:** `O(c)` — The subquery materializes one `(customer_id, min_order_date)` tuple for each of the `c` distinct customers (`c <= n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1174immediate-food-delivery-ii.sql](./1174immediate-food-delivery-ii.sql) |

---

## Key Learnings

- In MySQL, `AVG(condition) * 100` is an idiomatic, division-by-zero-safe shorthand for computing the percentage of rows matching `condition`.
- Always verify uniqueness guarantees: `(customer_id, order_date) IN (...)` represents exact 1-to-1 customer weighting here only because each customer has a single first order on their earliest date.
