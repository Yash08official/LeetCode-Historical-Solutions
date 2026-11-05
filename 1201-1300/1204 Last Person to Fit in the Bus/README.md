---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1204. Last Person to Fit in the Bus

**[View Problem on LeetCode](https://leetcode.com/problems/last-person-to-fit-in-the-bus/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1204` (`1204`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Queue` table with columns `person_id` (unique), `person_name`, `weight`, and `turn` (`1` through `n`, indicating the exact boarding order from `1`st to `n`th).

People board the bus strictly one by one in increasing order of `turn`, and the bus has a maximum total weight capacity of `1000` kilograms. Assuming the first person always fits (`weight <= 1000`), return the `person_name` of the **last person** who can board without pushing the cumulative weight over `1000`.

---

## Examples

### Example 1

```text
Input:
Queue table:
+-----------+-------------+--------+------+
| person_id | person_name | weight | turn |
+-----------+-------------+--------+------+
| 5         | Alice       | 250    | 1    |
| 4         | Bob         | 175    | 5    |
| 3         | Alex        | 350    | 2    |
| 6         | John Cena   | 400    | 3    |
| 1         | Winston     | 500    | 6    |
| 2         | Marie       | 200    | 4    |
+-----------+-------------+--------+------+
Output:
+-------------+
| person_name |
+-------------+
| John Cena   |
+-------------+
Explanation: The folowing table is ordered by the turn for simplicity.
+------+----+-----------+--------+--------------+
| Turn | ID | Name      | Weight | Total Weight |
+------+----+-----------+--------+--------------+
| 1    | 5  | Alice     | 250    | 250          |
| 2    | 3  | Alex      | 350    | 600          |
| 3    | 6  | John Cena | 400    | 1000         | (last person to board)
| 4    | 2  | Marie     | 200    | 1200         | (cannot board)
| 5    | 4  | Bob       | 175    | ___          |
| 6    | 1  | Winston   | 500    | ___          |
+------+----+-----------+--------+--------------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Prefix Sum Over Boarding Order:** Because passengers cannot skip ahead when someone exceeds capacity (the problem asks for the last consecutive boarder before the cumulative sum exceeds `1000`, as shown in Example 1 where Marie at turn `4` pushes total weight to `1200` and nobody after turn `3` boards), person `a` can board if and only if the sum of `weight` for all people `b` with `b.turn <= a.turn` is `<= 1000`.
- **Target Row:** Among all people whose prefix weight sum is `<= 1000`, we want the single person with the **largest `turn`**.

---

## Approach

### Brute Force Approach

Fetching all rows sorted by `turn` into application memory or running nested correlated subqueries without grouping computes the running sum for each turn `t` by summing `1..t` from scratch in `O(n^2)` work.

### Optimized Approach

Perform a non-equi self-join (`Queue AS a, Queue AS b WHERE a.turn >= b.turn`), group by `a.person_id` to compute each person's cumulative boarding weight `SUM(b.weight)`, filter with `HAVING SUM(b.weight) <= 1000`, and pick the latest turn via `ORDER BY a.turn DESC LIMIT 1`.

### Step-by-Step Thinking Process

1. Join `Queue AS a` (candidate passenger) with `Queue AS b` (everyone boarding on or before `a`) using `WHERE a.turn >= b.turn`.
2. Group by `a.person_id` so `SUM(b.weight)` equals the exact cumulative weight on the bus if passenger `a` boards.
3. Filter groups using `HAVING SUM(b.weight) <= 1000` to keep only passengers who fit within the `1000` kg limit.
4. Sort qualifying passengers in reverse boarding order (`ORDER BY a.turn DESC`) and take `LIMIT 1` to return the last person who fits.

### Algorithm / Intuition

In this classic SQL self-join pattern (which works even in pre-8.0 MySQL engines without window functions), `WHERE a.turn >= b.turn` pairs the `k`-th passenger `a` with all `k` passengers `b` from turn `1` through `k`.

Because `person_id` is unique for every row in `Queue`, both `a.person_name` and `a.turn` are functionally dependent on `a.person_id`, making `GROUP BY a.person_id` valid under SQL functional-dependency rules. `HAVING SUM(b.weight) <= 1000` discards every turn after the capacity is breached, and `ORDER BY a.turn DESC LIMIT 1` selects the highest valid turn.

---

## Dry Run

Using **Example 1**:

Self-join `a.turn >= b.turn` grouped by `a.person_id` (shown ordered by `a.turn`):

| `a.turn` | `a.person_id` | `a.person_name` | Matched `b.turn`s | `SUM(b.weight)` | `HAVING <= 1000`? |
| :---: | :---: | :--- | :--- | :---: | :---: |
| `1` | `5` | Alice | `{1}` | `250` | Yes |
| `2` | `3` | Alex | `{1, 2}` | `250 + 350 = 600` | Yes |
| `3` | `6` | John Cena | `{1, 2, 3}` | `600 + 400 = 1000` | **Yes** |
| `4` | `2` | Marie | `{1, 2, 3, 4}` | `1000 + 200 = 1200` | No |
| `5` | `4` | Bob | `{1..5}` | `1375` | No |
| `6` | `1` | Winston | `{1..6}` | `1875` | No |

Sorting surviving rows (`turn` `1, 2, 3`) by `a.turn DESC` and taking `LIMIT 1` returns **`John Cena`**.

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — The theta self-join `a.turn >= b.turn` pairs `n(n + 1) / 2` row combinations across `n` passengers before grouping, followed by `O(n log n)` sorting (or `O(n)` top-1 selection) on the qualifying groups.
- **Space Complexity:** `O(n)` — Grouping by `a.person_id` maintains one accumulator entry per passenger (`n` groups).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1204last-person-to-fit-in-the-bus.sql](./1204last-person-to-fit-in-the-bus.sql) |

---

## Key Learnings

- A non-equi self-join (`a.turn >= b.turn`) combined with `GROUP BY` and `SUM` is the traditional relational way to express running totals without window functions.
- Because `person_id` is a candidate key of `Queue`, MySQL recognizes `a.person_name` and `a.turn` as functionally dependent on `GROUP BY a.person_id`.
- In MySQL 8.0+, replacing the self-join with a window function `SUM(weight) OVER (ORDER BY turn)` reduces the time complexity from `O(n^2)` to `O(n log n)`.
