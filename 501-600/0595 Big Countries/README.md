---
comments: true
difficulty: Easy
tags:
  - Database
---

# 595. Big Countries

**[View Problem on LeetCode](https://leetcode.com/problems/big-countries/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0595` (`595`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `World` table containing `name` (primary key), `continent`, `area`, `population`, and `gdp`.

A country is classified as **big** if it satisfies at least one of the following criteria:
- Its `area` is at least `3,000,000` (`3000000` square kilometers), **or**
- Its `population` is at least `25,000,000` (`25000000`).

Write a SQL query to return the `name`, `population`, and `area` of all big countries in any order.

---

## Examples

### Example 1

```text
Input:
World table:
+-------------+-----------+---------+------------+--------------+
| name        | continent | area    | population | gdp          |
+-------------+-----------+---------+------------+--------------+
| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |
| Albania     | Europe    | 28748   | 2831741    | 12960000000  |
| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |
| Andorra     | Europe    | 468     | 78115      | 3712000000   |
| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |
+-------------+-----------+---------+------------+--------------+
Output:
+-------------+------------+---------+
| name        | population | area    |
+-------------+------------+---------+
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
+-------------+------------+---------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Inclusive Thresholds:** "At least" translates to `>=` (greater than or equal to), not strictly greater than `>`.
- **Disjunctive Filter:** Satisfying *either* condition qualifies a country, so we combine the two predicates with `OR`.
- **Column Projection:** Only `name`, `population`, and `area` should be returned (`continent` and `gdp` are excluded).

---

## Approach

### Brute Force Approach

There is no slower algorithmic brute force than scanning the rows, though a redundant approach might select `*` into a temporary table or run two separate queries combined with `UNION` when no indexes exist, causing two full table scans instead of one.

### Optimized Approach

Scan the `World` table once, filtering rows with `WHERE population >= 25000000 OR area >= 3000000` and projecting `name, population, area`.

### Step-by-Step Thinking Process

1. Identify the required output columns: `name`, `population`, and `area`.
2. Translate "population of at least twenty-five million" into `population >= 25000000`.
3. Translate "area of at least three million" into `area >= 3000000`.
4. Combine both conditions using `OR` inside the `WHERE` clause.

### Algorithm / Intuition

The query `select name,population,area from world where population >= 25000000 or area >= 3000000;` performs a straightforward sequential filter over `World`. For every country row, MySQL checks `population >= 25000000` first (short-circuiting if `TRUE`) and otherwise checks `area >= 3000000`. Qualifying rows emit only the three requested columns.

---

## Dry Run

Tracing Example 1 on `World`:

| `name` | `area` (`>= 3000000`?) | `population` (`>= 25000000`?) | `OR` Result |
| :--- | :--- | :--- | :--- |
| `Afghanistan` | `652230` (No) | `25500100` (**Yes**) | **Keep** |
| `Albania` | `28748` (No) | `2831741` (No) | Drop |
| `Algeria` | `2381741` (No) | `37100000` (**Yes**) | **Keep** |
| `Andorra` | `468` (No) | `78115` (No) | Drop |
| `Angola` | `1246700` (No) | `20609294` (No) | Drop |

Output rows: `(Afghanistan, 25500100, 652230)` and `(Algeria, 37100000, 2381741)`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — A single full scan of `N` rows in `World` (or `O(K log N)` if separate B-tree indexes exist on `population` and `area` and the optimizer applies Index Merge Union).
- **Space Complexity:** `O(1)` — Matching rows are projected on the fly without intermediate buffering.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [595big-countries.sql](./595big-countries.sql) |

---

## Key Learnings

- Pay close attention to boundary words like "at least" (`>=`) versus "more than" (`>`) in SQL specifications.
- Project only the requested columns (`name, population, area`) instead of `SELECT *` to minimize I/O and match schema expectations.
- In older database engines without Index Merge optimization, rewriting `WHERE condA OR condB` as `SELECT ... WHERE condA UNION SELECT ... WHERE condB` was a classic trick to utilize separate single-column indexes.
