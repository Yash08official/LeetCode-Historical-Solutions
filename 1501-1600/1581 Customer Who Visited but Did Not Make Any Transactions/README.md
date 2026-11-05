---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1581. Customer Who Visited but Did Not Make Any Transactions

**[View Problem on LeetCode](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1581` (`1581`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

We are given two relational tables representing mall customer activity: `Visits` (recording each visit with `visit_id` and `customer_id`) and `Transactions` (recording transactions with `transaction_id`, `visit_id`, and `amount`).

Our task is to find the IDs of all customers who visited the mall without completing any transactions during that visit, along with the count of such visits labeled as `count_no_trans`.

The output rows can be returned in any order.

---

## Examples

### Example 1

```text
Input:
Visits
+----------+-------------+
| visit_id | customer_id |
+----------+-------------+
| 1        | 23          |
| 2        | 9           |
| 4        | 30          |
| 5        | 54          |
| 6        | 96          |
| 7        | 54          |
| 8        | 54          |
+----------+-------------+
Transactions
+----------------+----------+--------+
| transaction_id | visit_id | amount |
+----------------+----------+--------+
| 2              | 5        | 310    |
| 3              | 5        | 300    |
| 9              | 5        | 200    |
| 12             | 1        | 910    |
| 13             | 2        | 970    |
+----------------+----------+--------+
Output:
+-------------+----------------+
| customer_id | count_no_trans |
+-------------+----------------+
| 54          | 2              |
| 30          | 1              |
| 96          | 1              |
+-------------+----------------+
Explanation:
Customer with id = 23 visited the mall once and made one transaction during the visit with id = 12.
Customer with id = 9 visited the mall once and made one transaction during the visit with id = 13.
Customer with id = 30 visited the mall once and did not make any transactions.
Customer with id = 54 visited the mall three times. During 2 visits they did not make any transactions, and during one visit they made 3 transactions.
Customer with id = 96 visited the mall once and did not make any transactions.
As we can see, users with IDs 30 and 96 visited the mall one time without making any transactions. Also, user 54 visited the mall twice and did not make any transactions.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

Each record in `Visits` indicates a distinct visit. A customer may visit the mall multiple times.
A visit with an identifier `visit_id` is considered transaction-free if that `visit_id` never appears in the `Transactions` table.
Customers who have all their visits associated with transactions should not appear in the final output.
For qualifying customers, we aggregate by `customer_id` and count the number of visits that had no matching transactions.

---

## Approach

### Brute Force Approach

A procedural approach loops through every visit in `Visits`, performs a linear search over `Transactions` to check if `visit_id` exists, and maintains a dictionary of counts per customer. In SQL, this is equivalent to a correlated subquery `WHERE NOT EXISTS (SELECT 1 FROM Transactions t WHERE t.visit_id = v.visit_id)` or an uncorrelated `NOT IN` subquery without proper indexing, which can degrade to $O(|Visits| \times |Transactions|)$.

### Optimized Approach

Filter visits using an uncorrelated subquery `WHERE visit_id NOT IN (SELECT DISTINCT visit_id FROM Transactions)`. This identifies all visit IDs with zero transactions. Then, `GROUP BY customer_id` and compute `COUNT(*) AS count_no_trans`.

### Step-by-Step Thinking Process

1. Identify the condition for an unproductive visit: `visit_id` is present in `Visits` but absent in `Transactions`.
2. Extract the set of all visit IDs that generated transactions using `SELECT DISTINCT visit_id FROM Transactions`.
3. Filter the `Visits` table using `WHERE visit_id NOT IN (...)` to isolate visits with no transactions.
4. Group the remaining visit records by `customer_id`.
5. Aggregate the number of non-transaction visits for each customer using `COUNT(*)` aliased as `count_no_trans`.

### Algorithm / Intuition

The query utilizes MySQL's subquery execution. `SELECT DISTINCT visit_id FROM Transactions` collects the unique set of visit IDs that produced sales. The outer query scans `Visits` and evaluates `visit_id NOT IN (...)`. For every visit that did not yield a transaction, the row is preserved. `GROUP BY customer_id` partitions the retained visits by customer, and `COUNT(*)` counts how many times each customer visited without purchasing.

---

## Dry Run

Let's trace Example 1:
1. Distinct `visit_id` in `Transactions`: `{1, 2, 5}`.
2. Filter `Visits` table where `visit_id NOT IN (1, 2, 5)`:
   - `visit_id = 1` (cust 23): in set -> excluded.
   - `visit_id = 2` (cust 9): in set -> excluded.
   - `visit_id = 4` (cust 30): not in set -> kept (`customer_id = 30`).
   - `visit_id = 5` (cust 54): in set -> excluded.
   - `visit_id = 6` (cust 96): not in set -> kept (`customer_id = 96`).
   - `visit_id = 7` (cust 54): not in set -> kept (`customer_id = 54`).
   - `visit_id = 8` (cust 54): not in set -> kept (`customer_id = 54`).
3. Group remaining visits by `customer_id`:
   - `customer_id = 30`: 1 visit (`visit_id = 4`) -> `count_no_trans = 1`.
   - `customer_id = 54`: 2 visits (`visit_id = 7, 8`) -> `count_no_trans = 2`.
   - `customer_id = 96`: 1 visit (`visit_id = 6`) -> `count_no_trans = 1`.
Result matched.

---

## Complexity Analysis

- **Time Complexity:** `O(V + T)` on modern SQL engines where hash semi-join or hash lookup is used, with `V` being the number of rows in `Visits` and `T` the number of rows in `Transactions`.
- **Space Complexity:** `O(U_T + C)` where `U_T` is the number of distinct visit IDs in `Transactions` stored in the subquery hash set, and `C` is the number of qualifying customer groups in the aggregation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1581customer-who-visited-but-did-not-make-any-transactions.sql](./1581customer-who-visited-but-did-not-make-any-transactions.sql) |

---

## Key Learnings

- Finding records in table A that have no matching entry in table B can be achieved via `NOT IN`, `NOT EXISTS`, or `LEFT JOIN ... WHERE B.id IS NULL`.
- When using `NOT IN`, ensure the subquery cannot return `NULL`, as `NOT IN (..., NULL)` evaluates to unknown/falsy in SQL three-valued logic.
- `COUNT(*)` correctly counts the number of filtered rows per customer group.
