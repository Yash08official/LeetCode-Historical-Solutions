---
comments: true
difficulty: Hard
tags:
  - Database
---

# 262. Trips and Users

**[View Problem on LeetCode](https://leetcode.com/problems/trips-and-users/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0262` (`262`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given two database tables for a ride-hailing platform: `Trips` and `Users`.

- The `Trips` table records individual ride requests with a unique primary key `id`, foreign keys `client_id` and `driver_id` (both referencing `Users.users_id`), `city_id`, `status` (an `ENUM` of `'completed'`, `'cancelled_by_driver'`, or `'cancelled_by_client'`), and `request_at` (the request date string).
- The `Users` table stores platform accounts with a unique primary key `users_id`, a `banned` status (`'Yes'` or `'No'`), and a `role` (`'client'`, `'driver'`, or `'partner'`).

For each date from `'2013-10-01'` through `'2013-10-03'` inclusive that has at least one valid trip, compute the daily **cancellation rate** among trips where **both** the client and the driver are unbanned (`banned = 'No'`). The cancellation rate is the ratio of cancelled unbanned trips (cancelled by either client or driver) to total unbanned trips on that date, rounded to **two decimal places**. Return the result with columns `Day` and `Cancellation Rate` in any order.

---

## Examples

### Example 1

```text
Input:
Trips table:
+----+-----------+-----------+---------+---------------------+------------+
| id | client_id | driver_id | city_id | status              | request_at |
+----+-----------+-----------+---------+---------------------+------------+
| 1  | 1         | 10        | 1       | completed           | 2013-10-01 |
| 2  | 2         | 11        | 1       | cancelled_by_driver | 2013-10-01 |
| 3  | 3         | 12        | 6       | completed           | 2013-10-01 |
| 4  | 4         | 13        | 6       | cancelled_by_client | 2013-10-01 |
| 5  | 1         | 10        | 1       | completed           | 2013-10-02 |
| 6  | 2         | 11        | 6       | completed           | 2013-10-02 |
| 7  | 3         | 12        | 6       | completed           | 2013-10-02 |
| 8  | 2         | 12        | 12      | completed           | 2013-10-03 |
| 9  | 3         | 10        | 12      | completed           | 2013-10-03 |
| 10 | 4         | 13        | 12      | cancelled_by_driver | 2013-10-03 |
+----+-----------+-----------+---------+---------------------+------------+
Users table:
+----------+--------+--------+
| users_id | banned | role   |
+----------+--------+--------+
| 1        | No     | client |
| 2        | Yes    | client |
| 3        | No     | client |
| 4        | No     | client |
| 10       | No     | driver |
| 11       | No     | driver |
| 12       | No     | driver |
| 13       | No     | driver |
+----------+--------+--------+
Output:
+------------+-------------------+
| Day        | Cancellation Rate |
+------------+-------------------+
| 2013-10-01 | 0.33              |
| 2013-10-02 | 0.00              |
| 2013-10-03 | 0.50              |
+------------+-------------------+
Explanation:
On 2013-10-01:
  - There were 4 requests in total, 2 of which were canceled.
  - However, the request with Id=2 was made by a banned client (User_Id=2), so it is ignored in the calculation.
  - Hence there are 3 unbanned requests in total, 1 of which was canceled.
  - The Cancellation Rate is (1 / 3) = 0.33
On 2013-10-02:
  - There were 3 requests in total, 0 of which were canceled.
  - The request with Id=6 was made by a banned client, so it is ignored.
  - Hence there are 2 unbanned requests in total, 0 of which were canceled.
  - The Cancellation Rate is (0 / 2) = 0.00
On 2013-10-03:
  - There were 3 requests in total, 1 of which was canceled.
  - The request with Id=8 was made by a banned client, so it is ignored.
  - Hence there are 2 unbanned request in total, 1 of which were canceled.
  - The Cancellation Rate is (1 / 2) = 0.50
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- A trip must be excluded completely from both the numerator and denominator if **either** `client_id` **or** `driver_id` belongs to a banned user (`banned = 'Yes'`).
- Because `Trips` has two distinct foreign keys pointing to the same `Users` table, checking both participants requires validating two separate relationships per trip.
- Only dates within `['2013-10-01', '2013-10-03']` that have at least one unbanned trip should appear in the output.
- Any status other than `'completed'` (`'cancelled_by_driver'` or `'cancelled_by_client'`) counts as a cancelled request.

---

## Approach

### Brute Force Approach

A verbose baseline query might filter banned users using two separate `NOT IN (SELECT users_id FROM Users WHERE banned = 'Yes')` subqueries in the `WHERE` clause, and then compute the ratio manually using `SUM(CASE WHEN status != 'completed' THEN 1 ELSE 0 END) / COUNT(*)`. While functionally accurate, repeated uncorrelated or poorly indexed subqueries and verbose `CASE` divisions clutter the query and can prevent the SQL optimizer from using direct primary-key joins cleanly.

### Optimized Approach

Perform two inner joins from `Trips` to `Users`—aliased as `u1` for the client and `u2` for the driver—filtering `banned = 'No'` directly in each join condition, restrict `request_at` to the target three-day window, group by `request_at`, and compute `ROUND(AVG(status != 'completed'), 2)`.

### Step-by-Step Thinking Process

1. Join `Trips AS t` with `Users AS u1` on `t.client_id = u1.users_id AND u1.banned = 'No'` so trips requested by banned clients are immediately filtered out.
2. Join `Trips` a second time with `Users AS u2` on `t.driver_id = u2.users_id AND u2.banned = 'No'` so trips assigned to banned drivers are also filtered out.
3. Restrict the remaining valid rows to the required window using `WHERE request_at BETWEEN '2013-10-01' AND '2013-10-03'`.
4. Group the filtered trips by `request_at` (aliased as `Day`). Dates with zero unbanned trips naturally produce no group, satisfying the 'at least one trip' requirement.
5. Leverage MySQL's boolean-to-integer evaluation where `status != 'completed'` yields `1` for cancelled trips and `0` for completed trips; taking `AVG(status != 'completed')` directly computes `cancelled_count / total_count`, which we wrap in `ROUND(..., 2)`.

### Algorithm / Intuition

In MySQL, relational comparison expressions like `status != 'completed'` evaluate to `1` (true) or `0` (false). The arithmetic mean (`AVG`) of a sequence of `1`s and `0`s equals the sum of `1`s divided by the total number of rows in the group—which is the exact definition of the cancellation rate. By using two `INNER JOIN`s (`u1` and `u2`) against the `Users` primary key `users_id` with `banned = 'No'`, every row reaching the `GROUP BY request_at` stage is guaranteed to have both an unbanned client and an unbanned driver.

---

## Dry Run

Using **Example 1** (`Trips` IDs `1..10`, where only `users_id = 2` has `banned = 'Yes'`):

| `request_at` | Raw Trip IDs | Excluded (`u1` or `u2` banned) | Kept Trips & `status != 'completed'` | `ROUND(AVG(...), 2)` |
| :--- | :--- | :--- | :--- | :--- |
| `2013-10-01` | `1, 2, 3, 4` | `id = 2` (`client_id = 2` banned) | `id=1 (0)`, `id=3 (0)`, `id=4 (1)` | `ROUND(1/3, 2) = 0.33` |
| `2013-10-02` | `5, 6, 7` | `id = 6` (`client_id = 2` banned) | `id=5 (0)`, `id=7 (0)` | `ROUND(0/2, 2) = 0.00` |
| `2013-10-03` | `8, 9, 10` | `id = 8` (`client_id = 2` banned) | `id=9 (0)`, `id=10 (1)` | `ROUND(1/2, 2) = 0.50` |

---

## Complexity Analysis

- **Time Complexity:** `O(T + U)` — Assuming indexed primary-key lookups or hash joins on `Users.users_id` (where `T` is the number of rows in `Trips` and `U` is the number of rows in `Users`), scanning `Trips`, probing `u1` and `u2`, and aggregating across at most 3 date buckets takes linear time (`O(T log T)` if sort-based grouping is used).
- **Space Complexity:** `O(U + D)` — Hash join tables hold up to `U` unbanned user records and aggregation maintains `D` date groups (`D <= 3` for the fixed 3-day range).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [262trips-and-users.sql](./262trips-and-users.sql) |

---

## Key Learnings

- When a single table holds multiple foreign keys referencing the same dimension table (`client_id` and `driver_id` -> `Users.users_id`), join the dimension table multiple times under distinct aliases (`u1`, `u2`).
- In MySQL, `AVG(condition)` is a concise, readable idiom for computing proportions without manually writing `SUM(CASE WHEN ...) / COUNT(*)`.
- Using `INNER JOIN` with `banned = 'No'` automatically omits dates whose trips were all made by banned users, matching the requirement to report only days with at least one valid trip.
