---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1667. Fix Names in a Table

**[View Problem on LeetCode](https://leetcode.com/problems/fix-names-in-a-table/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1667` (`1667`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Users` table with columns `user_id` (primary key `int`) and `name` (`varchar` consisting solely of uppercase and lowercase English letters). Write a SQL query to format every `name` in title/sentence case — where **only the first character is uppercase** and **all remaining characters are lowercase** — and return the result ordered by `user_id` ascending.

---

## Examples

### Example 1

```text
Input:
Users table:
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | aLice |
| 2       | bOB   |
+---------+-------+
Output:
+---------+-------+
| user_id | name  |
+---------+-------+
| 1       | Alice |
| 2       | Bob   |
+---------+-------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- SQL string indexing in `LEFT`, `SUBSTRING`, and `SUBSTR` is **1-based** (unlike 0-based indexing in Java/JS/Python).
- If `name` has length `1` (e.g., `'a'`), `LEFT(name, 1)` returns `'a'` and `SUBSTRING(name, 2)` returns the empty string `''`, which `CONCAT` handles cleanly without error.
- The output must be explicitly sorted by `user_id` (`ORDER BY user_id`).

---

## Approach

### Brute Force Approach

Fetching all user records into an application layer to transform strings and re-sorting in code incurs unnecessary data transfer when SQL provides native scalar string functions (`UPPER`, `LOWER`, `LEFT`, `SUBSTRING`, `CONCAT`).

### Optimized Approach

Extract and capitalize the first character with `UPPER(LEFT(name, 1))`, extract and lowercase the suffix starting at character 2 with `LOWER(SUBSTRING(name, 2))`, join them with `CONCAT(...) AS name`, and sort with `ORDER BY user_id`.

### Step-by-Step Thinking Process

1. Isolate the first character of `name` using `LEFT(name, 1)` and convert it to uppercase via `UPPER(...)`.
2. Isolate the rest of `name` from position `2` to the end using 2-argument `SUBSTRING(name, 2)` and convert it to lowercase via `LOWER(...)`.
3. Join both parts back together using `CONCAT(...)` aliased as `name`.
4. Order the output rows by `user_id` ascending.

### Algorithm / Intuition

MySQL lacks a built-in `INITCAP()` function (present in PostgreSQL/Oracle), so `CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2)))` constructs it directly:
- `LEFT(name, 1)` grabs the first character.
- `SUBSTRING(name, 2)` (omitting the 3rd `length` argument) returns everything from index `2` through the end of the string.
- `CONCAT` merges the uppercased initial and lowercased tail into the formatted `name`.

---

## Dry Run

Tracing Example 1 (`Users`):

| `user_id` | Original `name` | `UPPER(LEFT(name, 1))` | `LOWER(SUBSTRING(name, 2))` | `CONCAT(...) AS name` |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `'aLice'` | `UPPER('a') = 'A'` | `LOWER('Lice') = 'lice'` | `'Alice'` |
| `2` | `'bOB'` | `UPPER('b') = 'B'` | `LOWER('OB') = 'ob'` | `'Bob'` |

Ordered by `user_id`: `(1, 'Alice')`, `(2, 'Bob')`.

---

## Complexity Analysis

- **Time Complexity:** `O(N log N + C)` — Formatting strings takes `O(C)` total character work across `N` rows, and `ORDER BY user_id` takes `O(N)` if scanning the clustered primary key index or `O(N log N)` for an explicit sort.
- **Space Complexity:** `O(N)` — Output buffer / sort space proportional to the number of rows.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1667fix-names-in-a-table.sql](./1667fix-names-in-a-table.sql) |

---

## Key Learnings

- Remember that SQL `SUBSTRING(str, pos)` is **1-indexed**: `pos = 1` is the first character and `pos = 2` starts at the second character.
- Omitting the length parameter in `SUBSTRING(name, 2)` automatically slices to the end of the string without needing `CHAR_LENGTH(name)`.
- Unlike PostgreSQL/Oracle which provide `INITCAP()`, MySQL requires combining `CONCAT`, `UPPER`, `LOWER`, and `LEFT`/`SUBSTRING`.
