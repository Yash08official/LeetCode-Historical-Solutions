---
comments: true
difficulty: Easy
tags:
  - Database
---

# 584. Find Customer Referee

**[View Problem on LeetCode](https://leetcode.com/problems/find-customer-referee/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0584` (`584`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Customer` table with columns `id` (primary key), `name`, and `referee_id` (the `id` of the customer who referred them, or `null` if unreferred).

Write a SQL query to return the `name` of every customer who was either referred by a customer whose `id` is **not equal to `2`**, or **not referred by anyone** (`referee_id` is `null`). Return the result in any order.

---

## Examples

### Example 1

```text
Input:
Customer table:
+----+------+------------+
| id | name | referee_id |
+----+------+------------+
| 1  | Will | null       |
| 2  | Jane | null       |
| 3  | Alex | 2          |
| 4  | Bill | null       |
| 5  | Zack | 1          |
| 6  | Mark | 2          |
+----+------+------------+
Output:
+------+
| name |
+------+
| Will |
| Jane |
| Bill |
| Zack |
+------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **SQL Three-Valued Logic (`3VL`):** In SQL, `NULL` represents an unknown or missing value. Comparing anything to `NULL` with `=` or `!=` yields `UNKNOWN`, not `TRUE`. A `WHERE` clause only keeps rows where the predicate evaluates to `TRUE`.
- **Explicit `IS NULL` Check:** Because `NULL != 2` evaluates to `UNKNOWN`, writing `WHERE referee_id != 2` alone drops all customers with `referee_id IS NULL`. We must explicitly include `OR referee_id IS NULL`.

---

## Approach

### Brute Force Approach

A roundabout approach uses `SELECT name FROM Customer WHERE id NOT IN (SELECT id FROM Customer WHERE referee_id = 2)`, which performs an unnecessary self-subquery scan over the `Customer` table instead of evaluating each row directly in one pass.

### Optimized Approach

Perform a single table scan on `Customer` filtering with `WHERE referee_id != 2 OR referee_id IS NULL`.

### Step-by-Step Thinking Process

1. Identify the target rows: customers whose `referee_id` is neither `2` nor excluded due to being `NULL`.
2. Write `referee_id != 2` to capture customers referred by valid customer IDs other than `2` (such as `1`, `3`, etc.).
3. Combine with `OR referee_id IS NULL` so unreferred customers evaluate to `UNKNOWN OR TRUE`, which simplifies to `TRUE` in SQL three-valued logic.
4. Select only the `name` column.

### Algorithm / Intuition

The query `select name from customer where referee_id != 2 or referee_id is NULL` evaluates two simple conditions per row:
1. If `referee_id` is a non-null integer other than `2` (e.g., `1`), `referee_id != 2` is `TRUE`, so the row is selected.
2. If `referee_id` is `2`, `2 != 2` is `FALSE` and `2 IS NULL` is `FALSE`, so the row is rejected.
3. If `referee_id` is `NULL`, `NULL != 2` is `UNKNOWN`, `NULL IS NULL` is `TRUE`, and `UNKNOWN OR TRUE` evaluates to `TRUE`, so the row is selected.

---

## Dry Run

Tracing Example 1 on `Customer`:

| `id` | `name` | `referee_id` | `referee_id != 2` | `referee_id IS NULL` | `OR` Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1` | `Will` | `null` | `UNKNOWN` | `TRUE` | **Keep** |
| `2` | `Jane` | `null` | `UNKNOWN` | `TRUE` | **Keep** |
| `3` | `Alex` | `2` | `FALSE` | `FALSE` | Drop |
| `4` | `Bill` | `null` | `UNKNOWN` | `TRUE` | **Keep** |
| `5` | `Zack` | `1` | `TRUE` | `FALSE` | **Keep** |
| `6` | `Mark` | `2` | `FALSE` | `FALSE` | Drop |

Output names: `Will`, `Jane`, `Bill`, `Zack`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Evaluates a constant-time predicate on each of the `N` rows in `Customer` in a single table scan.
- **Space Complexity:** `O(1)` — Streams matching rows directly with no auxiliary grouping or sorting buffers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [584find-customer-referee.sql](./584find-customer-referee.sql) |

---

## Key Learnings

- SQL uses three-valued logic (`TRUE`, `FALSE`, `UNKNOWN`); `NULL != x` is always `UNKNOWN`, never `TRUE`.
- Always pair inequality filters (`!=`, `<>`) on nullable columns with `OR col IS NULL` (or MySQL's null-safe equality `NOT (referee_id <=> 2)`) when `NULL` rows should be retained.
- `OR referee_id IS NULL` is generally preferable to `IFNULL(referee_id, 0) != 2` because wrapping a column in a function prevents standard index usage.
