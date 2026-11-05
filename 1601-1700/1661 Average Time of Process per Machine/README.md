---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1661. Average Time of Process per Machine

**[View Problem on LeetCode](https://leetcode.com/problems/average-time-of-process-per-machine/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1661` (`1661`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given an `Activity` table logging factory machine process runs with columns `machine_id` (`int`), `process_id` (`int`), `activity_type` (`ENUM('start', 'end')`), and `timestamp` (`float`, in seconds). The composite primary key is `(machine_id, process_id, activity_type)`, and every `(machine_id, process_id)` pair is guaranteed to have one `'start'` row and one `'end'` row with `start <= end`.

Write a SQL query to compute each machine's **average process completion time**, defined as the average of `(end_timestamp - start_timestamp)` across all processes run on that machine, rounded to **3 decimal places** under the alias `processing_time`. Return the result in any order.

---

## Examples

### Example 1

```text
Input:
Activity table:
+------------+------------+---------------+-----------+
| machine_id | process_id | activity_type | timestamp |
+------------+------------+---------------+-----------+
| 0          | 0          | start         | 0.712     |
| 0          | 0          | end           | 1.520     |
| 0          | 1          | start         | 3.140     |
| 0          | 1          | end           | 4.120     |
| 1          | 0          | start         | 0.550     |
| 1          | 0          | end           | 1.550     |
| 1          | 1          | start         | 0.430     |
| 1          | 1          | end           | 1.420     |
| 2          | 0          | start         | 4.100     |
| 2          | 0          | end           | 4.512     |
| 2          | 1          | start         | 2.500     |
| 2          | 1          | end           | 5.000     |
+------------+------------+---------------+-----------+
Output:
+------------+-----------------+
| machine_id | processing_time |
+------------+-----------------+
| 0          | 0.894           |
| 1          | 0.995           |
| 2          | 1.456           |
+------------+-----------------+
Explanation:
There are 3 machines running 2 processes each.
Machine 0's average time is ((1.520 - 0.712) + (4.120 - 3.140)) / 2 = 0.894
Machine 1's average time is ((1.550 - 0.550) + (1.420 - 0.430)) / 2 = 0.995
Machine 2's average time is ((4.512 - 4.100) + (5.000 - 2.500)) / 2 = 1.456
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- Each process execution spans **two** separate rows in `Activity`: one with `activity_type = 'start'` and one with `activity_type = 'end'`.
- Pairing each `'start'` row with its matching `'end'` row on the same `(machine_id, process_id)` puts both timestamps onto a single joined row, allowing direct subtraction `e.timestamp - s.timestamp`.
- Since every `(machine_id, process_id)` pair appears exactly once after pairing, `AVG(e.timestamp - s.timestamp)` grouped by `machine_id` computes the exact per-machine mean duration.

---

## Approach

### Brute Force Approach

Using correlated subqueries per `'start'` row to look up the matching `'end'` timestamp (`SELECT timestamp FROM Activity e WHERE ...`) can trigger repeated lookups if not flattened by the optimizer, whereas a direct self-join on the primary key columns is clean, idiomatic, and index-friendly.

### Optimized Approach

Self-join `Activity s` (start events) with `Activity e` (end events) on matching `machine_id`, matching `process_id`, `s.activity_type = 'start'`, and `e.activity_type = 'end'`. Group by `s.machine_id` and compute `ROUND(AVG(e.timestamp - s.timestamp), 3) AS processing_time`.

### Step-by-Step Thinking Process

1. Alias two references to `Activity`: `s` for start records and `e` for end records.
2. Join `s` and `e` on `s.machine_id = e.machine_id AND s.process_id = e.process_id` while restricting `s.activity_type = 'start'` and `e.activity_type = 'end'`.
3. Now each joined row represents one completed process with duration `e.timestamp - s.timestamp`.
4. Group by `s.machine_id` and apply `ROUND(AVG(e.timestamp - s.timestamp), 3)`.

### Algorithm / Intuition

Because `(machine_id, process_id, activity_type)` is the primary key, joining `s` (`activity_type = 'start'`) and `e` (`activity_type = 'end'`) on `(machine_id, process_id)` is a strict 1-to-1 join between the two halves of the table. For a table of `2P` rows (`P` processes), the join produces exactly `P` rows, each holding `s.timestamp` and `e.timestamp` side by side. `AVG(e.timestamp - s.timestamp)` then sums durations per `machine_id` and divides by that machine's process count.

---

## Dry Run

Tracing Example 1:

1. **After self-join (`s` = `'start'`, `e` = `'end'`):**

| `machine_id` | `process_id` | `s.timestamp` | `e.timestamp` | `e.timestamp - s.timestamp` |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `0` | `0.712` | `1.520` | `0.808` |
| `0` | `1` | `3.140` | `4.120` | `0.980` |
| `1` | `0` | `0.550` | `1.550` | `1.000` |
| `1` | `1` | `0.430` | `1.420` | `0.990` |
| `2` | `0` | `4.100` | `4.512` | `0.412` |
| `2` | `1` | `2.500` | `5.000` | `2.500` |

2. **After `GROUP BY s.machine_id` and `ROUND(AVG(...), 3)`:**
   - `machine_id = 0`: `ROUND((0.808 + 0.980) / 2, 3) = 0.894`
   - `machine_id = 1`: `ROUND((1.000 + 0.990) / 2, 3) = 0.995`
   - `machine_id = 2`: `ROUND((0.412 + 2.500) / 2, 3) = 1.456`

---

## Complexity Analysis

- **Time Complexity:** `O(N)` — Using the composite primary key `(machine_id, process_id, activity_type)` or a hash join, pairing and aggregating `N` activity rows runs in linear time.
- **Space Complexity:** `O(N)` — Intermediate hash join / grouping state scales linearly with the number of processes and machines.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1661average-time-of-process-per-machine.sql](./1661average-time-of-process-per-machine.sql) |

---

## Key Learnings

- Self-joining a log table on entity + run IDs (`machine_id`, `process_id`) with opposite state filters (`'start'` vs `'end'`) is the standard relational pattern for computing event durations.
- An alternative single-scan approach without a join uses conditional aggregation: `ROUND(SUM(IF(activity_type = 'end', timestamp, -timestamp)) / (COUNT(*) / 2), 3)` grouped by `machine_id`.
- Always verify primary key uniqueness before aggregating after a join so 1-to-many fan-out doesn't skew `AVG`.
