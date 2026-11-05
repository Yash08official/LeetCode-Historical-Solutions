---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1280. Students and Examinations

**[View Problem on LeetCode](https://leetcode.com/problems/students-and-examinations/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1280` (`1280`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given three relational tables:
- `Students(student_id, student_name)` where `student_id` is the primary key.
- `Subjects(subject_name)` where `subject_name` is the primary key.
- `Examinations(student_id, subject_name)` which has **no primary key** and may contain duplicate rows; each row records one instance of a student attending an exam for a subject.

Every student takes every course in `Subjects`, even if they attended `0` exams. Write a SQL query to find how many times each student attended each subject's exam (`attended_exams`), returning all `(student, subject)` combinations ordered by `student_id` and `subject_name`.

---

## Examples

### Example 1

```text
Input:
Students table:
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 1          | Alice        |
| 2          | Bob          |
| 13         | John         |
| 6          | Alex         |
+------------+--------------+
Subjects table:
+--------------+
| subject_name |
+--------------+
| Math         |
| Physics      |
| Programming  |
+--------------+
Examinations table:
+------------+--------------+
| student_id | subject_name |
+------------+--------------+
| 1          | Math         |
| 1          | Physics      |
| 1          | Programming  |
| 2          | Programming  |
| 1          | Physics      |
| 1          | Math         |
| 13         | Math         |
| 13         | Programming  |
| 13         | Physics      |
| 2          | Math         |
| 1          | Math         |
+------------+--------------+
Output:
+------------+--------------+--------------+----------------+
| student_id | student_name | subject_name | attended_exams |
+------------+--------------+--------------+----------------+
| 1          | Alice        | Math         | 3              |
| 1          | Alice        | Physics      | 2              |
| 1          | Alice        | Programming  | 1              |
| 2          | Bob          | Math         | 1              |
| 2          | Bob          | Physics      | 0              |
| 2          | Bob          | Programming  | 1              |
| 6          | Alex         | Math         | 0              |
| 6          | Alex         | Physics      | 0              |
| 6          | Alex         | Programming  | 0              |
| 13         | John         | Math         | 1              |
| 13         | John         | Physics      | 1              |
| 13         | John         | Programming  | 1              |
+------------+--------------+--------------+----------------+
Explanation:
The result table should contain all students and all subjects.
Alice attended the Math exam 3 times, the Physics exam 2 times, and the Programming exam 1 time.
Bob attended the Math exam 1 time, the Programming exam 1 time, and did not attend the Physics exam.
Alex did not attend any exams.
John attended the Math exam 1 time, the Physics exam 1 time, and the Programming exam 1 time.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- The output must include **every** pair of `(student_id, subject_name)` from `Students x Subjects`, even when a student has no rows in `Examinations` (e.g., `Alex` in Example 1, or `Bob` for `Physics`).
- `Examinations` can contain duplicate `(student_id, subject_name)` rows because a student can attend the same subject exam multiple times—every matching row must be counted.
- When joining `Students x Subjects` to `Examinations`, an `INNER JOIN` would drop zero-attendance pairs; we must use a `LEFT JOIN`.
- When aggregating after a `LEFT JOIN`, `COUNT(*)` counts the unmatched row with `NULL`s as `1`, whereas `COUNT(e.student_id)` ignores `NULL`s and accurately evaluates to `0`.

---

## Approach

### Brute Force Approach

A common pitfall is starting from `Examinations` and left-joining `Students` and `Subjects`, which completely omits subjects a student never tested in and students who attended zero exams. Another baseline approach pre-aggregates `Examinations` in a subquery (`GROUP BY student_id, subject_name`) and left-joins it to `Students CROSS JOIN Subjects` using `IFNULL(cnt, 0)`, which works well but requires an extra derived table.

### Optimized Approach

Generate all `(student, subject)` pairs using an unconditional `JOIN` (`CROSS JOIN`) between `Students` and `Subjects`, `LEFT JOIN` `Examinations AS e USING (student_id, subject_name)`, count non-null matches via `COUNT(e.student_id)`, and group and order by `student_id` and `subject_name`.

### Step-by-Step Thinking Process

1. First form the complete grid of required output rows by crossing `Students` with `Subjects` (`Students JOIN Subjects` in MySQL performs a Cartesian product when no `ON` condition is given).
2. Attach exam attendance records via `LEFT JOIN Examinations AS e USING (student_id, subject_name)` so unmatched `(student, subject)` pairs remain in the result with `e.student_id = NULL`.
3. Aggregate with `GROUP BY 1, 3` (`student_id`, `subject_name`); since `student_id` is the primary key of `Students`, `student_name` is functionally dependent on `student_id`.
4. Use `COUNT(e.student_id) AS attended_exams` so `NULL` right-side matches produce `0` instead of `1`.
5. Sort final rows with `ORDER BY 1, 3` (`student_id` ascending, `subject_name` ascending).

### Algorithm / Intuition

In MySQL, `Students JOIN Subjects` without a join predicate is equivalent to `Students CROSS JOIN Subjects`, producing `|Students| * |Subjects|` combinations. The subsequent `LEFT JOIN Examinations AS e USING (student_id, subject_name)` matches every attendance record `e` to its `(student_id, subject_name)` pair; if a student attended `Math` three times, three rows exist for that group, and if they attended zero times, one row exists with `e.student_id = NULL`. `GROUP BY 1, 3` collapses each `(student_id, subject_name)` bucket, and `COUNT(e.student_id)` counts only non-null occurrences.

---

## Dry Run

Tracing **Example 1** (`4` students x `3` subjects = `12` pairs):

1. **`Students JOIN Subjects`** generates `12` base pairs, including `(1, 'Alice', 'Math')`, `(2, 'Bob', 'Physics')`, and `(6, 'Alex', 'Math')`.
2. **`LEFT JOIN Examinations AS e USING (student_id, subject_name)`:**
   - `(1, 'Alice', 'Math')` matches `3` rows in `Examinations` (`e.student_id = 1` three times).
   - `(2, 'Bob', 'Physics')` matches `0` rows -> produces `1` row with `e.student_id = NULL`.
   - `(6, 'Alex', *)` matches `0` rows for all 3 subjects -> `e.student_id = NULL` for each.
3. **`GROUP BY 1, 3` & `COUNT(e.student_id)`:**
   - `(1, 'Alice', 'Math')` -> `COUNT(e.student_id) = 3`
   - `(2, 'Bob', 'Physics')` -> `COUNT(NULL) = 0`
   - `(6, 'Alex', 'Math')` -> `COUNT(NULL) = 0`
4. **`ORDER BY 1, 3`** outputs `student_id` `1`, `2`, `6`, `13`, each with `Math`, `Physics`, `Programming` in alphabetical order.

---

## Complexity Analysis

- **Time Complexity:** `O(S * B log(S * B) + E)` — Let `S`, `B`, and `E` be the row counts of `Students`, `Subjects`, and `Examinations`. Generating and sorting all `S * B` groups takes `O(S * B log(S * B))`, and joining/aggregating `E` exam records takes `O(E)` (with hash/index join).
- **Space Complexity:** `O(S * B)` — Materializing and grouping the `S * B` student-subject combinations requires space proportional to the Cartesian product.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1280students-and-examinations.sql](./1280students-and-examinations.sql) |

---

## Key Learnings

- Whenever a report requires zeroes for missing combinations across two independent dimensions, build the spine first with a `CROSS JOIN` (`JOIN` in MySQL), then `LEFT JOIN` the fact/event table.
- Always pass a nullable column from the right table into `COUNT(e.col)` after a `LEFT JOIN`—using `COUNT(*)` will falsely count missing combinations as `1`.
- Positional references `GROUP BY 1, 3` and `ORDER BY 1, 3` refer to the 1st (`student_id`) and 3rd (`subject_name`) expressions in the `SELECT` list.
