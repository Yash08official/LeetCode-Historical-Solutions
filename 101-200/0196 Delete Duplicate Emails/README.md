---
comments: true
difficulty: Easy
tags:
  - Database
---

# 196. Delete Duplicate Emails

**[View Problem on LeetCode](https://leetcode.com/problems/delete-duplicate-emails/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0196` (`196`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Person` table with columns `id` (`int` primary key) and `email` (`varchar`, lowercase). Write a SQL **`DELETE` statement** (not a `SELECT` query) that modifies `Person` in place by removing all duplicate email rows, **keeping only the single row with the smallest `id`** for each unique email.

---

## Examples

### Example 1

```text
Input:
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+
Output:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
Explanation: john@example.com is repeated two times. We keep the row with the smallest Id = 1.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **In-Place Mutation (`DELETE`):** The test harness executes your SQL script and then inspects the remaining rows of `Person` directly.
- **Survivor Criterion:** Among all rows sharing the same `email`, the minimum `id` survives; every row `p2` for which there exists *any* row `p1` with `p1.email = p2.email` and `p1.id < p2.id` must be deleted.
- **MySQL Self-Reference Restriction (Error 1093):** In MySQL, writing `DELETE FROM Person WHERE id NOT IN (SELECT MIN(id) FROM Person GROUP BY email)` fails with *"You can't specify target table 'Person' for update in FROM clause"* unless wrapped in an extra derived subquery—whereas a multi-table self-join `DELETE` works natively!

---

## Approach

### Brute Force Approach

Selecting distinct minimum IDs into an external application or using an unwrapped `WHERE id NOT IN (SELECT MIN(id) FROM Person ...)` either violates the single-statement SQL rule or triggers MySQL Error 1093.

### Optimized Approach

Use **MySQL Multi-Table Self-Join `DELETE`**: join `person AS p1` with `person AS p2` on `p1.email = p2.email`, filter `WHERE p1.id < p2.id`, and specify `DELETE p2` so only the higher-`id` duplicate rows are deleted.

### Step-by-Step Thinking Process

1. Alias two references to `Person`: `p1` (the witness row with a smaller `id`) and `p2` (the candidate duplicate row to delete).
2. Join them on matching email addresses: `ON p1.email = p2.email`.
3. Add condition `WHERE p1.id < p2.id`. Notice the smallest `id` for any email never has another row with a strictly smaller `id`, so it can never appear as `p2` in the filtered join result!
4. Every other duplicate (`2`nd, `3`rd, `4`th copy...) has at least the minimum-`id` row as a valid `p1` witness (`p1.id < p2.id`), so all of them appear as `p2` and get removed by `DELETE p2`.

### Algorithm / Intuition

In MySQL's `DELETE p2 FROM person AS p1 JOIN person AS p2 ...` syntax, the identifier `p2` right after `DELETE` tells the engine *which* joined alias's underlying rows to remove from `person`. Even if an email appears `4` times (say IDs `1, 3, 5, 8`), row `8` matches multiple `(p1, p2)` pairs (`(1, 8)`, `(3, 8)`, `(5, 8)`), and MySQL safely deletes row `8` once while row `1` never appears as `p2` (`no id < 1`) and survives untouched.

---

## Dry Run

Trace on **Example 1** (`Person = [(1, 'john@example.com'), (2, 'bob@example.com'), (3, 'john@example.com')]`):

1. **Join `ON p1.email = p2.email` produces pairs `(p1.id, p2.id)`:**
   - For `'john@example.com'`: `(1, 1)`, `(1, 3)`, `(3, 1)`, `(3, 3)`.
   - For `'bob@example.com'`: `(2, 2)`.
2. **Filter `WHERE p1.id < p2.id`:**
   - Only `(p1.id = 1, p2.id = 3)` satisfies `1 < 3`.
3. **`DELETE p2`:**
   - Deletes the row corresponding to `p2.id = 3` (`(3, 'john@example.com')`).
4. **Remaining `Person` table:** `[(1, 'john@example.com'), (2, 'bob@example.com')]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` worst case without an index on `email` (or `O(n log n)` / `O(n)` with an `email` index or hash join) — Joining `n` rows on `email` and deleting matched higher-ID duplicates.
- **Space Complexity:** `O(1)` to `O(n)` — Depends on whether MySQL uses an index nested-loop join (`O(1)`) or allocates an in-memory join buffer (`O(n)`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [196delete-duplicate-emails.sql](./196delete-duplicate-emails.sql) |

---

## Key Learnings

- MySQL's `DELETE alias FROM t AS a JOIN t AS b ...` syntax cleanly deletes rows from one side of a self-join without triggering Error 1093 (modifying a table while selecting from it in a subquery).
- The inequality `p1.id < p2.id` acts as a mathematical "non-minimum" detector: an element `x` is NOT the minimum of a set `S` if and only if there exists some `y in S` with `y < x`.
- If you do use `GROUP BY` in MySQL `DELETE`, wrap the subquery in a second derived table (`WHERE id NOT IN (SELECT min_id FROM (SELECT MIN(id) AS min_id FROM Person GROUP BY email) AS tmp)`) so MySQL materializes a temporary table first.
