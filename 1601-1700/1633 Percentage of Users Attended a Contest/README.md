---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1633. Percentage of Users Attended a Contest

**[View Problem on LeetCode](https://leetcode.com/problems/percentage-of-users-attended-a-contest/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1633` (`1633`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

We have two database tables: `Users` (containing `user_id` and `user_name`) and `Register` (recording contest registrations with `contest_id` and `user_id`).

We need to compute the percentage of all users who registered for each contest, rounded to 2 decimal places.

The final result must be ordered by `percentage` in descending order. If there is a tie in percentage, break the tie by ordering by `contest_id` in ascending order.

---

## Examples

### Example 1

```text
Input:
Users table:
+---------+-----------+
| user_id | user_name |
+---------+-----------+
| 6       | Alice     |
| 2       | Bob       |
| 7       | Alex      |
+---------+-----------+
Register table:
+------------+---------+
| contest_id | user_id |
+------------+---------+
| 215        | 6       |
| 209        | 2       |
| 208        | 2       |
| 210        | 6       |
| 208        | 6       |
| 209        | 7       |
| 209        | 6       |
| 215        | 7       |
| 208        | 7       |
| 210        | 2       |
| 207        | 2       |
| 210        | 7       |
+------------+---------+
Output:
+------------+------------+
| contest_id | percentage |
+------------+------------+
| 208        | 100.0      |
| 209        | 100.0      |
| 210        | 100.0      |
| 215        | 66.67      |
| 207        | 33.33      |
+------------+------------+
Explanation:
All the users registered in contests 208, 209, and 210. The percentage is 100% and we sort them in the answer table by contest_id in ascending order.
Alice and Alex registered in contest 215 and the percentage is ((2/3) * 100) = 66.67%
Bob registered in contest 207 and the percentage is ((1/3) * 100) = 33.33%
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

The total number of users is the count of distinct users in the `Users` table: `(SELECT COUNT(1) FROM Users)`.
For each `contest_id` in `Register`, the number of registered users is `COUNT(1)` (since `(contest_id, user_id)` is a composite primary key).
The percentage formula is:
$$\text{percentage} = \frac{\text{registered\_users}}{\text{total\_users}} \times 100$$
The calculated percentage must be rounded to two decimal places using `ROUND(..., 2)`.
Sorting requires secondary order: `percentage DESC, contest_id ASC`.

---

## Approach

### Brute Force Approach

A non-SQL approach would read all users into a hash set to get total user count $U$, then read all registration rows, group them by `contest_id` into lists, compute `(len(list) / U) * 100`, round to 2 decimals, and sort. In SQL, performing joins or correlated scalar subqueries per row instead of an aggregated scalar subquery is less clean and slower.

### Optimized Approach

Group the `Register` table by `contest_id` (`GROUP BY 1`). For each group, calculate the registered count and divide it by the scalar subquery `(SELECT COUNT(1) FROM Users)`, multiplying by 100 and rounding to 2 decimals. Sort the final result by the percentage column descending and contest ID ascending (`ORDER BY 2 DESC, 1`).

### Step-by-Step Thinking Process

1. Determine the denominator: the total count of registered users in the platform, obtained via `(SELECT COUNT(1) FROM Users)`.
2. Determine the numerator: for each contest, count the registrations using `COUNT(1)` from `Register`.
3. Compute the percentage: `COUNT(1) * 100 / (SELECT COUNT(1) FROM Users)`.
4. Round the quotient to 2 decimal places using `ROUND(..., 2)` and alias as `percentage`.
5. Group records by `contest_id` (positional reference `1`).
6. Sort using the required tie-breaker criteria: `ORDER BY 2 DESC, 1` (percentage descending, contest_id ascending).

### Algorithm / Intuition

The query calculates the constant denominator once via the scalar subquery `(SELECT COUNT(1) FROM Users)`. The `Register` table is then aggregated with `GROUP BY contest_id`. Because `(contest_id, user_id)` is guaranteed unique by the primary key constraint, `COUNT(1)` accurately reflects the number of participants in that contest without requiring `DISTINCT`. The engine multiplies the count by 100, divides by the total user count, applies `ROUND(..., 2)`, and finally sorts using the two specified keys.

---

## Dry Run

Let's trace Example 1:
- Total users in `Users`: Alice (6), Bob (2), Alex (7) -> total = 3 users.
- Aggregate `Register` table by `contest_id`:
  - `contest_id = 208`: users {2, 6, 7} -> count = 3. Percentage = `(3 / 3) * 100 = 100.00`.
  - `contest_id = 209`: users {2, 6, 7} -> count = 3. Percentage = `(3 / 3) * 100 = 100.00`.
  - `contest_id = 210`: users {2, 6, 7} -> count = 3. Percentage = `(3 / 3) * 100 = 100.00`.
  - `contest_id = 215`: users {6, 7} -> count = 2. Percentage = `(2 / 3) * 100 = 66.67`.
  - `contest_id = 207`: users {2} -> count = 1. Percentage = `(1 / 3) * 100 = 33.33`.
- Sorting by `percentage DESC, contest_id ASC`:
  - Contests 208, 209, 210 all have 100.00%, ordered ascending: 208, 209, 210.
  - Followed by 215 (66.67%), then 207 (33.33%).
Output matches expected table.

---

## Complexity Analysis

- **Time Complexity:** `O(R + U + C log C)` where `R` is the number of rows in `Register`, `U` is the number of rows in `Users`, and `C` is the number of distinct contests sorted.
- **Space Complexity:** `O(C)` — Required for storing the aggregated contest groups before ordering.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1633percentage-of-users-attended-a-contest.sql](./1633percentage-of-users-attended-a-contest.sql) |

---

## Key Learnings

- Use scalar subqueries like `(SELECT COUNT(1) FROM Users)` to inject global table aggregates into grouped calculations.
- Positional column indexing in `GROUP BY 1` and `ORDER BY 2 DESC, 1` provides concise syntax, though naming columns explicitly is also good practice.
- Floating-point rounding with `ROUND(value, 2)` satisfies two-decimal formatting requirements in MySQL.
