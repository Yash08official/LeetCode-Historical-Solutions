---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1378. Replace Employee ID With The Unique Identifier

**[View Problem on LeetCode](https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1378` (`1378`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two tables:
- `Employees(id, name)` where `id` is the primary key.
- `EmployeeUNI(id, unique_id)` where `(id, unique_id)` is the primary key, mapping an employee's `id` to their corresponding `unique_id`.

Write a SQL query to display `unique_id` and `name` for **every** employee in `Employees`. If an employee does not have an entry in `EmployeeUNI`, display `null` for their `unique_id`. Return the result in any order.

---

## Examples

### Example 1

```text
Input:
Employees table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 7  | Bob      |
| 11 | Meir     |
| 90 | Winston  |
| 3  | Jonathan |
+----+----------+
EmployeeUNI table:
+----+-----------+
| id | unique_id |
+----+-----------+
| 3  | 1         |
| 11 | 2         |
| 90 | 3         |
+----+-----------+
Output:
+-----------+----------+
| unique_id | name     |
+-----------+----------+
| null      | Alice    |
| null      | Bob      |
| 2         | Meir     |
| 3         | Winston  |
| 1         | Jonathan |
+-----------+----------+
Explanation:
Alice and Bob do not have a unique ID, We will show null instead.
The unique ID of Meir is 2.
The unique ID of Winston is 3.
The unique ID of Jonathan is 1.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Every row from `Employees` must appear in the output, whether or not a matching `id` exists in `EmployeeUNI`.
- An `INNER JOIN` would drop employees missing from `EmployeeUNI` (such as `Alice` and `Bob` in Example 1).
- A `LEFT JOIN` with `Employees` on the left preserves all employees and automatically fills unmatched `EmployeeUNI.unique_id` columns with `NULL`.

---

## Approach

### Brute Force Approach

Writing a correlated scalar subquery `SELECT (SELECT unique_id FROM EmployeeUNI u WHERE u.id = e.id) AS unique_id, e.name FROM Employees e` produces the right output when `id` has at most one `unique_id`, but conceptually obscures a textbook relational outer join and fails if an employee ever mapped to multiple `unique_id`s.

### Optimized Approach

Perform a `LEFT JOIN` from `Employees` to `EmployeeUNI` using their shared `id` column (`USING (id)`) and project `unique_id, name`.

### Step-by-Step Thinking Process

1. Place `Employees` as the driving (left) table in `FROM Employees` so no employee is filtered out.
2. Attach `EmployeeUNI` with `LEFT JOIN EmployeeUNI USING (id)` (shorthand for `ON Employees.id = EmployeeUNI.id` since both tables name the join key `id`).
3. Select `unique_id, name` in the exact column order requested by the output schema.

### Algorithm / Intuition

In SQL, `Employees LEFT JOIN EmployeeUNI USING (id)` scans every row of `Employees` and probes `EmployeeUNI` for matching `id` values. When a match is found, `unique_id` is populated from `EmployeeUNI`; when no match exists, SQL synthesizes a single joined row with `EmployeeUNI` columns set to `NULL`. No `ORDER BY` is needed since any row order is accepted.

---

## Dry Run

Tracing **Example 1**:

| `Employees` row `(id, name)` | Match in `EmployeeUNI`? | Output `(unique_id, name)` |
| :--- | :--- | :--- |
| `(1, 'Alice')` | None | `(null, 'Alice')` |
| `(7, 'Bob')` | None | `(null, 'Bob')` |
| `(11, 'Meir')` | `(11, 2)` | `(2, 'Meir')` |
| `(90, 'Winston')` | `(90, 3)` | `(3, 'Winston')` |
| `(3, 'Jonathan')` | `(3, 1)` | `(1, 'Jonathan')` |

---

## Complexity Analysis

- **Time Complexity:** `O(N + M)` — Let `N` be rows in `Employees` and `M` be rows in `EmployeeUNI`. With a hash join or index lookup on `id`, joining takes linear time in the table sizes.
- **Space Complexity:** `O(M)` — A hash outer join builds an in-memory hash table over the `M` rows of `EmployeeUNI` (`O(1)` auxiliary space if using an existing B-Tree index on `EmployeeUNI.id`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1378replace-employee-id-with-the-unique-identifier.sql](./1378replace-employee-id-with-the-unique-identifier.sql) |

---

## Key Learnings

- `LEFT JOIN` is the foundational SQL operator whenever you want to enrich a master entity table (`Employees`) with optional attribute rows (`EmployeeUNI`) while preserving unmatched entities as `NULL`.
- `USING (id)` is clean ANSI SQL shorthand for `ON a.id = b.id` when both tables share the exact same join column name.
- Pay attention to the requested `SELECT` column order: here `unique_id` comes **first** and `name` comes **second**.
