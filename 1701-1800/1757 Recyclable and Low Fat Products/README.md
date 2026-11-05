---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1757. Recyclable and Low Fat Products

**[View Problem on LeetCode](https://leetcode.com/problems/recyclable-and-low-fat-products/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1757` (`1757`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

We are given a `Products` table with three columns: `product_id` (integer primary key), `low_fats` (`ENUM('Y', 'N')` indicating whether a product is low fat), and `recyclable` (`ENUM('Y', 'N')` indicating whether a product is recyclable).

Write a SQL query to return the `product_id` of every product that is **both** low fat (`'Y'`) and recyclable (`'Y'`). The output rows may be returned in any order.

---

## Examples

### Example 1

```text
Input:
Products table:
+-------------+----------+------------+
| product_id  | low_fats | recyclable |
+-------------+----------+------------+
| 0           | Y        | N          |
| 1           | Y        | Y          |
| 2           | N        | Y          |
| 3           | Y        | Y          |
| 4           | N        | N          |
+-------------+----------+------------+
Output:
+-------------+
| product_id  |
+-------------+
| 1           |
| 3           |
+-------------+
Explanation: Only products 1 and 3 are both low fat and recyclable.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Conjunctive Filter:** Both conditions (`low_fats = 'Y'` and `recyclable = 'Y'`) must hold simultaneously for a row to qualify.
- **Primary Key Uniqueness:** Since `product_id` is the primary key, matching rows already have unique `product_id` values without needing `DISTINCT`.
- **Unordered Output:** Any output row order is accepted.

---

## Approach

### Brute Force Approach

A naive query might select all columns or apply `DISTINCT` / unnecessary sorting (`ORDER BY product_id`), or intersect two separate `SELECT` queries. While functionally right, extra sorting or set intersection adds avoidable overhead over a single conjunctive `WHERE` scan.

### Optimized Approach

Select `product_id` directly from `Products` using `WHERE low_fats = 'Y' AND recyclable = 'Y'`, with `ORDER BY NULL` explicitly indicating no output sorting is required.

### Step-by-Step Thinking Process

1. Identify the target column to project: `product_id`.
2. Combine the two category predicates in the `WHERE` clause using `AND`: `low_fats = 'Y' AND recyclable = 'Y'`.
3. Optionally specify `ORDER BY NULL` so the SQL engine never performs any implicit filesort.

### Algorithm / Intuition

The query scans `Products` (or uses a composite index on `(low_fats, recyclable)` if present) and evaluates `low_fats = 'Y' AND recyclable = 'Y'` for each row. Only matching `product_id` integers are projected. Adding `ORDER BY NULL` is a classic MySQL idiom confirming no sort pass is desired.

---

## Dry Run

Using **Example 1**:

| `product_id` | `low_fats` | `recyclable` | Matches `low_fats = 'Y' AND recyclable = 'Y'`? |
| :--- | :--- | :--- | :--- |
| `0` | `'Y'` | `'N'` | No |
| `1` | `'Y'` | `'Y'` | **Yes** -> emit `1` |
| `2` | `'N'` | `'Y'` | No |
| `3` | `'Y'` | `'Y'` | **Yes** -> emit `3` |
| `4` | `'N'` | `'N'` | No |

Result table contains `product_id` values `1` and `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Performs a single full table scan over `n` rows in `Products` (assuming no secondary index).
- **Space Complexity:** `O(1)` auxiliary space (`O(n)` if counting the output result set of up to `n` matching IDs), as rows are filtered on the fly without sorting or hashing.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1757recyclable-and-low-fat-products.sql](./1757recyclable-and-low-fat-products.sql) |

---

## Key Learnings

- Because `product_id` is the primary key, `DISTINCT` is redundant and omitting it avoids unnecessary deduplication work.
- In MySQL, `ORDER BY NULL` explicitly tells the query planner that result ordering does not matter.
