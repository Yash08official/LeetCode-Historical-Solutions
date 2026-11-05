---
comments: true
difficulty: Easy
tags:
  - Database
---

# 2356. Number of Unique Subjects Taught by Each Teacher

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2356` (`2356`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

Table: `Teacher`
```text
+-------------+------+
| Column Name | Type |
+-------------+------+
| teacher_id  | int  |
| subject_id  | int  |
| dept_id     | int  |
+-------------+------+
```
`(subject_id, dept_id)` is the primary key for this table. Each row indicates that the teacher with `teacher_id` teaches the subject `subject_id` in department `dept_id`.

Write a solution to calculate the number of unique subjects taught by each teacher in the university. Return the result table containing `teacher_id` and the unique subject count `cnt` in any order.

---

## Examples

### Example 1

```text
Input:
Teacher table:
+------------+------------+---------+
| teacher_id | subject_id | dept_id |
+------------+------------+---------+
| 1          | 2          | 3       |
| 1          | 2          | 4       |
| 1          | 3          | 3       |
| 2          | 1          | 1       |
| 2          | 2          | 1       |
| 2          | 3          | 1       |
| 2          | 4          | 1       |
+------------+------------+---------+
Output:
+------------+-----+
| teacher_id | cnt |
+------------+-----+
| 1          | 2   |
| 2          | 4   |
+------------+-----+
Explanation:
Teacher 1:
  - They teach subject 2 in departments 3 and 4.
  - They teach subject 3 in department 3.
Teacher 2:
  - They teach subject 1 in department 1.
  - They teach subject 2 in department 1.
  - They teach subject 3 in department 1.
  - They teach subject 4 in department 1.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

Key observations and schema rules:
- A teacher may teach the same subject across multiple departments (e.g., teaching `subject_id = 2` in both `dept_id = 3` and `dept_id = 4`).
- A naive `COUNT(subject_id)` would count every department assignment, artificially inflating the subject count.
- We need to find the number of distinct subjects taught per teacher, which requires combining `COUNT(DISTINCT subject_id)` with `GROUP BY teacher_id`.
- The output columns must be named `teacher_id` and `cnt`.

---

## Approach

### Brute Force Approach

A baseline SQL approach might use a subquery to first eliminate duplicate `(teacher_id, subject_id)` pairs with `SELECT DISTINCT teacher_id, subject_id FROM Teacher`, and then perform an outer `GROUP BY teacher_id` with `COUNT(*) AS cnt`. While correct, using `COUNT(DISTINCT subject_id)` directly in a single `GROUP BY` clause is more concise and avoids subquery materialization overhead.

### Optimized Approach

Use a single SQL aggregation query grouping by `teacher_id`. Apply `COUNT(DISTINCT subject_id)` to deduplicate subjects per teacher partition, and alias the aggregate as `cnt`:
```sql
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY 1;
```
The `GROUP BY 1` clause references the first column in the `SELECT` list (`teacher_id`).

### Step-by-Step Thinking Process

1. Goal: calculate unique subjects taught by each `teacher_id`.
2. Rows can have the same `teacher_id` and `subject_id` if taught in different `dept_id` values.
3. Group records by `teacher_id`.
4. Use the aggregate function `COUNT(DISTINCT subject_id)` to count only unique subjects per teacher.
5. Alias the count column as `cnt` as requested by the problem specification.

### Algorithm / Intuition

The query scans the `Teacher` table and partitions rows by `teacher_id` using `GROUP BY 1` (positional reference to `teacher_id`). For each teacher group, the aggregate function `COUNT(DISTINCT subject_id)` builds an internal hash set or sorted sequence of `subject_id` values encountered in that group, discarding duplicate subjects. The cardinality of this distinct set is returned as `cnt`.

---

## Dry Run

Consider the Example 1 `Teacher` table:
- Rows:
  - `(1, 2, 3)` -> teacher 1, subject 2
  - `(1, 2, 4)` -> teacher 1, subject 2
  - `(1, 3, 3)` -> teacher 1, subject 3
  - `(2, 1, 1)` -> teacher 2, subject 1
  - `(2, 2, 1)` -> teacher 2, subject 2
  - `(2, 3, 1)` -> teacher 2, subject 3
  - `(2, 4, 1)` -> teacher 2, subject 4
- Grouping by `teacher_id`:
  - Group `teacher_id = 1`: `subject_id` values are `{2, 2, 3}`. Distinct values are `{2, 3}`. Distinct count = `2`.
  - Group `teacher_id = 2`: `subject_id` values are `{1, 2, 3, 4}`. Distinct values are `{1, 2, 3, 4}`. Distinct count = `4`.
- Output Table:
  ```text
  +------------+-----+
  | teacher_id | cnt |
  +------------+-----+
  | 1          | 2   |
  | 2          | 4   |
  +------------+-----+
  ```

---

## Complexity Analysis

- **Time Complexity:** `O(N log N)` or `O(N)` — where `N` is the number of rows in `Teacher`. The database engine sorts or hashes the rows to evaluate `GROUP BY` and deduplicate `subject_id` values.
- **Space Complexity:** `O(T)` — where `T` is the number of distinct teachers, stored in the aggregation hash map or sort buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [2356number-of-unique-subjects-taught-by-each-teacher.sql](./2356number-of-unique-subjects-taught-by-each-teacher.sql) |

---

## Key Learnings

- `COUNT(DISTINCT column)` is the standard idiomatic SQL construct for counting unique occurrences within groups.
- `GROUP BY 1` is standard SQL shorthand referencing the first projection expression in the `SELECT` list.
- Primary keys spanning multiple columns (here `subject_id, dept_id`) permit duplicate values in individual columns, necessitating explicit deduplication.
