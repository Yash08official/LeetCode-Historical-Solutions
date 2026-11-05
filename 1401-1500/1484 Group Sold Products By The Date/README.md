---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1484. Group Sold Products By The Date

**[View Problem on LeetCode](https://leetcode.com/problems/group-sold-products-by-the-date/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1484` (`1484`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given an `Activities` table with columns `sell_date` (`date`) and `product` (`varchar`). The table has no primary key and may contain **duplicate rows** when the same product is sold multiple times on the same date.

Write a SQL query to report, for each `sell_date`:
1. `num_sold`: the number of **distinct** products sold on that date.
2. `products`: a comma-separated string of those distinct product names sorted **lexicographically**.

Return the result rows ordered ascending by `sell_date`.

---

## Examples

### Example 1

```text
Input:
Activities table:
+------------+------------+
| sell_date  | product     |
+------------+------------+
| 2020-05-30 | Headphone  |
| 2020-06-01 | Pencil     |
| 2020-06-02 | Mask       |
| 2020-05-30 | Basketball |
| 2020-06-01 | Bible      |
| 2020-06-02 | Mask       |
| 2020-05-30 | T-Shirt    |
+------------+------------+
Output:
+------------+----------+------------------------------+
| sell_date  | num_sold | products                     |
+------------+----------+------------------------------+
| 2020-05-30 | 3        | Basketball,Headphone,T-shirt |
| 2020-06-01 | 2        | Bible,Pencil                 |
| 2020-06-02 | 1        | Mask                         |
+------------+----------+------------------------------+
Explanation:
For 2020-05-30, Sold items were (Headphone, Basketball, T-shirt), we sort them lexicographically and separate them by a comma.
For 2020-06-01, Sold items were (Pencil, Bible), we sort them lexicographically and separate them by a comma.
For 2020-06-02, the Sold item is (Mask), we just return it.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

There are three key SQL requirements to watch closely:
- **Deduplication**: Because `Activities` has no primary key, `'Mask'` sold twice on `'2020-06-02'` must count as `1` in `num_sold` and appear only once in `products`.
- **String aggregation**: Standard SQL aggregates (`COUNT`, `SUM`) produce numbers, whereas collapsing multiple `product` rows per `sell_date` into one comma-delimited string requires MySQL's `GROUP_CONCAT(...)`.
- **Sorting**: Both the comma-joined product list per date and the outer `sell_date` rows must be ordered ascending.

---

## Approach

### Brute Force Approach

Using a subquery (`SELECT DISTINCT sell_date, product FROM Activities`) before outer grouping or trying to self-join rows adds unnecessary query layers when `COUNT(DISTINCT ...)` and `GROUP_CONCAT(DISTINCT ...)` handle deduplication directly inside a single `GROUP BY` pass.

### Optimized Approach

The query groups `Activities` by `sell_date` in a single statement:
- `COUNT(DISTINCT product) AS num_sold` counts unique products per date.
- `GROUP_CONCAT(DISTINCT product) AS products` deduplicates, orders, and joins unique product names with MySQL's default `','` separator.
- `ORDER BY sell_date` sorts the final output rows chronologically.

### Step-by-Step Thinking Process

1. Group all rows by `sell_date` using `GROUP BY sell_date` so each output row corresponds to one unique date.
2. Compute `num_sold` with `COUNT(DISTINCT product)` to ignore duplicate sales of the same item on the same day.
3. Aggregate unique item names into a comma-separated string using MySQL's `GROUP_CONCAT(DISTINCT product)` (whose default separator is already `','`).
4. Add `ORDER BY sell_date` at the end to return dates in chronological order.

### Algorithm / Intuition

In MySQL, `GROUP_CONCAT(DISTINCT product)` performs three tasks inside each `sell_date` group: `DISTINCT` eliminates duplicate product names (and in MySQL's execution engine sorts distinct values during deduplication), and `GROUP_CONCAT` joins them with a comma `','` (its default `SEPARATOR`). Pairing this with `COUNT(DISTINCT product)` computes both metrics in a single `GROUP BY sell_date` aggregation.

---

## Dry Run

Trace on **Example 1** (`Activities` table):

1. **`GROUP BY sell_date` partitions rows into 3 date groups**:
   - `2020-05-30`: `['Headphone', 'Basketball', 'T-Shirt']`
     - `COUNT(DISTINCT product)` -> `3`
     - `GROUP_CONCAT(DISTINCT product)` -> `'Basketball,Headphone,T-Shirt'`
   - `2020-06-01`: `['Pencil', 'Bible']`
     - `COUNT(DISTINCT product)` -> `2`
     - `GROUP_CONCAT(DISTINCT product)` -> `'Bible,Pencil'`
   - `2020-06-02`: `['Mask', 'Mask']`
     - `COUNT(DISTINCT product)` -> `1` (duplicate `'Mask'` removed)
     - `GROUP_CONCAT(DISTINCT product)` -> `'Mask'`
2. **`ORDER BY sell_date`** outputs `2020-05-30`, `2020-06-01`, `2020-06-02`.

---

## Complexity Analysis

- **Time Complexity:** `O(N log N)` — Grouping `N` rows, sorting/deduplicating distinct products within each date, and ordering the groups by `sell_date` takes `O(N log N)` time.
- **Space Complexity:** `O(N)` — Temporary grouping buffers and concatenated product strings store up to all `N` distinct `(sell_date, product)` entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1484group-sold-products-by-the-date.sql](./1484group-sold-products-by-the-date.sql) |

---

## Key Learnings

- MySQL's `GROUP_CONCAT` uses `','` as its default separator, making `SEPARATOR ','` optional when comma separation is desired.
- For strict portability across MySQL versions and SQL engines, writing `GROUP_CONCAT(DISTINCT product ORDER BY product ASC SEPARATOR ',')` explicitly guarantees lexicographical order rather than relying on implicit `DISTINCT` sorting.
- Whenever a table lacks a primary key, always ask whether `COUNT` and `GROUP_CONCAT` need `DISTINCT`.
