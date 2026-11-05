---
comments: true
difficulty: Medium
tags:
  - Database
---

# 1321. Restaurant Growth

**[View Problem on LeetCode](https://leetcode.com/problems/restaurant-growth/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1321` (`1321`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Customer(customer_id, name, visited_on, amount)` table where `(customer_id, visited_on)` is the primary key, recording how much each customer paid on a given visit date. It is guaranteed that **at least one customer visits every day**.

Compute the **7-day moving total** (`amount`) and **7-day moving average** (`average_amount`, rounded to 2 decimal places) of customer payments for every complete 7-day window (the current date plus the 6 preceding days). Return the result ordered by `visited_on` ascending.

---

## Examples

### Example 1

```text
Input:
Customer table:
+-------------+--------------+--------------+-------------+
| customer_id | name         | visited_on   | amount      |
+-------------+--------------+--------------+-------------+
| 1           | Jhon         | 2019-01-01   | 100         |
| 2           | Daniel       | 2019-01-02   | 110         |
| 3           | Jade         | 2019-01-03   | 120         |
| 4           | Khaled       | 2019-01-04   | 130         |
| 5           | Winston      | 2019-01-05   | 110         |
| 6           | Elvis        | 2019-01-06   | 140         |
| 7           | Anna         | 2019-01-07   | 150         |
| 8           | Maria        | 2019-01-08   | 80          |
| 9           | Jaze         | 2019-01-09   | 110         |
| 1           | Jhon         | 2019-01-10   | 130         |
| 3           | Jade         | 2019-01-10   | 150         |
+-------------+--------------+--------------+-------------+
Output:
+--------------+--------------+----------------+
| visited_on   | amount       | average_amount |
+--------------+--------------+----------------+
| 2019-01-07   | 860          | 122.86         |
| 2019-01-08   | 840          | 120            |
| 2019-01-09   | 840          | 120            |
| 2019-01-10   | 1000         | 142.86         |
+--------------+--------------+----------------+
Explanation:
1st moving average from 2019-01-01 to 2019-01-07 has an average_amount of (100 + 110 + 120 + 130 + 110 + 140 + 150)/7 = 122.86
2nd moving average from 2019-01-02 to 2019-01-08 has an average_amount of (110 + 120 + 130 + 110 + 140 + 150 + 80)/7 = 120
3rd moving average from 2019-01-03 to 2019-01-09 has an average_amount of (120 + 130 + 110 + 140 + 150 + 80 + 110)/7 = 120
4th moving average from 2019-01-04 to 2019-01-10 has an average_amount of (130 + 110 + 140 + 150 + 80 + 110 + 130 + 150)/7 = 142.86
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Multiple customers can visit on the **same** `visited_on` date (for instance, in Example 1, both `customer_id = 1` and `customer_id = 3` visit on `2019-01-10`).
- A 7-day window is only valid starting from the 7th calendar day (`min_date + 6 days`); the first 6 dates do not have 6 prior days of data and must be excluded from the output.
- `average_amount` is the 7-day sum divided by `7` (7 calendar days, **not** the number of customer transaction rows in those 7 days!), rounded to 2 decimal places.

---

## Approach

### Brute Force Approach

Joining `Customer AS a` directly to `Customer AS b` on `DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6` without deduplicating `a.visited_on` first is a classic bug: if `k` customers visited on date `a.visited_on`, every transaction `b` in the 7-day window gets matched `k` times, inflating `SUM(b.amount)` by a factor of `k`!

### Optimized Approach

Extract distinct calendar dates into a derived table `a`, join `a` with `customer AS b` where `DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6`, filter `a.visited_on` to dates at least 6 days after `MIN(visited_on)`, and group by `a.visited_on` to compute `SUM(b.amount)` and `ROUND(SUM(b.amount) / 7, 2)`.

### Step-by-Step Thinking Process

1. Deduplicate dates using `(SELECT DISTINCT visited_on FROM customer) AS a` so each output date appears exactly once on the left side of the join.
2. Join `a` with `customer AS b` on `DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6` to gather every transaction `b` falling in `[a.visited_on - 6 days, a.visited_on]`.
3. Restrict `a.visited_on` to full 7-day windows using a `WHERE` filter comparing against the earliest date `(SELECT MIN(visited_on) FROM customer)`.
4. Group by `a.visited_on` (`GROUP BY 1`), compute `SUM(b.amount) AS amount` and `ROUND(SUM(b.amount) / 7, 2) AS average_amount`, and sort with `ORDER BY 1`.

### Algorithm / Intuition

Subquery `a` creates one anchor row per unique `visited_on` date. Joining `customer AS b` via `DATEDIFF(a.visited_on, b.visited_on) BETWEEN 0 AND 6` pairs each anchor date `a.visited_on` with all customer rows `b` from that day and the 6 previous days. Note an important MySQL quirk in the `WHERE` clause: `WHERE a.visited_on >= (SELECT MIN(visited_on) FROM customer) + 6` relies on MySQL implicit numeric date conversion (or date comparison) — Wait: in MySQL, adding `+ 6` to a `DATE` converts `'YYYY-MM-DD'` to integer `YYYYMMDD + 6`, whereas across month boundaries (e.g. `'2019-01-28' + 6 = 20190134`), numeric addition can misbehave if the minimum date is near the end of a month; LeetCode's test cases start near the 1st of the month, though `DATE_ADD(MIN(visited_on), INTERVAL 6 DAY)` or `DATEDIFF(a.visited_on, (SELECT MIN(visited_on) FROM customer)) >= 6` is the safer date-arithmetic idiom in production SQL. Finally, `GROUP BY 1` sums `b.amount` per anchor date and divides by `7`.

---

## Dry Run

Tracing **Example 1** (`Customer` dates `2019-01-01` through `2019-01-10`, with two rows on `2019-01-10`: `130` and `150`):

1. **`a` (`DISTINCT visited_on`)** has 10 dates: `2019-01-01` .. `2019-01-10`.
2. **`WHERE` filter:** `MIN(visited_on)` is `2019-01-01`, so only `a.visited_on` in `{2019-01-07, 2019-01-08, 2019-01-09, 2019-01-10}` pass.
3. **Join & Aggregate per anchor date:**
   - `2019-01-07` (`2019-01-01`..`01-07`): `SUM = 100+110+120+130+110+140+150 = 860`, `ROUND(860/7, 2) = 122.86`
   - `2019-01-08` (`2019-01-02`..`01-08`): `SUM = 860 - 100 + 80 = 840`, `ROUND(840/7, 2) = 120.00` (`120`)
   - `2019-01-09` (`2019-01-03`..`01-09`): `SUM = 840 - 110 + 110 = 840`, `ROUND(840/7, 2) = 120.00` (`120`)
   - `2019-01-10` (`2019-01-04`..`01-10`): matches **both** `01-10` rows (`130` and `150`) **once** because `a` was deduplicated -> `SUM = 130+110+140+150+80+110+130+150 = 1000`, `ROUND(1000/7, 2) = 142.86`.

---

## Complexity Analysis

- **Time Complexity:** `O(D * N)` (or `O(N log N)` with an index on `visited_on`) — Let `N` be total rows in `Customer` and `D <= N` be distinct dates. Joining `D` anchor dates against a 7-day range of `Customer` scans matching rows and sorts `D` groups.
- **Space Complexity:** `O(D)` — Stores the `D` distinct `visited_on` dates for grouping and sorting.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1321restaurant-growth.sql](./1321restaurant-growth.sql) |

---

## Key Learnings

- Always deduplicate the date spine (`SELECT DISTINCT visited_on`) before range-joining a transaction table that can have multiple rows per date.
- In MySQL, avoid `date_col + 6` in production because `+ 6` performs numeric `YYYYMMDD + 6` addition rather than calendar arithmetic; prefer `DATE_ADD(date_col, INTERVAL 6 DAY)` or `DATEDIFF`.
- In MySQL 8.0+, an `O(N log N)` alternative pre-aggregates daily sums first and applies `SUM(daily_amt) OVER (ORDER BY visited_on RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW)`.
