---
comments: true
difficulty: Medium
tags:
  - Database
---

# 570. Managers with at Least 5 Direct Reports

**[View Problem on LeetCode](https://leetcode.com/problems/managers-with-at-least-5-direct-reports/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0570` (`570`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given the `Employee` table containing `id` (primary key), `name`, `department`, and `managerId`. Each row gives an employee's details alongside the `id` of their direct manager (`NULL` if they have no manager, and no employee manages themselves).

Write a SQL query to return the `name` of every manager who has **at least 5 direct reports** in any order.

---

## Examples

### Example 1

```text
Input:
Employee table:
+-----+-------+------------+-----------+
| id  | name  | department | managerId |
+-----+-------+------------+-----------+
| 101 | John  | A          | null      |
| 102 | Dan   | A          | 101       |
| 103 | James | A          | 101       |
| 104 | Amy   | A          | 101       |
| 105 | Anne  | A          | 101       |
| 106 | Ron   | B          | 101       |
+-----+-------+------------+-----------+
Output:
+------+
| name |
+------+
| John |
+------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Self-Referential Relationship:** Both managers and their direct reports live in the same `Employee` table; an employee row with `managerId = X` counts as one direct report for the manager row with `id = X`.
- **Duplicate Names:** Two distinct managers could share the same `name` (since `id`, not `name`, is the primary key). Grouping by `managerId` (or manager `id`) first rather than `name` avoids accidentally merging two different managers who share a name!
- **`NULL` `managerId`:** Even if 5 or more top-level employees have `managerId IS NULL`, `NULL` does not match any valid `Employee.id` during an inner join.

---

## Approach

### Brute Force Approach

A correlated subquery approach selects `name` from `Employee e1` where `(SELECT COUNT(*) FROM Employee e2 WHERE e2.managerId = e1.id) >= 5`. Without an index on `managerId`, evaluating this correlated count for every employee row leads to `O(N^2)` nested-loop scans.

### Optimized Approach

Group `Employee` by `managerId` in a derived table `t` using `HAVING COUNT(1) >= 5` to find qualifying manager IDs, then `JOIN` back to `Employee` `USING (id)` to fetch their names.

### Step-by-Step Thinking Process

1. Count how many direct reports each `managerId` has by grouping `Employee` on `managerId`.
2. Alias `managerId AS id` inside the subquery and filter groups with `HAVING cnt >= 5` so only qualifying manager IDs remain.
3. Inner-join `Employee` with this derived table `t` `USING (id)`.
4. Any group where `managerId` was `NULL` is automatically excluded by the inner join since `NULL` never equals any `Employee.id`.
5. Project `SELECT name` from the matched manager rows in `Employee`.

### Algorithm / Intuition

The inner subquery `t` (`SELECT managerId AS id, COUNT(1) AS cnt FROM Employee GROUP BY 1 HAVING cnt >= 5`) aggregates all reporting edges in a single pass. Using `GROUP BY 1` groups by the first selected column (`managerId`).

By aliasing `managerId` to `id`, the outer query can cleanly write `Employee JOIN (...) AS t USING (id)`. Because `Employee.id` is the primary key, each qualifying `id` in `t` matches at most one manager row in `Employee` (in case a `managerId` references an external ID not in `Employee`, the inner join safely ignores it; and if two managers share the same `name`, both rows are preserved separately).

---

## Dry Run

Tracing Example 1 on `Employee`:

1. **Subquery `t` (`GROUP BY managerId`):**
   - `managerId = null`: 1 row (`John`) -> `cnt = 1` (filtered out by `HAVING cnt >= 5`).
   - `managerId = 101`: 5 rows (`Dan`, `James`, `Amy`, `Anne`, `Ron`) -> `cnt = 5 >= 5` -> outputs `(id = 101, cnt = 5)`.
2. **`Employee JOIN t USING (id)`:**
   - Matches `t.id = 101` with `Employee` row `(id = 101, name = 'John', department = 'A', managerId = null)`.
3. **Projection:** Returns `name = 'John'`.

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Grouping `Employee` by `managerId` takes `O(N)` time (via hashing or sorting if unindexed), and joining qualifying IDs against the primary key `Employee.id` takes `O(1)` lookup per manager.
- **Space Complexity:** `O(M)` — Hash aggregation stores counts for `M` distinct `managerId` values (`M <= N`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [570managers-with-at-least-5-direct-reports.sql](./570managers-with-at-least-5-direct-reports.sql) |

---

## Key Learnings

- Always group by unique entity keys (`id` / `managerId`) rather than non-unique display attributes (`name`) to prevent merging distinct people with identical names.
- Aggregating before joining (`GROUP BY` in a derived table, then `JOIN`) avoids multiplying rows before aggregation and reduces join probe volume.
- `USING (id)` provides concise equi-join syntax when both sides expose the join key under the same column name.
