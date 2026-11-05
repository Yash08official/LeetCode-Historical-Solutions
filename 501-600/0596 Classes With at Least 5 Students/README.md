---
comments: true
difficulty: Easy
tags:
  - Database
---

# 596. Classes With at Least 5 Students

**[View Problem on LeetCode](https://leetcode.com/problems/classes-with-at-least-5-students/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0596` (`596`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Courses` table with columns `student` and `class`, where `(student, class)` is the composite primary key. Each row records a student's enrollment in a class.

Write a SQL query to return all `class` names that have **at least 5 enrolled students**, in any order.

---

## Examples

### Example 1

```text
Input:
Courses table:
+---------+----------+
| student | class    |
+---------+----------+
| A       | Math     |
| B       | English  |
| C       | Math     |
| D       | Biology  |
| E       | Math     |
| F       | Computer |
| G       | Math     |
| H       | Math     |
| I       | Math     |
+---------+----------+
Output:
+---------+
| class   |
+---------+
| Math    |
+---------+
Explanation:
- Math has 6 students, so we include it.
- English has 1 student, so we do not include it.
- Biology has 1 student, so we do not include it.
- Computer has 1 student, so we do not include it.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **No Duplicate Enrollments:** Because `(student, class)` is the primary key, the same student cannot appear twice in the same class. Therefore, `COUNT(1)` (or `COUNT(*)`) per class equals `COUNT(DISTINCT student)`.
- **`WHERE` vs. `HAVING`:** `WHERE` filters individual rows *before* grouping, whereas `HAVING` filters aggregated groups *after* `GROUP BY`.

---

## Approach

### Brute Force Approach

A naive query might select `DISTINCT class` from `Courses c1` using a correlated subquery `WHERE (SELECT COUNT(*) FROM Courses c2 WHERE c2.class = c1.class) >= 5`, repeatedly counting enrollments for every row in the table (`O(N^2)` without an index on `class`).

### Optimized Approach

Group `Courses` by `class` (`GROUP BY 1`) and filter the aggregated groups using `HAVING COUNT(1) >= 5`.

### Step-by-Step Thinking Process

1. Group all enrollment records by `class` so rows for the same course are bucketed together.
2. Use `GROUP BY 1` as a concise positional shorthand for grouping by the first column in `SELECT` (`class`).
3. Count the rows in each class bucket with `COUNT(1)` — safe because `(student, class)` is unique.
4. Filter buckets with `HAVING COUNT(1) >= 5` to emit only classes meeting the minimum threshold.

### Algorithm / Intuition

The query `SELECT class FROM Courses GROUP BY 1 HAVING COUNT(1) >= 5;` aggregates all rows of `Courses` by `class`. As each row is processed, its class counter increments by `1`. Once grouping completes, `HAVING COUNT(1) >= 5` discards any class bucket with fewer than `5` enrollments and outputs the remaining `class` names.

---

## Dry Run

Tracing Example 1 on `Courses`:

- **Grouping by `class`:**
  - `'Math'`: students `A, C, E, G, H, I` -> `COUNT(1) = 6` (`6 >= 5` -> **Keep**).
  - `'English'`: student `B` -> `COUNT(1) = 1` (`1 < 5` -> Drop).
  - `'Biology'`: student `D` -> `COUNT(1) = 1` (`1 < 5` -> Drop).
  - `'Computer'`: student `F` -> `COUNT(1) = 1` (`1 < 5` -> Drop).
- **Output:** `'Math'`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Scanning `N` enrollment rows and aggregating counts via hash aggregation runs in linear time.
- **Space Complexity:** `O(C)` — Stores one group entry and counter for each of the `C` distinct classes (`C <= N`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [596classes-with-at-least-5-students.sql](./596classes-with-at-least-5-students.sql) |

---

## Key Learnings

- Always check the table's primary key before choosing between `COUNT(1)` and `COUNT(DISTINCT col)`: here `(student, class)` guarantees uniqueness, making `COUNT(1)` faster and sufficient.
- Aggregate predicates belong in `HAVING`, never in `WHERE`.
- `GROUP BY 1` references the first expression in the `SELECT` list, keeping simple single-column aggregations concise.
